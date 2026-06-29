import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ meta, page, setPage, isFetching }: any) => {
  if (!meta || meta.totalPages <= 1) return null;

  const totalPages = meta.totalPages;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
      {/* LEFT INFO */}
      <span className="text-xs text-on-surface-variant/60 font-medium">
        Showing {(page - 1) * meta.limit + 1} -{" "}
        {Math.min(page * meta.limit, meta.total)} of {meta.total} movies
      </span>

      {/* RIGHT PAGINATION */}
      <div className="flex items-center gap-2">
        {/* PREV */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || isFetching}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-all disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>

        {/* PAGES */}
        {getPages().map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="px-2 text-on-surface-variant/60">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              disabled={isFetching}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                page === p
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* NEXT */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || isFetching}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-all disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
