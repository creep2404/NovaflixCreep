type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  open,
  title = 'Discard changes?',
  description = 'All unsaved changes will be lost.',
  onConfirm,
  onCancel,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-surface rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-on-surface-variant mb-6">
          {description}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
          >
            Keep Editing
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};