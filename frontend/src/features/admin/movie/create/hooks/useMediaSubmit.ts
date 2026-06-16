import { createMovieApi, createUploadUrl } from "@/src/apis/movie.api";
import { uploadToS3 } from "@/src/services/s3.service";
import { useLoading } from "@/src/shared/hooks/useLoading";
import { validateMovieForm } from "@/src/features/admin/movie/create/utils/validateMovieForm";
import { MovieMetadataFormState } from "./useMediaForm";
import { Season } from "./useSeriesForm";

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
  resetSeries: () => void;
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
  resetSeries,
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
    // await createMovieApi({
    //   title: form.title,
    //   description: form.description,
    //   thumbnailUrl: thumbRes.key,
    //   duration: form.duration,
    //   type: "MOVIE",
    //   genres: form.genres,
    //   releaseDate: form.releaseDate,
    //   rating: form.rating,
    //   trailerUrl: form.trailerUrl,
    //   country: form.country,
    //   ageRating: form.ageRating,
    //   episodes: [
    //     {
    //       title: form.title,
    //       videoId,
    //       duration: form.duration,
    //       episodeNo: 1,
    //       description: form.description,
    //     },
    //   ],
    // });

    await createMovieApi({
      title: form.title,
      description: form.description,
      thumbnailUrl: thumbRes.key,
      duration: form.duration,
      type: "MOVIE",
      genres: form.genres,
      releaseDate: form.releaseDate,
      rating: form.rating,
      trailerUrl: form.trailerUrl,
      country: form.country,
      ageRating: form.ageRating,

      seasons: [
        {
          title: form.title,
          seasonNo: 1,

          episodes: [
            {
              title: form.title,
              videoId,
              duration: form.duration,
              episodeNo: 1,
              description: form.description,
            },
          ],
        },
      ],
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
    resetSeries();
  };

  // ========================= //
  // SERIES PUBLISH FLOW (TODO)
  // ========================= //
  const publishSeries = async () => {
    // =========================
    // Validate
    // =========================
    if (!thumbnailFile) {
      throw new Error("Thumbnail is required.");
    }

    if (seasons.length === 0) {
      throw new Error("Series must have at least one season.");
    }

    // =========================
    // Calculate total duration
    // =========================
    const totalDuration = seasons.reduce(
      (seasonTotal, season) =>
        seasonTotal +
        season.episodes.reduce(
          (episodeTotal, episode) => episodeTotal + (episode.duration || 0),
          0,
        ),
      0,
    );

    // =========================
    // Upload thumbnail
    // =========================
    const thumbnailId = crypto.randomUUID();

    const thumbRes = await createUploadUrl({
      videoId: thumbnailId,
      fileType: "thumbnail",
    });

    // await uploadToS3(thumbnailFile, thumbRes.uploadUrl, setThumbProgress);

    // =========================
    // Upload all episodes
    // =========================
    
    //Declare empty array to hold uploaded seasons and episodes
    const uploadedSeasons: {
      title: string;
      seasonNo: number;
      episodes: {
        title: string;
        videoId: string;
        duration: number;
        episodeNo: number;
        description?: string;
      }[];
    }[] = [];
    console.log("Seasons: ", seasons);
    for (const season of seasons) {
      const uploadedEpisodes: {
        title: string;
        videoId: string;
        duration: number;
        episodeNo: number;
        description?: string;
      }[] = [];

      for (const episode of season.episodes) {
        console.log("Uploading episode: ", episode);
        if (!episode.file) {
          throw new Error(`${episode.title} is missing video file.`);
        }

        const videoId = crypto.randomUUID();

        // const uploadRes = await createUploadUrl({
        //   videoId,
        //   fileType: "video",
        // });

        // await uploadToS3(episode.file, uploadRes.uploadUrl, () => {});

        uploadedEpisodes.push({
          title: episode.title,
          videoId,
          duration: episode.duration,
          episodeNo: episode.episodeNo,
          description: episode.description,
        });
      }

      uploadedSeasons.push({
        title: season.title,
        seasonNo: season.seasonNo,
        episodes: uploadedEpisodes,
      });
    }
    console.log("Uploaded seasons: ", uploadedSeasons);

    // =========================
    // Create Series
    // =========================
    await createMovieApi({
      title: form.title,
      description: form.description,
      thumbnailUrl: thumbRes.key,
      duration: totalDuration,
      type: "SERIES",
      genres: form.genres,
      releaseDate: form.releaseDate,
      rating: form.rating,
      trailerUrl: form.trailerUrl,
      country: form.country,
      ageRating: form.ageRating,
      seasons: uploadedSeasons,
    });

    // =========================
    // Success
    // =========================
    setAlertModal({
      open: true,
      message: "Create series successfully.",
      type: "success",
    });

    resetForm();
    resetMovieUpload();
    resetSeries();
  };

  // ========================= //
  // PUBLIC API
  // ========================= //
  const publish = async () => {
    setLoading(true);

    try {
      if (form.type === "Movie") {
        console.log("Publishing movie...");
        await publishMovie();
        return;
      }

      console.log("Publishing series...");
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
