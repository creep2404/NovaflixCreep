import { useState } from "react";

import { createMovieApi, createUploadUrl } from "@/src/apis/movie.api";

import { uploadToS3 } from "@/src/services/s3.service";

import { useLoading } from "@/src/shared/hooks/useLoading";

import { validateMovieForm } from "@/src/features/admin/movie/create/utils/validateMovieForm";
import { MovieMetadataFormState } from "./MovieMetadataForm";

export const useSingleMovieUpload = (form: MovieMetadataFormState) => {
  const { setLoading } = useLoading();

  // VIDEO
  const [file, setFile] = useState<File | null>(null);

  const [progress, setProgress] = useState(0);

  // THUMBNAIL
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [thumbProgress, setThumbProgress] = useState(0);

  // ALERT
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success",
  });

  // VIDEO ID
  const [videoId, setVideoId] = useState("");

  const resetMovieUpload = () => {
    setFile(null);
    setThumbnailFile(null);
    setProgress(0);
    setThumbProgress(0);
    setVideoId("");
  };

  const isMovieUploadDirty = !!file || !!thumbnailFile;

  const submitMovie = async () => {
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
        duration: 0,
        videoId: newVideoId,
        genres: form.genres,
        releaseDate: form.releaseDate,
        rating: form.rating,
        trailerUrl: form.trailerUrl,
        country: form.country,
        ageRating: form.ageRating,
      });

      setAlertModal({
        open: true,
        message: "Create movie successfully.",
        type: "success",
      });

      resetMovieUpload();
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

  //READY TO SUBMIT
  const readyToSubmit =
    !!file &&
    !!thumbnailFile &&
    form.title.trim().length > 0 &&
    form.description.trim().length > 0;

  return {
    file,
    setFile,

    progress,

    thumbnailFile,
    setThumbnailFile,

    thumbProgress,

    submitMovie,

    resetMovieUpload,

    isMovieUploadDirty,

    alertModal,
    setAlertModal,
    readyToSubmit,
  };
};
