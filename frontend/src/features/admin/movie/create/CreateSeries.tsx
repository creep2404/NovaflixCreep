import { useState } from "react";
import {
  ChevronRight,
  Info,
  Layers,
  Image as ImageIcon,
  Camera,
  MonitorPlay,
  Wand2,
} from "lucide-react";
import { RatingInput } from "./components/StarRating";
import { ReleaseDateField } from "./components/DurationField";
import { TrailerUrlField } from "./components/TrailerUrlField";
import { ImageUploadCard } from "./components/ImageUploadCard";
import { GenreField } from "./components/GenreField";
import { EpisodeManagementSection } from "./components/episode/EpisodeManagementSection";
import { useSeriesForm } from "./hooks/useSeriesForm";
import { VideoDropzone } from "./components/VideoDropzone";
import { useMediaForm } from "./hooks/useMediaForm";
import { useSingleMovie } from "./hooks/useSingleMovie";
import { useMediaSubmit } from "./hooks/useMediaSubmit";
import { AlertModal } from "@/src/shared/components/ui/AlertModal";

export const CreateSeriesPage = () => {
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
  // 2. SERIES
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
    resetSeries,
  } = useSeriesForm();

  // ========================= //
  // 3. SINGLE MOVIE
  // - chỉ quản lý file state cho Movie lẻ
  // - file video + thumbnail
  // - chưa submit API
  // ========================= //
  const {
    file,
    setFile,
    progress,
    setProgress,

    // THUMBNAIL
    thumbnailFile,
    setThumbnailFile,
    thumbProgress,
    setThumbProgress,
    poster,
    setPoster,
    banner,
    setBanner,

    // ACTIONS
    resetMovieUpload,

    // UI STATE
    isMovieUploadDirty,
    readyToSubmit,

    // ALERT
    alertModal,
    setAlertModal,

    //readyToSubmit,
  } = useSingleMovie(form);

  // ========================= //
  // 4. MAIN SUBMIT ORCHESTRATOR
  // - Publish / Save Draft
  // - validate
  // - upload S3
  // - save DB
  // ========================= //
  const { publish, saveDraft, loading } = useMediaSubmit({
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
    resetSeries,
  });

  // ========================= //
  // RESET ALL
  // ========================= //
  const handleReset = () => {
    resetForm();
    resetMovieUpload();

    resetSeries();
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
  const isDirty = isFormDirty || isMovieUploadDirty || seasons.length > 0;

  const [showAllGenres, setShowAllGenres] = useState(false);

  const visibleGenres = showAllGenres ? form.genres : form.genres.slice(0, 6);

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
            <button
              onClick={() => onViewChange("list")}
              className="hover:text-primary transition-colors"
            >
              Library
            </button>
            <ChevronRight size={16} />
            <span className="text-on-surface">Create New Series</span>
          </nav>
          <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface italic">
            Create New {form.type}
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-surface-container-high text-on-surface border border-outline-variant/20 rounded-full font-semibold hover:bg-surface-variant transition-colors"
          >
            Reset
          </button>
          <button className="px-8 py-3 bg-surface-container-high text-on-surface border border-outline-variant/20 rounded-full font-semibold hover:bg-surface-variant transition-colors">
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-10 py-3 bg-primary-container text-on-primary-container rounded-full font-bold shadow-xl shadow-primary-container/10 transition-all hover:scale-105 active:scale-95"
          >
            Publish
          </button>
        </div>
      </header>

      {/* TYPE SWITCH */}
      <div className="mb-10 flex justify-start">
        <div className="bg-surface-container-low p-1.5 rounded-full flex items-center gap-1 border border-outline-variant/10 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() =>
              setForm({
                ...form,
                type: "Movie",
              })
            }
            className={`px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
              form.type === "Movie"
                ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <MonitorPlay size={18} />
            Single Movie
          </button>
          <button
            onClick={() =>
              setForm({
                ...form,
                type: "Series",
              })
            }
            className={`px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
              form.type === "Series"
                ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Layers size={18} />
            TV Series
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-surface-container-low rounded-xl p-8 space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <Info className="text-primary" size={24} />
              <h2 className="text-xl font-bold tracking-tight">
                General Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">
                  Movie Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter movie/series title"
                  className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline-variant/50 outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">
                  Original Title
                </label>
                <input
                  type="text"
                  value={form.originalTitle}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      originalTitle: e.target.value,
                    })
                  }
                  placeholder="Original Title"
                  className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline-variant/50 outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-variant px-1">
                Description
              </label>
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Enter a brief summary of the movie..."
                className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline-variant/50 resize-none outline-none focus:ring-1 focus:ring-primary/50"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">
                  Director
                </label>
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      director: e.target.value,
                    })
                  }
                  placeholder="Director Name"
                  className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline-variant/50 outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">
                  Release Date
                </label>
                <ReleaseDateField
                  value={form.releaseDate}
                  onChange={(releaseDate) =>
                    setForm({
                      ...form,
                      releaseDate,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as
                        | "Ongoing"
                        | "Completed"
                        | "Upcoming",
                    })
                  }
                  className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface appearance-none outline-none focus:ring-1 focus:ring-primary/50"
                >
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>Upcoming</option>
                </select>
              </div>
            </div>
            {/* GENRES + DURATION + RATING */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* GENRES */}
              <div className="lg:col-span-2 rounded-2xl bg-surface-container p-5 border border-outline-variant/30 space-y-4">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Genres
                </label>

                <div className="flex flex-wrap gap-2 min-h-[48px] items-center">
                  <GenreField
                    value={form.genres}
                    onChange={(genres) =>
                      setForm({
                        ...form,
                        genres,
                      })
                    }
                  />
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="space-y-5">
                {/* DURATION */}
                <div className="rounded-2xl bg-surface-container p-5 border border-outline-variant/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-on-surface-variant">
                      Duration
                    </label>

                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {form.duration} min
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duration: Number(e.target.value),
                      })
                    }
                    className="w-full cursor-pointer accent-primary"
                  />
                </div>

                {/* RATING */}
                <div className="rounded-2xl bg-surface-container p-5 border border-outline-variant/30">
                  <RatingInput
                    value={form.rating}
                    onChange={(rating) =>
                      setForm({
                        ...form,
                        rating,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-variant px-1">
                Cast
              </label>
              <div className="w-full bg-surface-container-highest rounded-lg p-3 min-h-[56px] flex flex-wrap gap-2 items-center border-2 border-transparent focus-within:border-primary/50 transition-all cursor-text">
                <input
                  type="text"
                  placeholder="Add actors..."
                  className="flex-1 min-w-[120px] bg-transparent border-none p-1 text-sm text-on-surface placeholder:text-outline-variant/50 focus:ring-0 outline-none"
                />
              </div>
            </div>
          </section>

          {form.type === "Movie" && (
            <VideoDropzone id="movie-upload" file={file} onChange={setFile} />
          )}

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
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container-low rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <ImageIcon className="text-primary" size={24} />

              <h2 className="text-xl font-bold tracking-tight">
                Images / Trailer
              </h2>
            </div>

            <ImageUploadCard
              label="Vertical Poster (2:3)"
              image={poster}
              onChange={({ file, previewUrl }) => {
                setThumbnailFile(file);
                setPoster(previewUrl);
              }}
              aspect="aspect-[2/3]"
              icon={Camera}
              actionText="Replace Poster"
            />

            <ImageUploadCard
              label="Horizontal Banner (16:9)"
              image={banner}
              onChange={({ file, previewUrl }) => {
                //setBannerFile(file);
                setBanner(previewUrl);
              }}
              aspect="aspect-video"
              icon={ImageIcon}
              actionText="Replace Banner"
            />

            <TrailerUrlField
              value={form.trailerUrl}
              onChange={(trailerUrl) =>
                setForm({
                  ...form,
                  trailerUrl,
                })
              }
            />
          </section>

          <section className="bg-primary/5 rounded-xl p-8 border border-primary/10 space-y-4">
            <div className="flex items-center gap-4">
              <Wand2 className="text-tertiary" size={24} />

              <h2 className="text-lg font-bold text-on-surface">
                Curator Tips
              </h2>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              Use high-quality 4K images to increase click-through rates. The
              trailer should be between 1:30 and 2:30 minutes to optimize viewer
              experience.
            </p>
          </section>
        </div>
      </div>

      {/* ALERT MODAL */}
      {alertModal.open && (
        <AlertModal
          open={alertModal.open}
          type={alertModal.type}
          description={alertModal.message}
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
