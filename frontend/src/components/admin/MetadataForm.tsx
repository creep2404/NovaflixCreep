import { StarRating } from "../movieForm/StarRating";
import { ReleaseDateField } from "../movieForm/ReleaseDateField";
import { DurationField } from "../movieForm/DurationField";
import { ThumbnailUpload } from "../movieForm/ThumbnailUpload";
import { GenreField } from "../movieForm/GenreField";

type Props = {
  data: any;
  setData: (data: any) => void;
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
};

export function MetadataForm({
  data,
  setData,
  thumbnailFile,
  setThumbnailFile,
}: Props) {
  return (
    <div className="lg:col-span-5 space-y-8">
      <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/5">
        <h4 className="text-lg font-poppins font-bold text-white mb-6">
          Metadata Details
        </h4>

        <div className="lg:col-span-5 space-y-6">
          {/* Thumbnail */}
          <div className="flex space-x-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <ThumbnailUpload
                value={thumbnailFile}
                onChange={setThumbnailFile}
              />
            </div>

            {/* Title + Description */}
            <div className="flex-1 space-y-2">
              <input
                className="w-full bg-surface-container-high rounded-xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Movie Title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <textarea
                className="w-full bg-surface-container-high rounded-xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                rows={3}
                placeholder="Description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
          </div>
          <GenreField
            value={data.genres}
            onChange={(genres) => setData({ ...data, genres })}
          />

          {/* Duration */}
          <DurationField
            value={data.duration}
            onChange={(v) => setData({ ...data, duration: v })}
          />

          {/* Release Date / Year */}
          <ReleaseDateField
            value={data.releaseYear}
            onChange={(v) => setData({ ...data, releaseYear: v })}
          />

          {/* Rating */}
          <StarRating
            value={data.rating}
            onChange={(v) => setData({ ...data, rating: v })}
          />
          {/* <input
            className="w-full bg-surface-container-high rounded-xl p-3"
            placeholder="Movie Title"
            value={data?.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />

          <textarea
            className="w-full bg-surface-container-high rounded-xl p-3"
            rows={4}
            placeholder="Description"
            value={data?.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          /> */}
          {/* <input
            placeholder="Thumbnail URL"
            value={data.thumbnailUrl}
            onChange={(e) => setData({ ...data, thumbnailUrl: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <input
            type="number"
            placeholder="Duration"
            value={data.duration}
            onChange={(e) =>
              setData({ ...data, duration: Number(e.target.value) })
            }
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <input
            placeholder="Release Date (YYYY-MM-DD)"
            value={data.releaseYear}
            onChange={(e) => setData({ ...data, releaseYear: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-white"
          /> */}
        </div>
      </div>
    </div>
  );
}
