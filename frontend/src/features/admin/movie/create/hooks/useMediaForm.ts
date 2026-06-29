import { useState } from "react";

export type MovieType = "Movie" | "Series";

export type MovieStatus =
  | "Ongoing"
  | "Completed"
  | "Upcoming";

export type MovieMetadataFormState = {
  title: string;
  originalTitle: string;
  description: string;
  director: string;
  genres: string[];
  releaseDate: string;
  rating: number;
  trailerUrl: string;
  status: MovieStatus;
  cast: string[];
  country: string;
  ageRating: string;
  type: MovieType;
  duration: number;
};

export const initialForm: MovieMetadataFormState = {
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
  type: "Movie",
  duration: 0,
};

export const useMediaForm = () => {
  const [form, setForm] =
    useState<MovieMetadataFormState>(initialForm);

  const updateField = <
    K extends keyof MovieMetadataFormState,
  >(
    key: K,
    value: MovieMetadataFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const isDirty = Object.values(form).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === "number") {
      return value !== 0;
    }

    return value !== "";
  });

  return {
    form,
    setForm,
    updateField,
    resetForm,
    isDirty,
  };
};