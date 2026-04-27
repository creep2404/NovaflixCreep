import { NotificationType } from "@/common/enums";
import { getAllUserRepo } from "../user/user.repository";
import { CreateNotificationInput } from "./dto/create.notification.dto";
import {
  createNotificationRepo,
  getUserNotificationsRepo,
  markAsReadRepo,
} from "./notification.repository";

type NotifyNewMoviePayload = {
  title: string;
};

export const createNotificationService = async (
  data: CreateNotificationInput,
) => {
  return createNotificationRepo(data);
};

export const getNotificationsService = async (userId: string) => {
  return getUserNotificationsRepo(userId);
};

export const markNotificationReadService = async (id: string) => {
  return markAsReadRepo(id);
};

export const notifyNewMovie = async (movie: NotifyNewMoviePayload) => {
  const users = await getAllUserRepo();

  await Promise.all(
    users.map((user) =>
      createNotificationService({
        userId: user.id,
        type: NotificationType.NEW_MOVIE,
        content: `New movie released: ${movie.title}`,
      }),
    ),
  );
};
