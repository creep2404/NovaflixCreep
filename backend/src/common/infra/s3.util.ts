import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/config/s3";
import "dotenv/config";
import { env } from "@/config/env";

//Create a temporary URL to access a file on S3.
export const getSignedVideoUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 * 5 }); //5 minutes
};