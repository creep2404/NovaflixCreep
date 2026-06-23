import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/src/features/home/HomePage";
import { SearchPage } from "@/src/features/search/SearchPage";
import { PlayerPage } from "@/src/features/video-player/PlayerPage";
import { AdminLayout } from "@/src/shared/components/layouts/AdminLayout";
import { AdminDashboard } from "@/src/features/admin/dashboard/Dashboard";
import { AdminMovies } from "@/src/features/admin/movie/list/Movies";
import { AdminUsers } from "@/src/features/admin/user/Users";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "@/src/features/auth/login/Login";
import { Register } from "@/src/features/auth/register/Register";
import { ForgotPassword } from "@/src/features/auth/forgot-password/ForgotPassword";
import { MovieDetail } from "@/src/features/movie-detail/MovieDetail";
import { ContentList } from "../features/admin/movie/list/ContentList";
import { CreateSeriesPage } from "../features/admin/movie/create/CreateSeries";
import { UpdateHistory } from "../features/admin/movie/onGoing/Mock/UpdateHistory";
import { UserProfile } from "../features/user/UserProfile";
import { FavoritesHistory } from "../features/user/FavoritesHistory";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />

      <Route
        path="/movie/watch/:movieSlug/:episodeInfo"
        element={<PlayerPage />}
      />

      <Route path="/movie/:slug" element={<MovieDetail />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* User */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/favorites"
        element={
          <ProtectedRoute>
            <FavoritesHistory />
          </ProtectedRoute>
        }
      />
      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="movies" element={<AdminMovies />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="create" element={<ContentList />} />
        <Route path="create-series" element={<CreateSeriesPage />} />
        <Route path="update-history" element={<UpdateHistory />} />
      </Route>
    </Routes>
  );
}
