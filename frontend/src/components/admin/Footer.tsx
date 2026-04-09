export function Footer() {
  return (
    <footer className="w-full py-8 mt-auto bg-surface border-t border-outline-variant/10">
      <div className="flex justify-between items-center px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <p className="text-primary-fixed font-bold text-sm">NovaFlix</p>
          <span className="text-outline-variant/30">|</span>
          <p className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest">© 2024 NovaFlix Editorial. All Rights Reserved.</p>
        </div>
        <div className="flex gap-8">
          <a className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest hover:text-primary-fixed transition-opacity" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest hover:text-primary-fixed transition-opacity" href="#">Terms of Service</a>
          <a className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest hover:text-primary-fixed transition-opacity flex items-center gap-1" href="#">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> API Status
          </a>
        </div>
      </div>
    </footer>
  );
}
