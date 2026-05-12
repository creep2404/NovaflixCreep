/* eslint-disable */
;
import { useSeriesForm } from "../HookGoing/useSeriesForm";
import { useMediaForm } from "./Hook/useMediaForm";
import { useMediaSubmit } from "./Hook/useMediaSubmit";
import { useSingleMovie } from "./Hook/useSingleMovie";

// CreateSeriesPage.tsx (phần hooks usage sau refactor)

// ========================= //
// HOOKS
// ========================= //

// ========================= //
// COMPONENT
// ========================= //
export const CreateSeriesPage = ({
  onViewChange,
}: CreateSeriesProps) => {
  // ========================= //
  // 1. COMMON METADATA FORM
  // - title, description, genres, rating...
  // - dùng chung cho Movie + Series
  // ========================= //
  const {
    form,
    setForm,
    updateField,
    resetForm,
    isDirty: isFormDirty,
  } = useMediaForm();

  // ========================= //
  // 2. SERIES BUILDER
  // - chỉ quản lý UI state của season/episode
  // - chưa upload, chưa save DB
  // ========================= //
  const {
    seasons,
    addSeason,
    removeSeason,
    addEpisode,
    removeEpisode,
    updateEpisode,
  } = useSeriesForm();

  // ========================= //
  // 3. SINGLE MOVIE
  // - chỉ quản lý file state cho Movie
  // - file video + thumbnail
  // - chưa submit API
  // ========================= //
  const {
    file,
    setFile,
    progress,

    thumbnailFile,
    setThumbnailFile,
    thumbProgress,

    resetMovieUpload,
    isMovieUploadDirty,

    alertModal,
    setAlertModal,

    readyToSubmit,
  } = useSingleMovie(form);

  // ========================= //
  // 4. MAIN SUBMIT ORCHESTRATOR
  // - Publish / Save Draft
  // - validate
  // - upload S3
  // - save DB
  // ========================= //
  const {
    publish,
    saveDraft,
    loading,
  } = useMediaSubmit({
    form,
    seasons,

    // movie files
    file,
    thumbnailFile,

    // progress setters
    setProgress,
    setThumbProgress,

    // UI alert
    setAlertModal,

    // reset callbacks
    resetForm,
    resetMovieUpload,
  });

  // ========================= //
  // RESET ALL
  // ========================= //
  const handleReset = () => {
    resetForm();
    resetMovieUpload();
    // Series state có thể reset thêm nếu muốn sau:
    // resetSeries();
  };

  // ========================= //
  // PUBLISH
  // ========================= //
  const handleSubmit = async () => {
    await publish();
  };

  // ========================= //
  // SAVE DRAFT
  // ========================= //
  const handleSaveDraft = async () => {
    await saveDraft();
  };

  // ========================= //
  // DIRTY STATE
  // ========================= //
  const isDirty =
    isFormDirty || isMovieUploadDirty || seasons.length > 0;

  // ========================= //
  // RENDER
  // ========================= //
  return (
    <div className="animate-in fade-in duration-500">
      {/* ... toàn bộ UI giữ nguyên ... */}

      {/* HEADER ACTIONS */}
      <button onClick={handleReset}>
        Reset
      </button>

      <button onClick={handleSaveDraft}>
        Save Draft
      </button>

      <button onClick={handleSubmit}>
        Publish
      </button>

      {/* SINGLE MOVIE */}
      {form.type === "Movie" && (
        <VideoDropzone
          id="movie-upload"
          file={file}
          onChange={setFile}
        />
      )}

      {/* SERIES */}
      {form.type === "Series" && (
        <EpisodeManagementSection
          seasons={seasons}
          addSeason={addSeason}
          removeSeason={removeSeason}
          addEpisode={addEpisode}
          removeEpisode={removeEpisode}
          updateEpisode={updateEpisode}
        />
      )}

      {/* ALERT MODAL */}
      {alertModal.open && (
        <AlertModal
          open={alertModal.open}
          type={alertModal.type}
          message={alertModal.message}
          onClose={() =>
            setAlertModal((prev) => ({
              ...prev,
              open: false,
            }))
          }
        />
      )}
    </div>
  );
};