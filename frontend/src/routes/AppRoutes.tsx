import { Routes, Route } from "react-router-dom";
import { BrowsePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { PlayerPage } from "../pages/PlayerPage";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { AdminDashboard } from "../pages/admin/Dashboard";
import { AdminMovies } from "../pages/admin/Movies";
import { AdminUsers } from "../pages/admin/Users";
import { AdminAnalytics } from "../pages/admin/Analytics";
import { AdminUpload } from "../pages/admin/Upload";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { MovieDetail } from "../pages/MovieDetail";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<BrowsePage />} />
      {/* <Route
        path="/"
        element={
          <AuthGuard>
            <ProtectedRoute>
              <BrowsePage />
            </ProtectedRoute>
          </AuthGuard>
        }
      /> */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie/watch/:id" element={<PlayerPage />} />
      <Route path="/movie/:id" element={<MovieDetail />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

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
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="upload" element={<AdminUpload />} />
      </Route>
    </Routes>
  );
}
