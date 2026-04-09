import { Search, Bell, HelpCircle } from 'lucide-react';

export function TopNavBar() {
  return (
    /* Top Navigation Bar  (No need)*/
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-surface-dim/50 backdrop-blur-md flex justify-between items-center px-8 border-b border-outline-variant/5">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            className="w-full bg-surface-container-high/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary-fixed/30 placeholder:text-on-surface-variant/50 text-white outline-none"
            placeholder="Search movies, logs, or users..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6 ml-4">
        <button className="text-on-surface-variant hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary-fixed rounded-full border-2 border-surface-dim"></span>
        </button>
        <button className="text-on-surface-variant hover:text-white transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/20">
          <div className="text-right">
            <p className="text-xs font-bold text-white">Alex Rivera</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Editor-in-Chief</p>
          </div>
          <img
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-outline-variant/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZE0bjMbJdLIL4QB-s3pmU8hlYD-iYmq82GYW7gEmGZA-2i2BuEETxNBjN1gyFSs-KSx7EkPlJXiMX8araHQ09hZG8EFy99DIiAKbWzkVgCHxDSrIoSPCEFJ1_XKzO_d0HZBHGPGhweqaqO-X4G9MDyjey6FS0V3veJUSCnu1leEfNw2HZQY33jgGHboy8W1_fI6zy3fh0hfjGQbq19uYOFOWl0DFaWG8-w9sOMhiegi496NCfEyMn-3F6Qz0ApVcRffETa1SlBNI"
          />
        </div>
      </div>
    </header>
  );
}
