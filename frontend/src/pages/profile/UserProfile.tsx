import React from 'react';
import { ScreenType } from '../../common/types';
import { ArrowLeft, Settings, Star, Lock, CreditCard, Sliders, HelpCircle, LogOut } from 'lucide-react';

interface UserProfileProps {
  onNavigate: (screen: ScreenType) => void;
}

export const UserProfile = ({ onNavigate }: UserProfileProps) => {
  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface antialiased pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/60 backdrop-blur-xl flex justify-between items-center px-6 h-16 shadow-[0_32px_64px_rgba(6,15,22,0.04)]">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('browse')} className="text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold tracking-tighter text-primary">Profile</h1>
        </div>
        <button className="text-primary hover:text-primary/80 transition-colors">
          <Settings size={24} />
        </button>
      </header>

      <main className="pt-24 px-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Profile Header Section */}
        <section className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary-container/20 to-primary/40">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop" 
                alt="Alex Rivers" 
                className="w-full h-full rounded-full object-cover border-4 border-surface" 
              />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary mb-1">Alex Rivers</h2>
          <p className="text-on-surface-variant font-medium text-sm">alex.rivers@novaflix.com</p>
        </section>

        {/* Active Plan Badge */}
        <section className="w-full max-w-md mb-12">
          <div className="bg-surface-container-low/40 backdrop-blur-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/5 rounded-3xl p-6 flex items-center justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Active Plan</p>
              <h3 className="text-xl font-bold text-primary">Premium 4K</h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full text-xs font-black uppercase tracking-tight">
              <Star size={14} className="fill-current" />
              Ultra HD
            </div>
          </div>
        </section>

        {/* Settings List */}
        <section className="w-full max-w-md space-y-4">
          <SettingItem icon={Lock} label="Account Security" />
          <SettingItem icon={CreditCard} label="Payment Methods" />
          <SettingItem icon={Sliders} label="App Settings" />
          <SettingItem icon={HelpCircle} label="Help & Support" />
        </section>

        {/* Sign Out Button */}
        <footer className="w-full max-w-md mt-16 mb-24 px-6">
          <button 
            onClick={() => onNavigate('login')}
            className="w-full py-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all duration-300"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </footer>
      </main>
    </div>
  );
};

const SettingItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center justify-between p-5 bg-surface-container-low/40 backdrop-blur-xl rounded-2xl group hover:bg-surface-container-high transition-all duration-300 cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-high text-primary">
        <Icon size={20} />
      </div>
      <span className="font-semibold text-primary">{label}</span>
    </div>
    <ArrowLeft size={20} className="text-on-surface-variant rotate-180" />
  </div>
);
