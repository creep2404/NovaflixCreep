import app from "@/app";
import { env } from "@/config/env";
import { initEventListeners } from "./events";

initEventListeners();

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
  console.log(`🚀 Server running on http://localhost:${env.port}`);
});