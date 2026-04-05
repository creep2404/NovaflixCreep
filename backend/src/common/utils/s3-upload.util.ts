import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/config/s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

export const uploadVideoToS3 = async (file: Express.Multer.File) => {
  const videoId = randomUUID();
  
  const key = `movies/${videoId}/source.mp4`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return {
    videoId,
  };
};

//PRESIGNED UPLOAD
/**
 * Generate a pre-signed URL for uploading a file to S3
 * 
 * @param filename - original name of the video or file to upload
 * @param contentType - MIME type of the file (e.g., 'video/mp4')
 * @returns An object containing:
 *   - uploadUrl: temporary URL to PUT the file to S3
 *   - key: storage path of the file on S3 (can be used for downloading later)
 * 
 * Notes:
 * - The URL is valid for 5 minutes (expiresIn: 60*5)
 * - You must use the PUT method to send the file to this URL
 * - The key is randomly generated to avoid collisions
 */
export const getPresignedUploadUrl = async (
  filename: string,
  contentType: string
) => {
  // Generate the key to store the file on S3: movies/<random-uuid>-<filename>
  const key = `movies/${randomUUID()}-${filename}`;

  // Create a PUT object command with bucket, key, and content type
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  // Generate the pre-signed URL from the command
  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5, // URL valid for 5 minutes
  });

  // Return both uploadUrl and key
  return {
    uploadUrl,
    key,
  };
};

/**
 * Generate a pre-signed URL for downloading/rendering a file from S3
 * 
 * @param key - the storage path of the file on S3 (returned when uploading)
 * @returns A temporary URL to GET the file from S3
 * 
 * Notes:
 * - The URL is valid for 5 minutes (expiresIn: 60*5)
 * - This URL can be used directly in <video src="..."> or <img src="...">
 * - Make sure the key exists in your S3 bucket
 */
export const getPresignedDownloadUrl = async (key: string) => {
  // Create a GET object command with bucket and key
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  // Generate the pre-signed URL for downloading
  const downloadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5, // URL valid for 5 minutes
  });

  // Return the download URL
  return downloadUrl;
};