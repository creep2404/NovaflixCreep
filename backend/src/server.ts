import app from "@/app";
import { env } from "@/config/env";
import { initEventListeners } from "./events";
import dotenv from "dotenv";

initEventListeners();
dotenv.config();

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
  console.log(`🚀 Server running on http://localhost:${env.port}`);
  console.log(
    `🚀 Swagger running on http://localhost:${env.port}/nova-api-docs`,
  );
});
