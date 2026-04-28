export const validateMovieForm = ({
  file,
  thumbnailFile,
  form,
}: any): string | null => {
  if (!file) return "Please select video";
  if (!thumbnailFile) return "Please select thumbnail";
  if (!form.title.trim()) return "Title is required";
  if (!form.description.trim()) return "Description is required";
  if (!form.genres.length) return "Select at least one genre";
  if (!form.releaseDate) return "Release year is required";
  if (!form.rating) return "Rating is required";

  return null;
};