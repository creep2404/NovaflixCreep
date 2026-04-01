import { getAllUserRepo } from "../user/user.repository";
import {
  createNotificationRepo,
  getUserNotificationsRepo,
  markAsReadRepo,
} from "./notification.repository";

export const createNotificationService = async (data: {
  userId: string;
  type: string;
  content: string;
}) => {
  return createNotificationRepo(data);
};

export const getNotificationsService = async (userId: string) => {
  return getUserNotificationsRepo(userId);
};

export const markNotificationReadService = async (id: string) => {
  return markAsReadRepo(id);
};

export const notifyNewMovie = async (movie) => {
  const users = await getAllUserRepo();

  await Promise.all(
    users.map((user) =>
      createNotificationService({
        userId: user.id,
        type: "NEW_MOVIE",
        content: `New movie released: ${movie.title}`,
      })
    )
  );
};