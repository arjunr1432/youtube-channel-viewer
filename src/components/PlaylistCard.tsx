import { useNavigate } from 'react-router-dom';
import type { Playlist } from '../types/youtube';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer card-hover border-4 border-transparent hover:border-green-400"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View ${playlist.title} playlist`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 overflow-hidden">
        <img
          src={playlist.thumbnailUrl}
          alt={playlist.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Playlist overlay indicator */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 m-3 rounded-xl shadow-2xl">
          <div className="flex items-center text-white">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            <span className="font-black text-lg">{playlist.videoCount}</span>
            <span className="ml-1 text-sm font-bold">videos</span>
          </div>
        </div>
        {/* Fun badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
          📚 Playlist
        </div>
      </div>

      {/* Playlist Info */}
      <div className="p-4 bg-gradient-to-b from-white to-green-50">
        <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 min-h-[3rem] group-hover:text-green-600 transition-colors text-lg">
          {playlist.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 font-medium">
          {playlist.description || 'No description available'}
        </p>
      </div>
    </div>
  );
}
