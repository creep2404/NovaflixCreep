type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

export function PageHeader({ onSubmit, onCancel }: Props) {
  return (
    <section className="flex justify-between items-end">
      <div>
        <h2 className="text-4xl font-poppins font-black text-white tracking-tight">
          Create Movie
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-md">
          Initialize a new editorial entry. Upload high-bitrate masters and
          populate cinematic metadata.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/15 text-white font-semibold hover:bg-surface-bright hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          
          className="px-6 py-3 rounded-xl bg-white text-black font-bold shadow-md hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
        Save & Publish
        </button>
      </div>
    </section>
  );
}
