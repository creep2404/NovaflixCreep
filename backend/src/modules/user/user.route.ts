import { Router } from "express";
import { getContinueWatching } from "@/modules/movie/movie.controller";
import {
  authMiddleware,
  requireRole,
} from "@/common/middleware/auth.middleware";
import { getAllUsers, getMe } from "./user.controller";
import { ROLE } from "@/common/types/role";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.get(
  "/",
  authMiddleware,
  //requireRole(ROLE.ADMIN),
  getAllUsers,
);

export default router;
