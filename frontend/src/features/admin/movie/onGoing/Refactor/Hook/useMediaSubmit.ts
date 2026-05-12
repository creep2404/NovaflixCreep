import { createMovieApi, createUploadUrl } from "@/src/apis/movie.api";
import { uploadToS3 } from "@/src/services/s3.service";
import { useLoading } from "@/src/shared/hooks/useLoading";
import { validateMovieForm } from "@/src/features/admin/movie/create/utils/validateMovieForm";
import { MovieMetadataFormState } from "./useMediaForm";
import { Season } from "../../HookGoing/useSeriesForm";

type AlertModalState = {
  open: boolean;
  message: string;
  type: "error" | "success";
};

type UseMediaSubmitParams = {
  // Shared metadata
  form: MovieMetadataFormState;

  // Series UI state (chưa dùng ở phase này, nhưng chuẩn bị sẵn)
  seasons: Season[];

  // Single movie files
  file: File | null;
  thumbnailFile: File | null;

  // Progress setters (state nằm ở useSingleMovie)
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setThumbProgress: React.Dispatch<React.SetStateAction<number>>;

  // Alert modal setter (state nằm ở useSingleMovie)
  setAlertModal: React.Dispatch<React.SetStateAction<AlertModalState>>;

  // Reset callbacks
  resetForm: () => void;
  resetMovieUpload: () => void;
};

export const useMediaSubmit = ({
  form,
  seasons,
  file,
  thumbnailFile,
  setProgress,
  setThumbProgress,
  setAlertModal,
  resetForm,
  resetMovieUpload,
}: UseMediaSubmitParams) => {
  const { setLoading } = useLoading();

  // ========================= //
  // MOVIE PUBLISH FLOW
  // ========================= //
  const publishMovie = async () => {
    const error = validateMovieForm({
      file,
      thumbnailFile,
      form,
    });

    if (error) {
      setAlertModal({
        open: true,
        message: error,
        type: "error",
      });
      return;
    }

    if (!file || !thumbnailFile) {
      return;
    }

    console.log("Publishing movie with form data:", form);

    const videoId = crypto.randomUUID();

    // 1. Request presigned URL for video
    const videoRes = await createUploadUrl({
      videoId,
      fileType: "video",
    });

    // 2. Upload video to S3
    await uploadToS3(file, videoRes.uploadUrl, setProgress);

    // 3. Request presigned URL for thumbnail
    const thumbRes = await createUploadUrl({
      videoId,
      fileType: "thumbnail",
    });

    // 4. Upload thumbnail to S3
    await uploadToS3(thumbnailFile, thumbRes.uploadUrl, setThumbProgress);

    // 5. Save metadata to DB
    await createMovieApi({
      title: form.title,
      description: form.description,
      thumbnailUrl: thumbRes.key,
      duration: form.duration,
      videoId,
      genres: form.genres,
      releaseDate: form.releaseDate,
      rating: form.rating,
      trailerUrl: form.trailerUrl,
      country: form.country,
      ageRating: form.ageRating,
    });

    // 6. Success feedback
    setAlertModal({
      open: true,
      message: "Create movie successfully.",
      type: "success",
    });

    // 7. Reset local UI state
    resetForm();
    resetMovieUpload();
  };

  // ========================= //
  // SERIES PUBLISH FLOW (TODO)
  // ========================= //
  const publishSeries = async () => {
    // 1. Validate
    if (seasons.length === 0) {
      throw new Error("Series must have at least one season.");
    }

    // 2. Upload each episode video
    const uploadedSeasons = [];

    for (const season of seasons) {
      const uploadedEpisodes = [];

      for (const episode of season.episodes) {
        if (!episode.file) {
          throw new Error(`${episode.title} is missing video file.`);
        }

        const videoId = crypto.randomUUID();

        const uploadRes = await createUploadUrl({
          videoId,
          fileType: "video",
        });

        await uploadToS3(episode.file, uploadRes.uploadUrl, (progress) => {
          updateEpisode(season.id, episode.id, {
            progress,
            status: "uploading",
          });
        });

        updateEpisode(season.id, episode.id, {
          progress: 100,
          status: "processed",
        });

        uploadedEpisodes.push({
          title: episode.title,
          description: episode.description,
          duration: episode.duration,
          videoId,
        });
      }

      uploadedSeasons.push({
        title: season.title,
        episodes: uploadedEpisodes,
      });
    }

    // 3. Save DB
    await createMovieApi({
      ...form,
      seasons: uploadedSeasons,
    });

    // 4. Reset
    resetForm();
    resetMovieUpload();
  };

  // ========================= //
  // PUBLIC API
  // ========================= //
  const publish = async () => {
    setLoading(true);

    try {
      if (form.type === "Movie") {
        await publishMovie();
        return;
      }

      await publishSeries();
    } catch (error) {
      console.error(error);

      setAlertModal({
        open: true,
        message: "Upload failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ========================= //
  // SAVE DRAFT (TODO)
  // ========================= //
  const saveDraft = async () => {
    setAlertModal({
      open: true,
      message: "Save Draft is not implemented yet.",
      type: "success",
    });
  };

  return {
    publish,
    saveDraft,
  };
};
