import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { youtubeService } from '../services/youtubeService';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [channelName, setChannelName] = useState('Kids Arts & Learn');

  useEffect(() => {
    youtubeService.getChannelName().then(setChannelName).catch(() => {
      setChannelName('Kids Arts & Learn');
    });
  }, []);

  return (
    <header className="rainbow-gradient shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3 text-white hover:opacity-90 transition-opacity">
            <img 
              src="/logo.png" 
              alt={channelName}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg object-cover"
              onError={(e) => {
                // Fallback to SVG logo if PNG doesn't exist
                e.currentTarget.src = '/logo.svg';
              }}
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-3xl font-black tracking-tight drop-shadow-lg">{channelName}</span>
              <span className="text-xs md:text-sm font-semibold opacity-90">Educational Videos for Kids</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all font-bold text-white backdrop-blur-sm shadow-lg"
            >
              🏠 Home
            </Link>
            <Link
              to="/playlists"
              className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all font-bold text-white backdrop-blur-sm shadow-lg"
            >
              📚 Playlists
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors shadow-lg"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className="block px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all font-bold text-white shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link
              to="/playlists"
              className="block px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all font-bold text-white shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              📚 Playlists
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
