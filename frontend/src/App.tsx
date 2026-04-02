import React, { useEffect, useState } from "react";
import { Navbar } from "./components/layouts/Navbar";
import { TopProgressBar } from "./components/ui/TopProgressBar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;

  const [isNavigating, setIsNavigating] = useState(false);

  const hideNavbar =
    pathname.startsWith('/movie') ||
    pathname.startsWith('/admin');

  useEffect(() => {
    setIsNavigating(true);

    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30">
      <TopProgressBar isAnimating={isNavigating} />

      {!hideNavbar && <Navbar />}

      <AppRoutes />
    </div>
  );
}
