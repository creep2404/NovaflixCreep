import { LayoutDashboard, Film, Users, LineChart, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/15 bg-[#141d23]/80 backdrop-blur-xl shadow-2xl shadow-black/50 z-50 flex flex-col py-8 px-4 font-headline font-medium text-sm tracking-tight">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black tracking-tighter text-white font-poppins">NovaFlix</h1>
        <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] mt-1">Admin Console</p>
      </div>
      <nav className="flex-1 space-y-1">
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-bright transition-all duration-300 group" href="#">
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg border-l-2 border-primary-fixed text-white font-semibold bg-surface-container-high/40 transition-all duration-300 group" href="#">
          <Film className="w-5 h-5 fill-current" />
          <span>Movies</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-bright transition-all duration-300 group" href="#">
          <Users className="w-5 h-5" />
          <span>Users</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-bright transition-all duration-300 group" href="#">
          <LineChart className="w-5 h-5" />
          <span>Analytics</span>
        </a>
      </nav>
      <div className="mt-auto space-y-1 border-t border-outline-variant/10 pt-6">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-bright transition-all duration-300">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-error transition-all duration-300">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
