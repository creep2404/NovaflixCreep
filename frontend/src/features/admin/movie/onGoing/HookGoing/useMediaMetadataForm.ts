import { useState } from "react";
import {  MovieMetadataFormState } from "./MovieMetadataForm";

const initialForm: MovieMetadataFormState = {
  title: "",
  originalTitle: "",
  description: "",
  director: "",
  genres: [],
  releaseDate: "",
  rating: 0,
  trailerUrl: "",
  status: "Ongoing",
  cast: [],
  country: "",
  ageRating: "",
  type: "Series",
};

export const useMovieMetadataForm = () => {
  const [form, setForm] = useState<MovieMetadataFormState>(initialForm);
  const resetMetadata = () => {
    setForm(initialForm);
  };
  const isMetadataDirty = Object.values(form).some((v) => {
    if (Array.isArray(v)) {
      return v.length > 0;
    }
    if (typeof v === "number") {
      return v !== 0;
    }
    return v !== "";
  });
  return { form, setForm, resetMetadata, isMetadataDirty };
};
