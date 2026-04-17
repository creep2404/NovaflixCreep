import { MoreVertical } from 'lucide-react';
import { Movie } from '@/src/shared/types';

const recentMovies: Movie[] = [
  {
    id: '1',
    title: 'The Neon Silence',
    quality: '4K UHD',
    size: '2.4 GB',
    genres: ['Cyberpunk', 'Mystery'],
    uploadDate: 'Oct 24, 2024',
    status: 'Live',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkGH6HIY787S4KIZwbjpR4m9JjiqaOpEHlTUMQsc2v_z03col-mWPlQ2_QBympgLdPHAzzMmIQz4CC073iqnS_zgVBrCSPlT68WxKP4z9CUYGnsjrlwbvdMEgMFFacp_DwpyFpOwJaCCEAaA531guPW5bl8t6K3jAb0rDOiXKcV1Ig7rVp-fI-2MhaWzy_aaABYiaVgRDbXXJGNoTLYf3O8QWgMTZDOQXbZkraQNDj3i2QU3_tBN6II0JS0pNiPGJ-T3pdHKza8OM'
  },
  {
    id: '2',
    title: 'Stellar Drift',
    quality: '8K Master',
    size: '12.8 GB',
    genres: ['Documentary', 'Space'],
    uploadDate: 'Oct 22, 2024',
    status: 'Encoding',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFkERkQKkDM3y-511Hk6mHj8n1oSMigtXDBuhd9_Js9IAkOluX7-ofc7mSJJwFiQigrbtcF7xWJ6weyLe3X3PtFZ5tUh6CQT4pCRqsvFYBW3pOyk2ts17Uub4BnAgdjqJRWD0sXTce-bJ-45-y4exRsHbGHsEqEymAschexfPrzynNG5R5v-UZB-_xlMvqF3QJShy8O2vTsqTD17sz8BVTa1ve6xTuTyZXsmVBlHFIAOnVjC3rjccd2Jl7pcnSceAH-AvMhfcltZE'
  },
  {
    id: '3',
    title: 'Old Soul Paradox',
    quality: 'HD',
    size: '1.1 GB',
    genres: ['Classic', 'Drama'],
    uploadDate: 'Oct 20, 2024',
    status: 'Draft',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr_DNjAUj-wjkOh-nDHq0kBgxDo3foC5mujx6Op-wIVox_FDZZBZUSm5QFK8pcv1IpCtea9y30AVEgbirvWaTtkdjyeki0ALwFDKZ84_WRBQfsDKveuK-M6RCcJcqaZH2JSgATIV8KHlPHwvYWtvjWy5IT33-kRiz1MEbU7-W8drq9GCx4P1LIj6MTDpepbIXhE7IoSQYv5x00ICfKvMe_vKFi-hAtwPqZq5K0D5-tLjkuveXWaGZD2lzuRbdJrVPwJ2jvhBq1yZk'
  }
];

export function RecentUploads() {
  return (
    <section className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-poppins font-bold text-white">Recent Uploads</h3>
        <button className="text-primary-fixed text-sm font-bold hover:underline">View All Catalog</button>
      </div>
      <div className="overflow-hidden rounded-3xl bg-surface-container-low border border-outline-variant/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high/50">
              <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Movie Title</th>
              <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Genre</th>
              <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Upload Date</th>
              <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {recentMovies.map((movie) => (
              <tr key={movie.id} className="hover:bg-surface-bright/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      alt={movie.title} 
                      className="w-12 h-16 rounded-lg object-cover shadow-lg" 
                      src={movie.thumbnailUrl} 
                    />
                    <div>
                      <p className="text-sm font-bold text-white">{movie.title}</p>
                      <p className="text-[10px] text-on-surface-variant">{movie.quality} • {movie.size}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-on-surface-variant">{movie.genres.join(', ')}</span>
                </td>
                <td className="px-6 py-4 text-xs text-on-surface-variant">{movie.uploadDate}</td>
                <td className="px-6 py-4">
                  {movie.status === 'Live' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Live
                    </span>
                  )}
                  {movie.status === 'Encoding' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></span> Encoding
                    </span>
                  )}
                  {movie.status === 'Draft' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-surface-variant/10 text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-on-surface-variant"></span> Draft
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-on-surface-variant hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
