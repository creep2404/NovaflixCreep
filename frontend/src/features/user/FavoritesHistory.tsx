import React, { useState } from 'react';
import { ScreenType } from '@/src/shared/types';
import { Menu, PlayCircle, MoreVertical } from 'lucide-react';

interface FavoritesHistoryProps {
  onNavigate: (screen: ScreenType) => void;
}

export const FavoritesHistory = ({ onNavigate }: FavoritesHistoryProps) => {
  const [activeTab, setActiveTab] = useState<'list' | 'history'>('list');

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-2xl shadow-black/20 flex flex-col items-start px-8 pt-6 pb-4">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-4">
            <button className="text-primary hover:text-primary/80 transition-colors">
              <Menu size={24} />
            </button>
            <span 
              className="text-xl font-bold tracking-tighter text-primary font-headline cursor-pointer"
              onClick={() => onNavigate('browse')}
            >
              NovaFlix
            </span>
          </div>
          <div 
            className="h-8 w-8 rounded-full bg-surface-variant overflow-hidden ring-1 ring-white/10 cursor-pointer"
            onClick={() => onNavigate('profile')}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop" 
              alt="User avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        <h1 className="text-primary font-headline tracking-tight text-2xl font-bold">Favorites & History</h1>
      </header>

      <main className="pt-32 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Premium Segmented Control (Tabs) */}
        <div className="flex justify-start mb-10 overflow-hidden">
          <div className="bg-surface-container-high/40 backdrop-blur-md p-1.5 flex gap-2 rounded-full ring-1 ring-outline-variant/20">
            <button 
              onClick={() => setActiveTab('list')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'list' 
                  ? 'bg-surface-bright text-primary shadow-lg shadow-black/40' 
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              My List
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'history' 
                  ? 'bg-surface-bright text-primary shadow-lg shadow-black/40' 
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Recently Added Section */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-on-surface-variant font-headline text-xs font-bold uppercase tracking-[0.2em]">Recently Added</h2>
              <div className="h-px flex-1 ml-6 bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
            </div>

            {/* Bento-style Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large Feature Card */}
              <div className="col-span-2 relative group overflow-hidden rounded-xl bg-surface-container aspect-[16/10] cursor-pointer" onClick={() => onNavigate('player')}>
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=3540&auto=format&fit=crop" 
                  alt="Midnight Protocol" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-surface-container-high/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest ring-1 ring-white/20">
                    Premium
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">Sci-Fi • Noir</p>
                  <h3 className="text-2xl font-bold tracking-tight text-white leading-none">Midnight Protocol</h3>
                </div>
              </div>

              {/* Secondary Card 1 */}
              <div className="flex flex-col gap-3 group cursor-pointer" onClick={() => onNavigate('player')}>
                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-surface-container relative">
                  <img 
                    src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop" 
                    alt="Shadow Vale" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary/90 text-on-primary text-[8px] font-black px-2 py-0.5 rounded-sm uppercase">4K</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Shadow Vale</h4>
                  <p className="text-xs text-on-surface-variant/70">Fantasy • Mystery</p>
                </div>
              </div>

              {/* Secondary Card 2 */}
              <div className="flex flex-col gap-3 group pt-8 cursor-pointer" onClick={() => onNavigate('player')}>
                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-surface-container relative">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3540&auto=format&fit=crop" 
                    alt="The Monolith" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">The Monolith</h4>
                  <p className="text-xs text-on-surface-variant/70">Thriller • Drama</p>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-on-surface-variant font-headline text-xs font-bold uppercase tracking-[0.2em]">Jump Back In</h2>
              <div className="h-px flex-1 ml-6 bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
            </div>

            {/* History Items */}
            <div className="flex flex-col gap-6">
              {/* History Card 1 */}
              <div className="flex gap-4 items-center group cursor-pointer" onClick={() => onNavigate('player')}>
                <div className="w-32 aspect-video rounded-lg overflow-hidden bg-surface-container-high relative shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=3540&auto=format&fit=crop" 
                    alt="Echoes of the Past" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle size={32} className="text-white" />
                  </div>
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                    <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-on-surface line-clamp-1">Echoes of the Past</h4>
                  <p className="text-[10px] text-on-surface-variant/60 font-semibold tracking-wide uppercase mt-0.5">S2 : E4 • 15m remaining</p>
                </div>
                <button className="text-on-surface-variant/40 hover:text-primary transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* History Card 2 */}
              <div className="flex gap-4 items-center group cursor-pointer" onClick={() => onNavigate('player')}>
                <div className="w-32 aspect-video rounded-lg overflow-hidden bg-surface-container-high relative shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=3560&auto=format&fit=crop" 
                    alt="Concrete Jungle" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle size={32} className="text-white" />
                  </div>
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                    <div className="h-full bg-primary" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-on-surface line-clamp-1">Concrete Jungle</h4>
                  <p className="text-[10px] text-on-surface-variant/60 font-semibold tracking-wide uppercase mt-0.5">Movie • 1h 42m remaining</p>
                </div>
                <button className="text-on-surface-variant/40 hover:text-primary transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
