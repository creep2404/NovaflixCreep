import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorMiddleware } from "./common/middleware/error.middleware";
import routes from "./routes";
import { globalLimiter } from "./common/middleware/rateLimit.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { env } from "./config/env";

const app = express();

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(globalLimiter);
app.use("/nova-api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

app.use(errorMiddleware); //LUÔN phải là middleware cuối cùng

export default app;