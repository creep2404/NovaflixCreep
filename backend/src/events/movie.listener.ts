import { eventBus } from "./eventBus";
import { EVENTS } from "@/common/constants/events.constants";
import { notifyNewMovie } from "@/modules/notification/notification.service";

export const initMovieListener = () => {
  eventBus.on(EVENTS.MOVIE_CREATED, (movie) => {
    notifyNewMovie(movie).catch((err) => {
      console.error("Movie notify failed:", err);
    });
  });
};
