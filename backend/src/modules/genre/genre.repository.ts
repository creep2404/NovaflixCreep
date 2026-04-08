import { prisma } from "@/database/client";

export const getGenresRepo = async ({
  skip,
  take,
  search,
}: {
  skip?: number;
  take?: number;
  search?: string;
}) => {
  return prisma.genre.findMany({
    skip,
    take,

    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },

    orderBy: {
      name: "asc", 
    },
  });
};