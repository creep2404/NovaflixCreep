import { Routes, Route } from "react-router-dom";
import { BrowsePage } from "../pages/BrowsePage";
import { SearchPage } from "../pages/SearchPage";
import { PlayerPage } from "../pages/PlayerPage";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { AdminDashboard } from "../pages/admin/Dashboard";
import { AdminMovies } from "../pages/admin/Movies";
import { AdminUsers } from "../pages/admin/Users";
import { AdminAnalytics } from "../pages/admin/Analytics";

export default function AppRoutes() {
  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<BrowsePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie/:id" element={<PlayerPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="movies" element={<AdminMovies />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>
    </Routes>
  );
}
