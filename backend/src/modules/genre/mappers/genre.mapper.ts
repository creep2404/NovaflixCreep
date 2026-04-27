type Genre = {
  id: string;
  name: string;
};

export const formatGenre = (genre: Genre) => ({
  id: genre.id,
  name: genre.name,
});
