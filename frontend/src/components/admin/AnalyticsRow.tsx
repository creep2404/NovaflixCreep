import { Clapperboard, Users, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';

export function AnalyticsRow() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 group hover:border-primary-fixed/20 transition-all duration-500">
        <div className="flex justify-between items-start mb-4">
          <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest">Total Movies</span>
          <Clapperboard className="w-5 h-5 text-primary-fixed-dim" />
        </div>
        <p className="text-3xl font-poppins font-bold text-white">1,284</p>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+12.5% THIS MONTH</span>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 group hover:border-primary-fixed/20 transition-all duration-500">
        <div className="flex justify-between items-start mb-4">
          <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest">Active Users</span>
          <Users className="w-5 h-5 text-primary-fixed-dim" />
        </div>
        <p className="text-3xl font-poppins font-bold text-white">42.8K</p>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+3.2% INCREASE</span>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 group hover:border-primary-fixed/20 transition-all duration-500">
        <div className="flex justify-between items-start mb-4">
          <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest">Server Load</span>
          <Cpu className="w-5 h-5 text-primary-fixed-dim" />
        </div>
        <p className="text-3xl font-poppins font-bold text-white">24%</p>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-on-surface-variant font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>OPTIMAL STATUS</span>
        </div>
      </div>
    </section>
  );
}
