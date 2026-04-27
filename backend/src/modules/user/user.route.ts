import { Router } from "express";
import { getContinueWatching } from "@/modules/movie/movie.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import { getUser } from "./user.controller";
import { validateRequestParams } from "@/common/validations/validate";
import { paramIdSchema } from "@/common/dto/param.dto";

const router = Router();

router.get("/me/continue-watching", authMiddleware, getContinueWatching);
router.get("/:id",validateRequestParams(paramIdSchema)  ,authMiddleware, getUser);


export default router;