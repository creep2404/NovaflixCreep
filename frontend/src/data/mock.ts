import { Episode, Comment } from "../common/types";

export interface Movie {
  id?: string;
  title?: string;
  description?: string;

  thumbnailUrl?: string;
  videoUrl?: string;

  duration?: string;
  releaseDate?: string | null;

  rating?: string;
  ratingCount?: number;

  genres: string[];

  isPremium?: boolean;
  isOriginal?: boolean;
  quality?: string;
  matchPercentage?: number;
  year?: number;
}

export const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "VOID RUNNER",
    description:
      "A rogue pilot navigates the treacherous outer rim, uncovering a conspiracy that threatens the very fabric of the galaxy. With time running out, she must assemble a crew of misfits to stop an ancient evil from awakening.",
    year: 2024,
    duration: "2h 15m",
    rating: "18+",
    genres: ["Sci-Fi", "Action", "Thriller"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80",
    isOriginal: true,
    quality: "4K HDR",
    matchPercentage: 98,
  },
  {
    id: "2",
    title: "Neon Nights",
    description:
      "In a cyberpunk metropolis, a detective hunts a serial killer who uses augmented reality to commit crimes.",
    year: 2023,
    duration: "1h 50m",
    rating: "16+",
    genres: ["Cyberpunk", "Mystery"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80",
    isPremium: true,
  },
  {
    id: "3",
    title: "Echoes of Silence",
    description:
      "A psychological thriller about a woman who begins hearing voices after moving into an isolated cabin.",
    year: 2024,
    duration: "2h 05m",
    rating: "18+",
    genres: ["Thriller", "Horror"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "The Last Horizon",
    description:
      "The final mission to Mars goes terribly wrong when the crew discovers they are not alone.",
    year: 2022,
    duration: "2h 30m",
    rating: "13+",
    genres: ["Sci-Fi", "Drama"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    isOriginal: true,
  },
  {
    id: "5",
    title: "Midnight Heist",
    description:
      "A group of elite thieves plan the ultimate robbery during a city-wide blackout.",
    year: 2023,
    duration: "1h 45m",
    rating: "16+",
    genres: ["Action", "Crime"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    title: "Quantum Paradox",
    description:
      "A physicist accidentally creates a tear in spacetime, forcing him to confront alternate versions of himself.",
    year: 2024,
    duration: "2h 10m",
    rating: "13+",
    genres: ["Sci-Fi", "Mind-Bender"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
    isPremium: true,
  },
];

export const MOCK_EPISODES: Episode[] = [
  {
    id: "e1",
    number: 1,
    title: "The Awakening",
    duration: "45m",
    description:
      "The crew discovers a strange anomaly on the edge of the sector.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "e2",
    number: 2,
    title: "Betrayal",
    duration: "52m",
    description: "Tensions rise as a traitor is suspected among the ranks.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "e3",
    number: 3,
    title: "Into the Void",
    duration: "48m",
    description:
      "They must navigate through a dangerous asteroid field to escape pursuit.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=300",
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    user: { name: "Alex Chen", avatar: "https://i.pravatar.cc/150?u=alex" },
    text: "The visual effects in this episode were absolutely mind-blowing. Best sci-fi show of the year!",
    timeAgo: "2 hours ago",
    likes: 342,
  },
  {
    id: "c2",
    user: { name: "Sarah Miller", avatar: "https://i.pravatar.cc/150?u=sarah" },
    text: "I did not see that plot twist coming. The writing is incredibly tight.",
    timeAgo: "5 hours ago",
    likes: 128,
  },
  {
    id: "c3",
    user: { name: "David Kim", avatar: "https://i.pravatar.cc/150?u=david" },
    text: "Pacing was a bit slow in the middle, but the ending made up for it.",
    timeAgo: "1 day ago",
    likes: 56,
  },
];
