import { Router } from "express";
import authRoutes from "@/modules/auth/auth.route";
import movieRoutes from "@/modules/movie/movie.route";
import watchHistoryRoutes from "@/modules/watch-history/watch-history.route";
import notificationRoutes from "@/modules/notification/notification.route";

const router = Router();

// test route
router.get("/health", (req, res) => {
  res.send("API OK");
});

// mount module
router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/watch-history", watchHistoryRoutes);
router.use("/notifications", notificationRoutes);

export default router;