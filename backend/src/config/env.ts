import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
})

export const env = {
  // Server
  PORT: process.env.PORT ?? 3000,
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? 24 * 60 * 60 * 1000,
  
  // AWS
  AWS_REGION: process.env.AWS_REGION!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET!,
  AWS_CLOUD_FRONT_IMAGE_PUBLIC: process.env.AWS_CLOUD_FRONT_IMAGE_PUBLIC!,
  AWS_CLOUD_FRONT_KEY_PAIR: process.env.AWS_CLOUD_FRONT_KEY_PAIR!,
  AWS_CLOUD_FRONT_KEY_PRIVATE: process.env.AWS_CLOUD_FRONT_KEY_PRIVATE!,

  // Client
  CLIENT_URL: process.env.CLIENT_URL!,

  //Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_URL: process.env.REDIS_URL,

  //Other
  NODE_ENV: process.env.NODE_ENV ?? "development",
  CDN_DOMAIN: process.env.CDN_DOMAIN,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN

};