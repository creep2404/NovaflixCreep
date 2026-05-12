import React from 'react';
import { ArrowLeft, Film, ArrowRight, History, Bot } from 'lucide-react';
import { ViewState } from '../types';

interface UpdateHistoryProps {
  onViewChange: (view: ViewState) => void;
}

export const UpdateHistory: React.FC<UpdateHistoryProps> = ({ onViewChange }) => {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <section className="mb-16">
        <button 
          onClick={() => onViewChange('list')}
          className="flex items-center gap-2 text-primary hover:text-primary-fixed transition-colors mb-6 group"
        >
          <ArrowLeft className="transition-transform group-hover:-translate-x-1" size={16} />
          <span className="uppercase tracking-widest text-[12px] font-bold">Back to Content</span>
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface leading-tight">
              Lịch sử Cập nhật
            </h1>
            <p className="text-secondary mt-2 flex items-center gap-2">
              <Film size={16} />
              <span className="font-medium tracking-wide">Target: Oppenheimer (2023)</span>
            </p>
          </div>
          <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-xl border border-outline-variant/10">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkgs9KogXrzDXHRRdIN9cRpfDPr6nFZLS1xbsFUJECIuUn3wm4rCgKOolDvLDVc92LMyf1qcH00-OUORUtzUMvwnlJCHENe0YMXZwqAda29fwkkjhrrRDBOv7PK_lGxKR2VNMqXwYZKpKmg9WNv6OAweULsIZe9nj3ErELmle4N1zvBNMa5fMLTQIP4UAVSQpA1uprra1eEFn3JHP4CL2yoIOHFYEILhEjQtS2lfaI5yrgnl8GL-WTprP3ffEkLCW-od8xQ7a3UlM" 
              alt="Oppenheimer Poster" 
              className="w-12 h-16 object-cover rounded shadow-lg"
            />
            <div className="pr-4">
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Master Version</p>
              <p className="text-sm font-semibold text-on-surface">V2.4.0 Final</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="absolute left-[20px] md:left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-surface-variant/20 to-transparent"></div>
        
        <div className="flex flex-col gap-12">
          {/* Event 1 */}
          <div className="relative pl-12 md:pl-20">
            <div className="absolute left-[13px] md:left-[21px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 ring-offset-4 ring-offset-surface-container-lowest z-10"></div>
            <div className="bg-surface-container/40 backdrop-blur-xl p-6 rounded-xl border border-outline-variant/10 shadow-xl transition-all duration-300 hover:bg-surface-container/60 hover:translate-x-1 group">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuQDK3D1-fftuGVxFlWeH-tgSDm4-zk27kcFShXxyMf5AD6SPVr1J5_f61UYZvWjhOWIO5HCqeFyZxh3_fkpORrvYPkXY1vYm9jHOyoEQyRNR6eVyyAsYNDgUM783WTKdeBdvmhA1lGRVAZA8m0Ur_aGkNHPGk0PH1TVoxG99AIJulFmQ3tFBn7Q1rCXkfQsSa_7w6poipWY4p24DO5Y3oYlvbIYXi1LLZyKGjTtVOWGdFHOMBxX0gBUeqo7uNeiP1c5CbeFFjrtU" alt="Alex Rivera" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-on-surface font-bold text-sm leading-none">Alex Rivera</h4>
                    <p className="text-on-surface-variant text-[11px] font-medium mt-1">Content Director</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">Updated</span>
                  <span className="text-primary font-bold text-xs">14:30 - 24 Oct 2024</span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-on-surface/90 leading-relaxed text-sm">Modified core metadata for theatrical release parity. Adjusted global licensing window.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="bg-surface-container-low/50 p-3 rounded-lg border-l-2 border-primary/40">
                    <p className="text-[9px] uppercase tracking-tighter text-on-surface-variant mb-1">Release Year</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs line-through text-on-surface-variant/50">2023</span>
                      <ArrowRight className="text-primary" size={12} />
                      <span className="text-xs font-bold text-primary">2024</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low/50 p-3 rounded-lg border-l-2 border-primary/40">
                    <p className="text-[9px] uppercase tracking-tighter text-on-surface-variant mb-1">Regional Lock</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs line-through text-on-surface-variant/50">SEA Only</span>
                      <ArrowRight className="text-primary" size={12} />
                      <span className="text-xs font-bold text-primary">Global</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="relative pl-12 md:pl-20">
            <div className="absolute left-[13px] md:left-[21px] top-1 w-4 h-4 rounded-full bg-surface-variant ring-4 ring-surface-variant/20 ring-offset-4 ring-offset-surface-container-lowest z-10"></div>
            <div className="bg-surface-container/40 backdrop-blur-xl p-6 rounded-xl border border-outline-variant/10 shadow-xl transition-all duration-300 hover:bg-surface-container/60 hover:translate-x-1 group">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsFs78tf5i14mH61aBpZb575AbdVCRs9eocPbvljZSCIFC_SZ7xGvo1DWuK5ee3WP_t5GRTxXruB6jeM4Kiy0Krj5iHXY5ihcm2yLEYmRF_b1rwxuWem1Ug6EZsKitY-vsakDEoOLQFtl-Bo5nkLshhgp8UFm8b6HzfSoxuuHcF5F4SNNs7d3Py6wklj3SyCUKsxV7dXHpnCiqOuMoK1HuvMUNmb9DJibQAN9OqNsTCZRLSfPI1jnv042a7Uv56YwHWNI-vo6T3AM" alt="Sarah Chen" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-on-surface font-bold text-sm leading-none">Sarah Chen</h4>
                    <p className="text-on-surface-variant text-[11px] font-medium mt-1">Lead Editor</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">Uploaded</span>
                  <span className="text-primary font-bold text-xs">10:15 - 22 Oct 2024</span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-on-surface/90 leading-relaxed text-sm">Injected high-definition localized subtitles and bonus content segments.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] text-on-surface font-medium">vn_sub_v2.srt</span>
                  <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] text-on-surface font-medium">en_sub_v1.srt</span>
                  <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] text-on-surface font-medium">+2 Featurettes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event 3 */}
          <div className="relative pl-12 md:pl-20">
            <div className="absolute left-[13px] md:left-[21px] top-1 w-4 h-4 rounded-full bg-surface-variant ring-4 ring-surface-variant/20 ring-offset-4 ring-offset-surface-container-lowest z-10"></div>
            <div className="bg-surface-container/40 backdrop-blur-xl p-6 rounded-xl border border-outline-variant/10 shadow-xl transition-all duration-300 hover:bg-surface-container/60 hover:translate-x-1 group">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqs2vxH9glG71gvdvFEd3lMTnEttCnXvumV8nivoUk6HeWVMzBPDVqSWNcaXR1uwc3RWIxSY1l1G8NROoHYrBPw4W0F4BNY8dqI6HVqgmJP5sZAMerll1Pb5ruKi8Ua88bCLbf0SufhNMI61psguVR2fk3qq5BWJ46gUojsCnmpC3FIx7K_rwOmxGfL82ejuTmnZ-Sp0iEzoqvNTy0aDA1KXiBFiSCX2O7DXAAeuDuY18z5rIfA587JvpY5KqSXRc5CodkZKQ4cmY" alt="Marcus Thorne" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-on-surface font-bold text-sm leading-none">Marcus Thorne</h4>
                    <p className="text-on-surface-variant text-[11px] font-medium mt-1">Quality Assurance</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-tertiary-container/20 text-tertiary text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">Created</span>
                  <span className="text-primary font-bold text-xs">16:45 - 20 Oct 2024</span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-on-surface/90 leading-relaxed text-sm">Initial content entry for "Oppenheimer" master file. Assigned to 4K Dolby Vision pipeline.</p>
                <div className="bg-surface-container-low/30 p-4 rounded-lg italic text-on-surface-variant text-xs">
                  "System note: High priority upload for theatrical window release. Requires HDR10+ certification."
                </div>
              </div>
            </div>
          </div>

          {/* Event 4 */}
          <div className="relative pl-12 md:pl-20">
            <div className="absolute left-[13px] md:left-[21px] top-1 w-4 h-4 rounded-full bg-error ring-4 ring-error/20 ring-offset-4 ring-offset-surface-container-lowest z-10"></div>
            <div className="bg-surface-container/40 backdrop-blur-xl p-6 rounded-xl border border-outline-variant/10 shadow-xl transition-all duration-300 hover:bg-surface-container/60 hover:translate-x-1 group">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/20">
                    <Bot className="text-on-surface-variant" size={20} />
                  </div>
                  <div>
                    <h4 className="text-on-surface font-bold text-sm leading-none">Auto-Cleanup Bot</h4>
                    <p className="text-on-surface-variant text-[11px] font-medium mt-1">System Process</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-error-container/20 text-error text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">Deleted</span>
                  <span className="text-primary font-bold text-xs">03:00 - 18 Oct 2024</span>
                </div>
              </div>
              <p className="text-on-surface/90 leading-relaxed text-sm">Purged temporary proxy files and old draft metadata (V1.2 Beta) to optimize storage capacity.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold uppercase tracking-widest rounded-full transition-all border border-outline-variant/10 flex items-center gap-2">
            <History size={16} />
            Load Older Activities
          </button>
        </div>
      </section>
    </div>
  );
};
