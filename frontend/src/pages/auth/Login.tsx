import React from "react";
import { ScreenType } from "../../types";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "@/src/hooks/useLogin";
import { useAuth } from "@/src/hooks/useAuth";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const location = useLocation();
  const from = location.state?.from || "/";
  //const from = "/register";

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 max-w-md mx-auto">
      {/* Cinematic Background Scrim */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img
          className="w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=3270&auto=format&fit=crop"
          alt="Cinematic background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
      </div>

      {/* Main Navigation Shell (TopAppBar) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-surface-container-lowest/80 backdrop-blur-md">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-black tracking-tighter uppercase text-primary font-headline">
            NovaFlix
          </span>
        </div>
      </nav>

      {/* Form Canvas */}
      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Content */}
        <header className="mb-10">
          <h1 className="text-primary font-headline text-[2.75rem] font-extrabold tracking-[-0.02em] leading-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-on-surface-variant font-body text-sm tracking-wide opacity-80">
            Continue your curated cinematic journey.
          </p>
        </header>

        {/* Login Form */}

        <div className="space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="group">
              <label className="block text-[0.75rem] font-label font-bold uppercase tracking-[0.05em] text-on-surface-variant mb-2 ml-1">
                Email Address
              </label>
              <input
                className="w-full bg-surface-container-high border border-outline-variant/15 rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-highest focus:ring-1 focus:ring-primary transition-all duration-300"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[0.75rem] font-label font-bold uppercase tracking-[0.05em] text-on-surface-variant ml-1">
                  Password
                </label>
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-[0.75rem] font-label text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                className="w-full bg-surface-container-high border border-outline-variant/15 rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-highest focus:ring-1 focus:ring-primary transition-all duration-300"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            className="text-gray-900 w-full py-4 bg-primary hover:bg-white font-bold rounded-full tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            onClick={handleLogin}
            disabled={isLoggingIn || !email || !password}
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
            <ArrowRight size={16} />
          </button>
          {/* <button
            onClick={() => navigate("/")}
            className="w-full py-4 bg-primary hover:bg-white text-on-primary font-bold rounded-full tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button> */}

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow h-px bg-surface-container-highest"></div>
            <span className="flex-shrink mx-4 text-[0.65rem] font-label text-on-surface-variant uppercase tracking-[0.2em]">
              or continue with
            </span>
            <div className="flex-grow h-px bg-surface-container-highest"></div>
          </div>

          {/* Social Logins */}
          <div className="flex justify-center gap-6">
            {/* Google */}
            <button className="w-14 h-14 rounded-full flex items-center justify-center border border-outline-variant/15 bg-surface-container-high/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:bg-surface-container-highest active:scale-90 group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
            </button>
            {/* Apple */}
            <button className="w-14 h-14 rounded-full flex items-center justify-center border border-outline-variant/15 bg-surface-container-high/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:bg-surface-container-highest active:scale-90 group">
              <svg
                className="w-5 h-5 text-on-surface"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.05 20.28c-.98.95-2.05 1.78-3.19 1.76-1.11-.02-1.47-.69-2.74-.69-1.28 0-1.68.67-2.74.71-1.12.04-2.24-.87-3.23-1.82-2.01-1.93-3.07-5.46-3.07-8.15 0-4.32 2.68-6.59 5.23-6.59 1.34 0 2.61.92 3.43.92.81 0 2.37-1.1 3.95-1.1 1.66 0 3.1.6 4.09 1.5-3.32 1.94-2.79 6.25.5 7.57-1.1 2.5-2.52 4.91-4.48 6.94zm-2.3-15.68c.73-.89 1.22-2.12 1.08-3.36-1.06.04-2.35.71-3.11 1.59-.68.78-1.28 2.05-1.12 3.25 1.19.09 2.42-.6 3.15-1.48z"></path>
              </svg>
            </button>
            {/* Facebook */}
            <button className="w-14 h-14 rounded-full flex items-center justify-center border border-outline-variant/15 bg-surface-container-high/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:bg-surface-container-highest active:scale-90 group">
              <svg
                className="w-5 h-5 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-on-surface-variant font-body text-sm">
            Don't have an account?
            <button
              onClick={() => navigate("/register")}
              className="text-primary font-bold hover:underline underline-offset-4 ml-1"
            >
              Sign Up
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};
