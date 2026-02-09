import { useState, useEffect } from 'react';
import { youtubeService } from '../services/youtubeService';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [channelName, setChannelName] = useState('Kids Arts & Learn');

  useEffect(() => {
    youtubeService.getChannelName().then(setChannelName).catch(() => {
      setChannelName('Kids Arts & Learn');
    });
  }, []);

  return (
    <footer className="rainbow-gradient text-white mt-auto shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <img 
                src="/logo.png" 
                alt={channelName}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-lg mr-3 object-cover"
                onError={(e) => {
                  // Fallback to SVG logo if PNG doesn't exist
                  e.currentTarget.src = '/logo.svg';
                }}
              />
              <span className="font-black text-xl md:text-2xl drop-shadow-lg">{channelName}</span>
            </div>
            <p className="text-sm text-white/90 font-semibold">
              © {currentYear} All rights reserved.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-bold mb-1 drop-shadow-lg">
              ⚡ Powered by YouTube Data API
            </p>
            <p className="text-xs text-white/80 font-semibold">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
