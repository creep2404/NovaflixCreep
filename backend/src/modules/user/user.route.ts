import { Router } from "express";
import { getContinueWatching } from "@/modules/movie/movie.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import { getUser } from "./user.controller";

const router = Router();

router.get("/me/continue-watching", authMiddleware, getContinueWatching);
router.get("/:id", authMiddleware, getUser);


export default router;