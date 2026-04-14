import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [fullName, setFullName] = useState("");

  const { register, isRegistering } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await register({ email, password });

      // auto redirect
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col pt-20 pb-10 px-6">
      {/* Cinematic Background Image with Gradient */}
      <div className="fixed inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=3425&auto=format&fit=crop"
          alt="Cinematic background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 to-surface/95"></div>
      </div>

      {/* Registration Content Canvas */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Editorial Hook */}
        <div className="mt-8 mb-10 space-y-2 bg-black/40 p-4 rounded-xl">
          <h1 className="text-[3.5rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-on-surface font-headline">
            Create <br /> Your Account
          </h1>

          <p className="text-on-surface-variant font-body text-sm max-w-[280px] ">
            Join our platform to explore thousands of movies, save favorites,
            and get personalized recommendations.
          </p>
        </div>

        {/* Registration Form */}
        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-6">
            {/* Cinematic Reveal Inputs */}
            {/* <div className="group relative">
              <label className="block text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface-variant mb-2">
                Full Name
              </label>
              <input
                className="w-full bg-transparent border-b border-outline-variant py-3 px-0 focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline text-on-surface font-body"
                placeholder="Julian Vane"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div> */}
            <div className="group relative">
              <label className="block text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface-variant mb-2">
                Email Address
              </label>
              <input
                className="px-3 pr-10 w-full bg-transparent border-b border-outline-variant py-3 px-0 focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline text-on-surface font-body"
                placeholder="julian@cinema.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="group relative">
              <label className="block text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface-variant mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  className="px-3 pr-10 w-full bg-transparent border-b border-outline-variant py-3 px-0 focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline text-on-surface font-body"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Eye button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="group relative">
              <label className="block text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface-variant mb-2">
                Confirm Password
              </label>
              <input
                className="px-3 pr-10 w-full bg-transparent border-b border-outline-variant py-3 px-0 focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline text-on-surface font-body"
                placeholder="••••••••"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Primary Action */}
          <button
            onClick={handleRegister}
            disabled={isRegistering}
            className="text-gray-900 w-full py-4 bg-primary hover:bg-white font-bold rounded-full tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            type="button"
          >
            <span className="relative z-10">
              {isRegistering ? "Signing up..." : "Sign Up"}
            </span>
          </button>
        </form>

        {/* Social Login Section */}
        <div className="mt-16 text-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-on-surface-variant">
              Or register with
            </span>
            <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
          </div>
          <div className="flex justify-center gap-6">
            {/* Google */}
            <button className="w-14 h-14 rounded-full flex items-center justify-center border border-outline-variant/15 bg-surface-container-high/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:bg-surface-container-highest active:scale-90 group">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                className="w-6 h-6 text-on-surface"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.05 20.28c-.98.95-2.05 1.78-3.19 1.76-1.11-.02-1.47-.69-2.74-.69-1.28 0-1.68.67-2.74.71-1.12.04-2.24-.87-3.23-1.82-2.01-1.93-3.07-5.46-3.07-8.15 0-4.32 2.68-6.59 5.23-6.59 1.34 0 2.61.92 3.43.92.81 0 2.37-1.1 3.95-1.1 1.66 0 3.1.6 4.09 1.5-3.32 1.94-2.79 6.25.5 7.57-1.1 2.5-2.52 4.91-4.48 6.94zm-2.3-15.68c.73-.89 1.22-2.12 1.08-3.36-1.06.04-2.35.71-3.11 1.59-.68.78-1.28 2.05-1.12 3.25 1.19.09 2.42-.6 3.15-1.48z"></path>
              </svg>
            </button>
            {/* Facebook */}
            <button className="w-14 h-14 rounded-full flex items-center justify-center border border-outline-variant/15 bg-surface-container-high/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:bg-surface-container-highest active:scale-90 group">
              <svg
                className="w-6 h-6 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto pt-7 text-center">
          <p className="text-on-surface-variant font-body text-sm">
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-bold ml-1 hover:underline underline-offset-4 transition-all"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
