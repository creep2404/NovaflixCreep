import React from 'react';
import { ScreenType } from '../../types';
import { ArrowLeft } from 'lucide-react';

interface ForgotPasswordProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ForgotPassword = ({ onNavigate }: ForgotPasswordProps) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center px-8 pt-16 pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full bg-surface flex items-center px-6 h-16 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('login')} className="active:scale-95 transition-transform text-primary">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-headline uppercase tracking-widest text-sm text-primary">NovaFlix</h1>
        </div>
      </header>

      {/* Asymmetric Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -mr-32 -mt-32"></div>
      
      <div className="max-w-md w-full mx-auto space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Heading Section */}
        <section className="space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">
            Recover Password
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-[280px]">
            Enter your email to receive recovery instructions.
          </p>
        </section>

        {/* Form Section */}
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <div className="relative group">
              <input 
                className="w-full bg-surface-container-lowest border-none py-5 px-6 rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 transition-all duration-300 outline-none font-body" 
                placeholder="Email address" 
                type="email"
              />
              {/* Ghost Border Fallback */}
              <div className="absolute inset-0 border border-outline-variant/15 rounded-lg pointer-events-none group-hover:border-outline-variant/30 transition-colors"></div>
            </div>
          </div>

          <div className="pt-4 space-y-6">
            {/* Primary CTA */}
            <button 
              onClick={() => onNavigate('login')}
              className="w-full py-5 rounded-lg font-bold tracking-wide uppercase text-sm text-on-primary transition-all active:scale-[0.98] bg-gradient-to-r from-primary to-primary/80 shadow-2xl shadow-primary/10"
            >
              Send Recovery Email
            </button>

            {/* Back to Sign In Link */}
            <div className="flex justify-center">
              <button 
                onClick={() => onNavigate('login')}
                className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold tracking-wide flex items-center gap-2 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </button>
            </div>
          </div>
        </form>

        {/* Curator Visual Detail */}
        <div className="flex items-center gap-4 pt-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent"></div>
        </div>
      </div>

      {/* Decorative Texture */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=3000&auto=format&fit=crop')" }}></div>
    </div>
  );
};
