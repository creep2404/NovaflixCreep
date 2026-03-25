import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorMiddleware } from "./common/middleware/error.middleware";
import { asyncHandler } from "./common/utils/asyncHandler";
import { AppError } from "./common/utils/AppError";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware); //LUÔN phải là middleware cuối cùng

export default app;