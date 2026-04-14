import { useState } from "react";
import { createUploadUrl, createMovieApi } from "@/src/apis/movie.api";
import { uploadToS3 } from "@/src/services/s3.service";
import { useLoading } from "./useLoading";

export const useMovieForm = () => {
  const { setLoading } = useLoading();

  // VIDEO
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  // THUMBNAIL
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbProgress, setThumbProgress] = useState(0);

  // METADATA
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: 0,
    genres: [] as string[],
    releaseYear: "",
    rating: "",
    thumbnailFile: null as File | null,
  });

  // ERROR
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success",
  });

  const [videoId, setVideoId] = useState("");

  // VALIDATION
  const validate = () => {
    if (!file) return "Please select video";
    if (!thumbnailFile) return "Please select thumbnail";
    if (!form.title) return "Title is required";
    if (!form.description) return "Description is required";
    if (form.genres.length === 0) return "Select at least one genre";
    if (!form.releaseYear) return "Release year is required";
    if (!form.rating) return "Rating is required";

    return null;
  };

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
      releaseYear: "",
      rating: "",
      thumbnailFile: null,
    });
  };

  // DIRTY CHECK
  const isDirty =
    !!file ||
    !!thumbnailFile ||
    Object.values(form).some((v) =>
      Array.isArray(v) ? v.length > 0 : v !== "" && v !== 0,
    );

  // SUBMIT
  const submit = async () => {
    setLoading(true);
    const error = validate();
    if (error) {
      setAlertModal({
        open: true,
        message: error,
        type: "error",
      });
      return;
    }

    const newVideoId = videoId || crypto.randomUUID();
    setVideoId(newVideoId);

    try {
      // upload video
      const videoRes = await createUploadUrl({
        videoId: newVideoId,
        fileType: "video",
      });

      await uploadToS3(file!, videoRes.uploadUrl, setProgress);

      // Upload thumbnail
      const thumbRes = await createUploadUrl({
        videoId: newVideoId,
        fileType: "thumbnail",
      });

      await uploadToS3(thumbnailFile!, thumbRes.uploadUrl, setThumbProgress);

      // create movie
      await createMovieApi({
        title: form.title,
        description: form.description,
        thumbnailUrl: thumbRes.key,
        duration: form.duration,
        videoId: newVideoId,
        genres: form.genres,
        releaseYear: form.releaseYear,
        rating: form.rating,
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
    }
  };

  return {
    // state
    file,
    setFile,
    progress,

    thumbnailFile,
    setThumbnailFile,
    thumbProgress,

    form,
    setForm,

    // actions
    submit,
    reset,

    // meta
    isDirty,

    // error
    alertModal,
    setAlertModal,
  };
};
