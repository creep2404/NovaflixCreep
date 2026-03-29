import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/config/s3";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

export const uploadVideoToS3 = async (file: Express.Multer.File) => {
  const key = `movies/${randomUUID()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return key;
};