import { AnalyticsRow } from "@/src/features/admin/dashboard/components/AnalyticsRow";
import { MetadataForm } from "@/src/features/admin/movie/create/components/MetadataForm";
import { MovieCreationHeader } from "@/src/features/admin/movie/create/components/MovieCreationHeader";
import { RecentUploads } from "@/src/features/admin/movie/create/components/RecentUploads";
import { UploadZone } from "@/src/features/admin/movie/create/components/UploadZone";
import { AlertModal } from "@/src/shared/components/ui/AlertModal";
import { useMovieForm } from "@/src/features/admin/movie/create/hooks/useMovieForm";

export const CreateMoviePage = () => {
  
  const {
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
  } = useMovieForm();

  const handleCancel = () => {
    if (isDirty) {
      const confirmed = confirm("Discard changes?");
      if (!confirmed) return;
    }
    reset();
  };
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-fixed/30">
      {/* Alert Modal */}
      <AlertModal
        open={alertModal.open}
        description={alertModal.message}
        type={alertModal.type}
        onClose={() =>
          setAlertModal({ open: false, message: "", type: "error" })
        }
      />
      <div className="min-h-screen flex flex-col">
        {/* <TopNavBar /> */}
        {/* <Sidebar/> */}
        <main className="mx-auto w-full space-y-12">
          {/* <ConfirmModal
            open={showConfirm}
            onConfirm={handleConfirmDiscard}
            onCancel={handleCloseModal}
          /> */}
          <MovieCreationHeader onSubmit={submit} onCancel={handleCancel} />
          <AnalyticsRow />
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <UploadZone
              onFileSelect={setFile}
              progress={progress}
              fileName={file?.name}
            />
            <MetadataForm
              data={form}
              setData={setForm}
              thumbnailFile={thumbnailFile}
              setThumbnailFile={setThumbnailFile}
            />
          </section>
          <RecentUploads />
        </main>
        {/* <Footer /> */}
      </div>
      {/* <MobileActionsBar /> */}
    </div>
  );
};
