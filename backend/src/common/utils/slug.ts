import { v4 as uuid } from "uuid";

export const generateSlug = (title: string) => {
  const slug = title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dash
    .replace(/-+/g, "-"); // multiple dashes → one

  return `${slug}-${uuid().slice(0, 8)}`;
};