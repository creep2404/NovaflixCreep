import app from "@/app";
import { env } from "@/config/env";
import { initEventListeners } from "./events";
import dotenv from "dotenv";

initEventListeners();
dotenv.config();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  console.log(
    `🚀 Swagger running on http://localhost:${env.PORT}/nova-api-docs`,
  );
});
