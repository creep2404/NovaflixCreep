import React, { useState } from "react";
import { ScreenType } from "@/src/shared/types";
import { Menu, PlayCircle, MoreVertical } from "lucide-react";
import { useHomepageData } from "../home/hooks/useHomepageData";
import { HistorySection } from "./components/HistorySection";
import { FavoritesSection } from "./components/FavoriteSection";
import { useFavoritesQuery } from "./hooks/useFavorite";
import { useContinueWatching } from "./hooks/useContinueWatching";

interface FavoritesHistoryProps {
  onNavigate: (screen: ScreenType) => void;
}

export const FavoritesHistory = () => {
  const [activeTab, setActiveTab] = useState<"list" | "history">("list");
  const { continueWatching } = useContinueWatching();
  const { data, isLoading } = useFavoritesQuery();

  const movies = data || [];
  const histories = continueWatching.data || null;

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface pb-32">
      <main className="pt-32 max-w-[1600px] mx-auto px-6 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Premium Segmented Control (Tabs) */}
        <div className="flex justify-start mb-10 overflow-hidden">
          <div className="bg-surface-container-high/40 backdrop-blur-md p-1.5 flex gap-2 rounded-full ring-1 ring-outline-variant/20">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "list"
                  ? "bg-surface-bright text-primary shadow-lg shadow-black/40"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              My List
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "history"
                  ? "bg-surface-bright text-primary shadow-lg shadow-black/40"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {!isLoading && !movies && (
            <h2 className="text-xl font-bold">No favorites yet</h2>
          )}
          <FavoritesSection movies={movies ? movies : []} />
          <HistorySection histories={histories || []} />
        </div>
      </main>
    </div>
  );
};
