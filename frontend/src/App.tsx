/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType } from './types';
import { Navbar } from './components/layout/Navbar';
import { BrowsePage } from './pages/BrowsePage';
import { SearchPage } from './pages/SearchPage';
import { PlayerPage } from './pages/PlayerPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminMovies } from './pages/admin/Movies';
import { AdminUsers } from './pages/admin/Users';
import { AdminAnalytics } from './pages/admin/Analytics';
import { TopProgressBar } from './components/ui/TopProgressBar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('browse');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigate = (screen: ScreenType, movieId?: string) => {
    setIsNavigating(true);
    
    // Simulate network delay for route transition
    setTimeout(() => {
      setCurrentScreen(screen);
      if (movieId) {
        setSelectedMovieId(movieId);
      }
      window.scrollTo(0, 0);
      setIsNavigating(false);
    }, 400); // 400ms transition
  };

  const isAdminRoute = currentScreen.startsWith('admin-');

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30">
      <TopProgressBar isAnimating={isNavigating} />
      
      {/* Navbar is visible on Browse and Search, hidden on Player and Admin for immersion */}
      {!isAdminRoute && currentScreen !== 'player' && (
        <Navbar currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {isAdminRoute ? (
        <AdminLayout currentScreen={currentScreen} onNavigate={handleNavigate}>
          {currentScreen === 'admin-dashboard' && <AdminDashboard />}
          {currentScreen === 'admin-movies' && <AdminMovies />}
          {currentScreen === 'admin-users' && <AdminUsers />}
          {currentScreen === 'admin-analytics' && <AdminAnalytics />}
        </AdminLayout>
      ) : (
        <main>
          {currentScreen === 'browse' && <BrowsePage onNavigate={handleNavigate} />}
          {currentScreen === 'search' && <SearchPage onNavigate={handleNavigate} />}
          {currentScreen === 'player' && selectedMovieId && (
            <PlayerPage movieId={selectedMovieId} onNavigate={handleNavigate} />
          )}
        </main>
      )}
    </div>
  );
}
