import { useState } from 'react';
import { Star, ThumbsUp, Trash2 } from 'lucide-react';
import { Review } from '@/src/shared/types';

interface UserReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'likes' | 'isLiked' | 'initials' | 'time'>) => void;
  onLikeReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
  totalCount: number;
}

export default function UserReviews({ reviews, onAddReview, onLikeReview, onDeleteReview, totalCount }: UserReviewsProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    
    onAddReview({
      name,
      rating,
      text
    });
    
    setName('');
    setRating(5);
    setText('');
  };

  return (
    <section className="px-8 md:px-16 editorial-gap max-w-5xl">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-headline text-3xl font-bold tracking-tight">
          User Reviews <span className="text-primary-fixed/40 ml-2">{totalCount}</span>
        </h2>
      </div>

      <div className="bg-surface-container-low p-8 rounded-3xl mb-12 shadow-xl border border-white/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-high border-none rounded-xl p-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary-fixed/50 transition-all outline-none" 
                placeholder="Enter your name" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Rating</label>
              <select 
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-surface-container-high border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-primary-fixed/50 transition-all outline-none appearance-none"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Review</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-surface-container-high border-none rounded-2xl p-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary-fixed/50 transition-all outline-none resize-y" 
              placeholder="What did you think of the memories?" 
              required 
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-primary-fixed text-on-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all">
              Post Review
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <article key={review.id} className="bg-surface-container/30 backdrop-blur-md p-8 rounded-3xl border border-white/5 group animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center text-primary-fixed font-bold text-xl">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider">{review.time}</p>
                </div>
              </div>
              <div className="flex text-primary-fixed">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? "fill-current" : "text-white/20"} />
                ))}
              </div>
            </div>
            <p className="text-on-surface leading-relaxed mb-6">
              {review.text}
            </p>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onLikeReview(review.id)}
                className={`flex items-center gap-2 text-sm transition-colors ${review.isLiked ? 'text-primary-fixed' : 'text-on-surface-variant hover:text-primary-fixed'}`}
              >
                <ThumbsUp size={18} className={review.isLiked ? "fill-current" : ""} />
                <span>{review.likes}</span>
              </button>
              <button 
                onClick={() => onDeleteReview(review.id)}
                className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-sm text-error/60 hover:text-error transition-all"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
