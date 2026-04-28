export const Pagination = ({ meta, page, setPage, isFetching }: any) => {
  if (!meta || meta.totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10 gap-2 flex-wrap">
      {Array.from({ length: meta.totalPages }).map((_, i) => {
        const p = i + 1;

        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            disabled={isFetching}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition hover:scale-105 ${
              page === p ? "bg-primary text-black" : "bg-surface-high text-white hover:bg-white/10"
            }`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};