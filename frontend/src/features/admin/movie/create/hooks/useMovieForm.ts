import { useState } from "react";
import { createUploadUrl, createMovieApi } from "@/src/apis/movie.api";
import { uploadToS3 } from "@/src/services/s3.service";
import { useLoading } from "@/src/shared/hooks/useLoading";
import { validateMovieForm } from "@/src/features/admin/movie/create/utils/validateMovieForm";

export const useMovieForm = () => {
  const { setLoading } = useLoading();

  // VIDEO
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  // THUMBNAIL
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbProgress, setThumbProgress] = useState(0);

  // FORM
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: 0,
    genres: [] as string[],
    releaseDate: "",
    rating: "",
    trailerUrl: "",
    country: "",
    ageRating: "",
  });

  const [alertModal, setAlertModal] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success",
  });

  const [videoId, setVideoId] = useState("");

  // RESET
  const reset = () => {
    setFile(null);
    setThumbnailFile(null);
    setProgress(0);
    setThumbProgress(0);
    setVideoId("");

    setForm({
      title: "",
      description: "",
      duration: 0,
      genres: [],
      releaseDate: "",
      rating: "",
      trailerUrl: "",
      country: "",
      ageRating: "",
    });
  };

  // DIRTY
  const isDirty =
    !!file ||
    !!thumbnailFile ||
    Object.values(form).some((v) =>
      Array.isArray(v) ? v.length > 0 : v !== "" && v !== 0,
    );

  // SUBMIT
  const submit = async () => {
    const error = validateMovieForm({ file, thumbnailFile, form });

    if (error) {
      setAlertModal({ open: true, message: error, type: "error" });
      return;
    }

    if (!file || !thumbnailFile) return; // safety

    setLoading(true);

    const newVideoId = videoId || crypto.randomUUID();
    setVideoId(newVideoId);

    try {
      // 1. Upload video
      const videoRes = await createUploadUrl({
        videoId: newVideoId,
        fileType: "video",
      });

      await uploadToS3(file, videoRes.uploadUrl, setProgress);

      // 2. Upload thumbnail
      const thumbRes = await createUploadUrl({
        videoId: newVideoId,
        fileType: "thumbnail",
      });

      await uploadToS3(thumbnailFile, thumbRes.uploadUrl, setThumbProgress);

      // 3. Create movie
      await createMovieApi({
        title: form.title,
        description: form.description,
        thumbnailUrl: thumbRes.key,
        duration: form.duration,
        videoId: newVideoId,
        genres: form.genres,
        releaseDate: form.releaseDate,
        rating: Number(form.rating),
        trailerUrl: form.trailerUrl,
        country: form.country,
        ageRating: form.ageRating,
      });

      setAlertModal({
        open: true,
        message: "Create movie successfully.",
        type: "success",
      });

      reset();
    } catch (err) {
      console.error(err);

      setAlertModal({
        open: true,
        message: "Upload failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    setFile,
    progress,

    thumbnailFile,
    setThumbnailFile,
    thumbProgress,

    form,
    setForm,

    submit,
    reset,

    isDirty,

    alertModal,
    setAlertModal,
  };
};