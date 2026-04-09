import { AnalyticsRow } from "@/src/components/admin/AnalyticsRow";
import { MetadataForm } from "@/src/components/admin/MetadataForm";
import { PageHeader } from "@/src/components/admin/PageHeader";
import { RecentUploads } from "@/src/components/admin/RecentUploads";
import { UploadZone } from "@/src/components/admin/UploadZone";
import { AlertModal } from "@/src/components/common/AlertModal";
import { useMovieForm } from "@/src/hooks/useMovieForm";

export const AdminUpload = () => {
  
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
          <PageHeader onSubmit={submit} onCancel={handleCancel} />
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
