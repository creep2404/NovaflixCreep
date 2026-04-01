import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorMiddleware } from "./common/middleware/error.middleware";
import routes from "./routes";
import { globalLimiter } from "./common/middleware/rateLimit.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(globalLimiter);

app.use("/api", routes);

app.use(errorMiddleware); //LUÔN phải là middleware cuối cùng

export default app;