import { Router } from "express";
import { getContinueWatching } from "@/modules/movie/movie.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import { getMe } from "./user.controller";
import { validateRequestParams } from "@/common/validations/validate";
import { paramIdSchema } from "@/common/dto/param.dto";

const router = Router();

router.get("/me/continue-watching", authMiddleware, getContinueWatching);
router.get("/me", authMiddleware, getMe);


export default router;