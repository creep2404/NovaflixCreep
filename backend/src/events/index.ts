import { initMovieListener } from "./movie.listener";

export const initEventListeners = () => {
  initMovieListener();
};

// API → createMovieService
//         ↓
//    prisma.create
//         ↓
//    emit "movie.created"
//         ↓
//    movie.listener receives
//         ↓
//    send notification