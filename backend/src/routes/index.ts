import { Router } from "express";
import authRoutes from "@/modules/auth/auth.route";
import movieRoutes from "@/modules/movie/movie.route";

const router = Router();

// test route
router.get("/health", (req, res) => {
  res.send("API OK");
});

// mount module
router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);

export default router;