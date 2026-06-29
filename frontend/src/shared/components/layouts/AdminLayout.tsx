import React from "react";
import { LayoutDashboard, Film, Users, BarChart3 } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { path: "", icon: LayoutDashboard, label: "Dashboard" },
    { path: "movies", icon: Film, label: "Movies" },
    { path: "users", icon: Users, label: "Users" },
    { path: "analytics", icon: BarChart3, label: "Analytics" },
    { path: "upload", icon: BarChart3, label: "Upload" },
    { path: "create-series", icon: BarChart3, label: "Create Series" },
    { path: "update-history", icon: BarChart3, label: "Update History" },
    { path: "create", icon: BarChart3, label: "Create Content" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface py-8 z-50 border-r border-white/5">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-black tracking-tighter text-white font-poppins">
            NovaFlix
          </h1>
          <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] mt-1">
            Admin Console
          </p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === `/admin/${item.path}`;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(`/admin/${item.path}`)}
                className={`flex items-center gap-4 py-3 px-6 transition-all duration-300 font-headline font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-primary-container text-on-primary-container rounded-r-full border-l-2 border-primary-container"
                    : "text-on-surface-variant hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 w-full lg:ml-64 flex flex-col relative min-h-screen">
        <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5">
          <h1 className="text-2xl font-bold text-white">
            {pathname.split("/").pop() || "dashboard"}
          </h1>
        </header>

        <div className="flex-1 p-6 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
