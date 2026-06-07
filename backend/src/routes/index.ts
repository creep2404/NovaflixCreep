import { Router } from "express";
import authRoutes from "@/modules/auth/auth.route";
import userRoutes from "@/modules/user/user.route";
import movieRoutes from "@/modules/movie/movie.route";
import watchHistoryRoutes from "@/modules/watch-history/watch-history.route";
import notificationRoutes from "@/modules/notification/notification.route";
import genreRRoutes from "@/modules/genre/genre.route";
import streamingRoutes from "@/modules/streaming/streaming.route";
import episodeRoutes from "@/modules/episode/episode.route";

const router = Router();

// test route
router.get("/health", (req, res) => {
  res.send("API OK");
});

// mount module
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/watch-history", watchHistoryRoutes);
router.use("/notifications", notificationRoutes);
router.use("/genres", genreRRoutes);
router.use("/streaming", streamingRoutes);
router.use("/episodes", episodeRoutes);

export default router; 