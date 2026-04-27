import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/config/s3";
import { getSignedUrl as getSignedUrlAws } from "@aws-sdk/s3-request-presigner";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { env } from "@/config/env";

export const getPresignedUploadUrl = async (
  videoId: string,
  fileType = "video",
) => {
  const key =
    fileType === "thumbnail"
      ? `movies/${videoId}/thumbnails/thumbnail.jpg`
      : `movies/${videoId}/source/source.mp4`;

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    ContentType: fileType === "thumbnail" ? "image/jpeg" : "video/mp4",
  });

  const uploadUrl = await getSignedUrlAws(s3, command, { expiresIn: 300 }); // 5 phút

  return { videoId, key, uploadUrl };
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
  const urlImagePublic = env.AWS_CLOUD_FRONT_IMAGE_PUBLIC;
  const privateKey = env.AWS_CLOUD_FRONT_KEY_PRIVATE?.replace(/\\n/g, "\n");
  //const privateKey = fs.readFileSync("./est/private_key.pem", "utf-8");
  //const privateKey = fs.readFileSync("./est/private1.pem", "utf-8");

  const signedUrl = getSignedUrl({
    url: `${urlImagePublic}/${key}`,
    keyPairId: env.AWS_CLOUD_FRONT_KEY_PAIR!,
    dateLessThan: new Date(Date.now() + 5 * 60 * 1000),
    privateKey: privateKey!,
  });
  // Return the download URL
  return signedUrl;
};
