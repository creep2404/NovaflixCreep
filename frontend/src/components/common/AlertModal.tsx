type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  type?: "error" | "success";
};

export const AlertModal = ({
  open,
  title = "Something went wrong",
  description,
  type = "error",
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-surface rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

        {description && (
          <p className="text-sm text-on-surface-variant mb-6">{description}</p>
        )}

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg bg-primary-fixed text-white font-semibold border 
                ${
                  type === "error"
                    ? "bg-red-500 border-red-600"
                    : "bg-green-500 border-green-600"
                }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
