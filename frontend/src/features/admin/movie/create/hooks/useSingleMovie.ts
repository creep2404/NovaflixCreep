// HookGoing/useSingleMovie.ts

import { useState } from "react";
import { MovieMetadataFormState } from "./useMediaForm";

type AlertModalState = {
  open: boolean;
  message: string;
  type: "error" | "success";
};

export const useSingleMovie = (form: MovieMetadataFormState) => {
  const DEFAULT_POSTER = "https://lh3.googleusercontent.com/aida-public/AB6AXuCKrhGQbGRIC4c8aBwFgMliFgpimZS9lVjuzHy0BjwyfkVlfNgN-x2i65hlycaWEqbiPnJm7cRLIvVwwCe6Dh-4i92vNvWyoEjXXspuO_KA7mSbmsWIJwQZMnUWiB1JdPUwvRjTl3BwG922bAM2bs82nizPCmu3PGm2FAV798Cfm7TyhBpwemv8XMzeFPk07uKHwnmTGxZYUIn7WtthVMD4OtZBRisBD3imeW4dilXaFCJtSwCIY0VJvHzkXsKC3VCPiH7THSlU95s";
  const DEFAULT_BANNER = "https://lh3.googleusercontent.com/aida-public/AB6AXuDWy_WDZHJk2o3tMeLJh8pJuyvoUwbN6xkvXxx701wAa8h1EwkFNE12lK4yJMQsd4KisBHQt7LsPp_cQz30Rd69wmLaaee2SFr23uKlICZa7iYLcxpRV8iDAHmmHbXxWF-afg0TTUw_oLBFbhx7VNVoWGa1kACe4t4OCpC4dBMRSEoyCIqmvYFC7nqQSGML1fYjblqjpDaVzi6fnpnW_OIVgVobyVy4H403u6nhqVHE-r0sD7E7gAq22by2XPfmFkGTBPgRC7tXA-8";
  // ========================= //
  // THUMBNAIL & POSTER
  // ========================= //
  const [poster, setPoster] = useState(
    DEFAULT_POSTER,
  );

  const [banner, setBanner] = useState(
    DEFAULT_BANNER
  );

  // ========================= //
  // VIDEO FILE
  // ========================= //
  const [file, setFile] = useState<File | null>(null);

  // Upload progress (được cập nhật bởi useMediaSubmit)
  const [progress, setProgress] = useState(0);

  // ========================= //
  // THUMBNAIL FILE
  // ========================= //
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Thumbnail upload progress
  const [thumbProgress, setThumbProgress] = useState(0);

  // ========================= //
  // ALERT MODAL
  // ========================= //
  const [alertModal, setAlertModal] = useState<AlertModalState>({
    open: false,
    message: "",
    type: "error",
  });

  // ========================= //
  // RESET MOVIE UPLOAD STATE
  // ========================= //
  const resetMovieUpload = () => {
    setFile(null);
    setThumbnailFile(null);
    setProgress(0);
    setThumbProgress(0);
    setPoster(DEFAULT_POSTER);
    setBanner(DEFAULT_BANNER);
    
  };

  // ========================= //
  // DIRTY STATE
  // ========================= //
  const isMovieUploadDirty = !!file || !!thumbnailFile;

  // ========================= //
  // READY TO SUBMIT (UI helper)
  // Chỉ dùng để enable/disable nút nếu muốn.
  // Publish thực tế vẫn được validate trong useMediaSubmit.
  // ========================= //
  const readyToSubmit =
    !!file &&
    !!thumbnailFile &&
    form.title.trim().length > 0 &&
    form.description.trim().length > 0;

  return {
    // VIDEO
    file,
    setFile,
    progress,
    setProgress,

    // THUMBNAIL
    thumbnailFile,
    setThumbnailFile,
    thumbProgress,
    setThumbProgress,
    poster,
    setPoster,
    banner,
    setBanner,

    // ACTIONS
    resetMovieUpload,

    // UI STATE
    isMovieUploadDirty,
    readyToSubmit,

    // ALERT
    alertModal,
    setAlertModal,
  };
};
