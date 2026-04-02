import React from "react";
import { Search, Bell, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo & Links */}
        <div className="flex items-center gap-12">
          <div
            className="text-2xl font-headline font-bold tracking-tighter cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-primary">NOVA</span>FLIX
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => navigate("/")}
              className={`transition-colors ${
                pathname === "/"
                  ? "text-white"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              Home
            </button>
            <button className="text-on-surface-variant hover:text-white transition-colors">
              Series
            </button>
            <button className="text-on-surface-variant hover:text-white transition-colors">
              Movies
            </button>
            <button className="text-on-surface-variant hover:text-white transition-colors">
              New & Popular
            </button>
            <button className="text-on-surface-variant hover:text-white transition-colors">
              My List
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/search")}
            className={`p-2 rounded-full transition-colors ${
              pathname === "/search"
                ? "bg-white/10 text-white"
                : "text-on-surface-variant hover:text-white hover:bg-white/5"
            }`}
          >
            <Search size={20} />
          </button>
          <button className="p-2 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center cursor-pointer">
            <User size={16} className="text-surface" />
          </div>
        </div>
      </div>
    </nav>
  );
};
