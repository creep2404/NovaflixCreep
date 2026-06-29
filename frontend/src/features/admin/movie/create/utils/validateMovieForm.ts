export const validateMovieForm = ({
  file,
  thumbnailFile,
  form,
}: any): string | null => {
  // BE require videoId
  if (!file) return "Please select video";

  if (!thumbnailFile) return "Please select thumbnail";

  if (!form.title.trim()) return "Title is required";

  if (!form.description.trim()) {
    return "Description is required";
  }

  if(!form.duration || form.duration <= 0) {
    return "Duration is required";
  }

  if (!form.genres.length) return "Select at least one genre";

  if (!form.releaseDate) return "Release year is required";

  if (
    form.rating !== undefined &&
    form.rating !== "" &&
    (form.rating < 0 || form.rating > 5)
  ) {
    return "Rating must be between 0 and 5";
  }

  // trailer url format validate
  if (form.trailerUrl?.trim()) {
    try {
      new URL(form.trailerUrl);
    } catch {
      return "Trailer URL format is invalid";
    }
  }

  return null;
};
