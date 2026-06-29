import React from "react";
import { ScreenType } from "@/src/shared/types";
import {
  ArrowLeft,
  Settings,
  Star,
  Lock,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

interface UserProfileProps {}
const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=random&size=128";
export const UserProfile = () => {
  const navigate = useNavigate();
  const { profile, isLoadingProfile, logout } = useAuth();
  const user = profile?.user;

  if (isLoadingProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface antialiased pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-xl font-headline font-bold tracking-tighter">
              <span className="text-primary">Profile</span>
            </h1>
          </div>

          <button className="p-2 rounded-full text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="pt-32 max-w-[1600px] mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Profile Header */}
        <section className="flex items-center gap-8 mb-16">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-high border border-white/10 shrink-0">
            <img
              src={user?.avatarUrl ?? DEFAULT_AVATAR}
              alt={user?.name ?? "User"}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {user?.name || "Anonymous User"}
            </h1>

            <p className="text-on-surface-variant text-lg">{user?.email}</p>

            <div className="flex items-center gap-3 mt-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {user?.role}
              </span>

              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                {user?.status}
              </span>
            </div>
          </div>
        </section>

        {/* Account Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Account</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <SettingItem icon={Lock} label="Account Security" />
            <SettingItem icon={Star} label="Favorites" onClick={() => navigate("/profile/favorites")}/>
            <SettingItem icon={CreditCard} label="Subscription" />
            <SettingItem icon={HelpCircle} label="Help & Support" />
          </div>
        </section>

        {/* Sign Out */}
        <section className="border-t border-white/5 pt-8">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors font-medium"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </section>
      </main>
    </div>
  );
};

interface SettingItemProps {
  icon: any;
  label: string;
  onClick?: () => void;
}

const SettingItem = ({ icon: Icon, label, onClick }: SettingItemProps) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between p-5 bg-surface-container-low/40 backdrop-blur-xl rounded-2xl group hover:bg-surface-container-high transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-high text-primary">
        <Icon size={20} />
      </div>
      <span className="font-semibold text-primary">{label}</span>
    </div>
    <ArrowLeft size={20} className="text-on-surface-variant rotate-180" />
  </div>
);
