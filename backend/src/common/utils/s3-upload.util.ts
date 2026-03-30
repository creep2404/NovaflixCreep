import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/config/s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

//PRESIGNED UPLOAD
export const getPresignedUploadUrl = async (
  filename: string,
  contentType: string
) => {
  const key = `movies/${randomUUID()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return {
    uploadUrl,
    key,
  };
};