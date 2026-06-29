import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Plus,
  ChevronDown,
  Filter,
  RefreshCw,
  Edit2,
  History,
  Trash2,
  Star,
  ChevronLeft,
} from "lucide-react";
import { Movie, ViewState } from "../types";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { useAdminMovies } from "./hooks/useAdminMovies";
import { Pagination } from "@/src/features/search/components/Pagination";

const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Bóng Đêm Rực Rỡ",
    metadata: "Drama, Mystery • 1h 45m",
    type: "Phim Lẻ",
    status: "Live",
    rating: 4.5,
    updatedAt: "24/05/2024, 14:20",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQpUWXrJd_xdeLboMtzHpdSsgnamNMS01RI9hvl5_KepZ1joiWFou3ea4IraZcnq-ZUwxR3_lU3CphSucIq3xBL0NORZlA1QOzmu36NSfQefjKLP6z0SrCbqXs6zMHUkQqx5bqzPjHss1L74wq0X7BBK2Fsv56lBWpSYjYmSuXvP12GR1GVvEBcFmveRXqMPY2wwuI0iBo3Z_GYNQGTXLlXlhgxs-2Dc3N8h0_x5l70gtenjY-yJeVsEK5lS34Foy_b3VIQyMl5XU",
  },
  {
    id: "2",
    title: "Vô Kỷ Nguyên",
    metadata: "Sci-Fi, Adventure • Season 1",
    type: "Phim Bộ",
    status: "Draft",
    rating: 4.0,
    updatedAt: "23/05/2024, 09:15",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgCxQJe9n74iy1Yq2GtB04SWQaEbAG991vEhslwVdZoiMC2S7ov_-WKr6R27ytZ-qlDaoDMgp8xWQZ_xMlIrO-fiOyu-Y836qlHTP1sdyg2BWeuRlzKIh9LO6heDDfUE5Tlcp7R3rEX7jvaRxGPCD2JtpW4HsjQxZ8SScTi9cTMxmVug46mLVsbMpd3BLlnDrMaSuee-jLCgX1xuNryLELJsIYKykWbIltXr1CE-TqTvgtvaG7MeauoTaAkJ-ZXbSZfJaHUtGdAjA",
  },
  {
    id: "3",
    title: "Thám Tử Cuối Cùng",
    metadata: "Noir, Thriller • 2h 10m",
    type: "Phim Lẻ",
    status: "Encoding",
    rating: 5.0,
    updatedAt: "22/05/2024, 18:45",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoBOTl4tsGPZV2umSOO06vx1u0rK76sv99IXTuHL7SVBUaJGkJpgtEH10Aie8y8BbrEi3e3yY6Mq4Z3zuyw_0eHCDTDlB5xO3WSYZiW0OhuSVgdzagEgqDyymsrglR53Qetgnyghn6jvzRtV1X9IQm49c5oU1WJ70B14SSlzTUQ4925nNBI95LMt-HLSnUAI322a7hnFhvy7dchXQ3At1Zj3Eqf2vxagKkAMhwPucP4D1zYt5ynprNPTmroHpLeoFW8xnl4d45vOA",
  },
  {
    id: "4",
    title: "Tốc Độ Tử Thần",
    metadata: "Action, Crime • 1h 55m",
    type: "Phim Lẻ",
    status: "Live",
    rating: 4.0,
    updatedAt: "21/05/2024, 11:30",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpPjWN9bfQ_kNWGfZoihZMm6HGxW5r3itL1v2w6TvXxVr18fxsTxPW31uRpngknv5-sA3kOj1k28yqTGt3XhhdRrOU5e-3NeEAIPV6kYU-PKw65fjeKnCwkbokTDlPmtItie4vvqsmiMjPPvVHfNTJBSLKeOotFLx75XRWEN5t0frbQVmN67AxX5cycNzNxeRlmU73X_N3soi-LzkLmU7xGL5P6MK4VQBbqyiThhISLPVZk9PI5bWHOIGB_uAWNp44B9h8HzcoRSQ",
  },
];

interface ContentListProps {
  onViewChange: (view: ViewState) => void;
}

