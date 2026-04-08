import express from "express";
import { getGenres } from "./genre.controller";
import { validateRequestQuery } from "@/common/validations/validate";
import { queryGenreSchema } from "./schemas/query-genre.schema";
const router = express.Router();

router.get("/", validateRequestQuery(queryGenreSchema), getGenres);

export default router;
