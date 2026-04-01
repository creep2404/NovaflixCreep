import React from 'react';
import { LayoutDashboard, Film, Users, BarChart3, Menu, Settings } from 'lucide-react';
import { ScreenType } from '../../types';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'admin-movies', icon: Film, label: 'Movies' },
    { id: 'admin-users', icon: Users, label: 'Users' },
    { id: 'admin-analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface py-8 z-50 border-r border-white/5">
        <div className="px-6 mb-12 cursor-pointer" onClick={() => onNavigate('browse')}>
          <span className="text-2xl font-bold tracking-tighter text-primary-container">NovaFlix <span className="text-white text-sm font-normal">Admin</span></span>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map(item => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ScreenType)}
                className={`flex items-center gap-4 py-3 px-6 transition-all duration-300 font-headline font-medium text-sm tracking-wide ${
                  isActive 
                    ? 'bg-primary-container text-on-primary-container rounded-r-full border-l-2 border-primary-container' 
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-6 pt-6 border-t border-outline-variant/10">
          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
            <img 
              src="https://i.pravatar.cc/150?u=admin" 
              alt="Admin" 
              className="w-8 h-8 rounded-full"
            />
            <div className="overflow-hidden text-left">
              <p className="text-xs font-bold truncate text-white">Admin Central</p>
              <p className="text-[10px] text-on-surface-variant truncate">admin@novaflix.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full lg:ml-64 flex flex-col relative min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2 text-primary-container hover:opacity-80 transition-opacity">
              <Menu size={24} />
            </button>
            <h1 className="font-headline text-2xl font-bold tracking-tight text-white capitalize">
              {currentScreen.replace('admin-', '')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-white transition-colors rounded-full hover:bg-white/5">
              <Settings size={20} />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 cursor-pointer">
              <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-12">
          {children}
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full glass-panel z-50 px-6 py-3 flex justify-between items-center rounded-t-xl border-t-0">
        {navItems.map(item => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          return (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id as ScreenType)}
              className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary-container' : 'text-on-surface-variant opacity-60'}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
