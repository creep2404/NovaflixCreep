import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";

const router = Router();

// test route
router.get("/health", (req, res) => {
  res.send("API OK");
});

// mount module
router.use("/auth", authRoutes);

export default router;