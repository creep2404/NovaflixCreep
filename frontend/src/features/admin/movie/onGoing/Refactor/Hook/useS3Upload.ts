import { useState } from "react";
import { createUploadUrl } from "@/src/apis/movie.api";
import { uploadToS3 } from "@/src/services/s3.service";

type UploadFileParams = {
  file: File;
  videoId: string;
  fileType: "video" | "thumbnail";
  onProgress?: (progress: number) => void;
};

export const useS3Upload = () => {
  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] = useState(0);

  const [error, setError] =
    useState<string | null>(null);

  const uploadFile = async ({
    file,
    videoId,
    fileType,
    onProgress,
  }: UploadFileParams) => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const presigned =
        await createUploadUrl({
          videoId,
          fileType,
        });

      await uploadToS3(
        file,
        presigned.uploadUrl,
        (value) => {
          setProgress(value);
          onProgress?.(value);
        },
      );

      return {
        key: presigned.key,
      };
    } catch (err) {
      console.error(err);

      setError("Upload failed.");

      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadFile,
    uploading,
    progress,
    error,
  };
};