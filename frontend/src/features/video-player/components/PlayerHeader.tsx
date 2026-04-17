import { ChevronLeft, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PlayerHeader = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between bg-gradient-to-b from-surface/80 to-transparent">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-white hover:text-primary bg-surface-highest/50 backdrop-blur-md px-4 py-2 rounded-full"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <div className="flex gap-4">
        <button className="p-2 bg-surface-highest/50 rounded-full">
          <Heart size={20} />
        </button>
        <button className="p-2 bg-surface-highest/50 rounded-full">
          <Share2 size={20} />
        </button>
      </div>
    </nav>
  );
};