export const ContentList: React.FC<ContentListProps> = ({ onViewChange }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [draftFilters, setDraftFilters] = useState({
    status: null as string | null,
    type: null as string | null,
    genre: null as string | null,
  });

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: null as string | null,
    type: null as string | null,
    genre: null as string | null,
  });

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, refetch } = useAdminMovies({
    page,
    search: appliedFilters.search,
    status: appliedFilters.status,
    type: appliedFilters.type,
  });

  const movies = data?.items ?? [];
  const meta = data?.meta;

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [appliedFilters.search, appliedFilters.status, appliedFilters.type]);

  // const [movies] = useState<Movie[]>(MOCK_MOVIES);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RELEASED":
        return "text-emerald-400 bg-emerald-400";

      case "UPCOMING":
        return "text-primary bg-primary";

      case "ARCHIVED":
        return "text-red-400 bg-red-400";

      default:
        return "text-slate-400 bg-slate-400";
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant/60 mb-2">
            <span>NovaFlix</span>
            <ChevronRight size={14} />
            <span className="text-primary/80">Content Management</span>
          </nav>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
            Movie List
          </h2>
        </div>
        <button
          onClick={() => onViewChange("create")}
          className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all duration-200"
        >
          <Plus size={20} />
          Add New Movie
        </button>
      </div>

      <div className="glass-panel bg-surface-container-low/40 rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4">
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 pl-1">
            Status
          </label>
          <div className="relative">
            <select
              value={draftFilters.status ?? ""}
              onChange={(e) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  status: e.target.value || null,
                }))
              }
              className="w-full bg-surface-container-highest/50 border-b-2 border-transparent focus:border-primary border-0 rounded-lg text-sm text-on-surface px-3 py-2.5 appearance-none focus:ring-0 outline-none"
            >
              <option>Published</option>
              <option>Draft</option>
              <option>Encoding</option>
              <option value="">All Statuses</option>
              <option value="RELEASED">Released</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
              size={16}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 pl-1">
            Movie Type
          </label>
          <div className="relative">
            <select
              value={draftFilters.type ?? ""}
              onChange={(e) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  type: e.target.value || null,
                }))
              }
              className="w-full bg-surface-container-highest/50 border-b-2 border-transparent focus:border-primary border-0 rounded-lg text-sm text-on-surface px-3 py-2.5 appearance-none focus:ring-0 outline-none"
            >
              <option value="">All Types</option>
              <option value="MOVIE">Movie</option>
              <option value="SERIES">Series</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
              size={16}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 pl-1">
            Genre
          </label>
          <div className="relative">
            <select
              value={draftFilters.genre ?? ""}
              onChange={(e) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  genre: e.target.value || null,
                }))
              }
              className="w-full bg-surface-container-highest/50 border-b-2 border-transparent focus:border-primary border-0 rounded-lg text-sm text-on-surface px-3 py-2.5 appearance-none focus:ring-0 outline-none"
            >
              <option value="">All Genres</option>
              <option value="SCI-FI">Sci-Fi</option>
              <option value="NOIR">Noir</option>
              <option value="THRILLER">Thriller</option>
              <option value="ACTION">Action</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
              size={16}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 min-w-[240px] flex-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 pl-1">
            Search
          </label>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="bg-surface-container-highest/50 rounded-lg px-4 py-2.5 text-sm text-on-surface outline-none w-128 focus:ring-2 focus:ring-primary/50 focus:ring-offset-0 focus:ring-offset-transparent transition-all"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => {
              setAppliedFilters({
                search,
                ...draftFilters,
              });

              setPage(1);
            }}
            className="p-2.5 rounded-lg bg-surface-container-highest/50 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors"
          >
            <Filter size={20} />
          </button>
          <button
            onClick={() => refetch()}
            className="p-2.5 rounded-lg bg-surface-container-highest/50 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-[80px_1fr_120px_120px_120px_160px_120px] px-6 text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/50">
          <span>Poster</span>
          <span>Movie Title</span>
          <span>Type</span>
          <span>Status</span>
          <span>Rating</span>
          <span>Last Updated</span>
          <span className="text-right">Actions</span>
        </div>

        {movies.map((movie) => (
          <div
            key={movie.id}
            className="grid grid-cols-[80px_1fr_120px_120px_120px_160px_120px] items-center px-6 py-4 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl group"
          >
            <div className="w-12 h-16 rounded overflow-hidden shadow-lg border border-white/5">
              <img
                src={movie.thumbnailUrl ?? "/placeholder-movie.jpg"}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                {movie.title}
              </span>
              <span className="text-[10px] text-on-surface-variant/60 font-medium">
                {`${movie.duration} min • ${movie.views || 0} views`}
              </span>
            </div>
            <div>
              <span className="px-2 py-1 bg-surface-container-highest text-[10px] font-bold uppercase tracking-wider rounded text-on-surface-variant">
                {movie.type}
              </span>
            </div>
            <div>
              <span
                className={`flex items-center gap-1.5 text-xs font-semibold ${getStatusColor(movie.status).split(" ")[0]}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${getStatusColor(movie.status).split(" ")[1]} ${movie.status === "Live" ? "animate-pulse" : movie.status === "Encoding" ? "animate-spin" : ""}`}
                ></span>
                {movie.status}
              </span>
            </div>
            <div className="flex items-center text-primary text-sm gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={
                    star <= Math.floor(movie.rating)
                      ? "fill-primary"
                      : "text-outline-variant"
                  }
                />
              ))}
            </div>
            <div className="text-xs text-on-surface-variant/80">
              {movie.updatedAt}
            </div>
            <div className="flex items-center justify-end gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
                <Edit2 size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-tertiary/10 hover:text-tertiary transition-all">
                <History size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-error/10 hover:text-error transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-white/5 pt-8">
        <Pagination
          meta={meta}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};
