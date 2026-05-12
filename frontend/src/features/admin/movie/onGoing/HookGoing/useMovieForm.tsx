import { useState } from "react";
import { createUploadUrl, createMovieApi } from "@/src/apis/movie.api";
import { uploadToS3 } from "@/src/services/s3.service";
import { useLoading } from "@/src/shared/hooks/useLoading";
import { validateMovieForm } from "@/src/features/admin/movie/create/utils/validateMovieForm";

type MovieStatus = "Ongoing" | "Completed" | "Upcoming";

export type MovieFormState = {
  title: string;
  originalTitle: string;
  description: string;
  director: string;
  duration: number;
  genres: string[];
  releaseDate: string;
  rating: number;
  trailerUrl: string;
  status: MovieStatus;
  cast: string[];
  country: string;
  ageRating: string;
};

const initialForm: MovieFormState = {
  title: "",
  originalTitle: "",
  description: "",
  director: "",
  duration: 0,
  genres: [],
  releaseDate: "",
  rating: 0,
  trailerUrl: "",
  status: "Ongoing",
  cast: [],
  country: "",
  ageRating: "",
};

export const useMovieForm = () => {
  const { setLoading } = useLoading();

  // ================= FILES =================
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbProgress, setThumbProgress] = useState(0);

  // ================= FORM =================
  const [form, setForm] = useState<MovieFormState>(initialForm);

  // ================= UI STATE =================
  const [videoId, setVideoId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [alertModal, setAlertModal] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success",
  });

  // ================= RESET =================
  const reset = () => {
    setFile(null);
    setThumbnailFile(null);
    setProgress(0);
    setThumbProgress(0);
    setVideoId("");
    setForm(initialForm);
  };

  // ================= DIRTY =================
  const isDirty =
    !!file ||
    !!thumbnailFile ||
    Object.values(form).some((v) =>
      Array.isArray(v) ? v.length > 0 : v !== "" && v !== 0,
    );

  // ================= SUBMIT =================
  const submit = async () => {
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

    if (!file || !thumbnailFile) return;

    setSubmitting(true);
    setLoading(true);

    const newVideoId = videoId || crypto.randomUUID();
    setVideoId(newVideoId);

    try {
      // 1. upload video
      const videoRes = await createUploadUrl({
        videoId: newVideoId,
        fileType: "video",
      });

      await uploadToS3(file, videoRes.uploadUrl, setProgress);

      // 2. upload thumbnail
      const thumbRes = await createUploadUrl({
        videoId: newVideoId,
        fileType: "thumbnail",
      });

      await uploadToS3(thumbnailFile, thumbRes.uploadUrl, setThumbProgress);

      // 3. create movie
      await createMovieApi({
        videoId: newVideoId,
        title: form.title,
        originalTitle: form.originalTitle,
        description: form.description,
        thumbnailUrl: thumbRes.key,
        duration: form.duration,
        genres: form.genres,
        releaseDate: form.releaseDate,
        rating: form.rating,
        trailerUrl: form.trailerUrl,
        status: form.status,
        country: form.country,
        ageRating: form.ageRating,
        cast: form.cast,
        director: form.director,
      });

      setAlertModal({
        open: true,
        message: "Create movie successfully",
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
      setSubmitting(false);
      setLoading(false);
    }
  };

  return {
    // FILES
    file,
    setFile,
    progress,

    thumbnailFile,
    setThumbnailFile,
    thumbProgress,

    // FORM
    form,
    setForm,

    // ACTIONS
    submit,
    reset,

    // STATE
    isDirty,
    submitting,

    // ALERT
    alertModal,
    setAlertModal,
  };
};
