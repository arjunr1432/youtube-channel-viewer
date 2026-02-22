import { useNavigate } from 'react-router-dom';
import type { Video } from '../types/youtube';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };

  // Format the published date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-[#1c0d3a] rounded-2xl shadow-xl overflow-hidden cursor-pointer card-hover border-2 border-white/5 hover:border-purple-500/50"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Watch ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-indigo-950 overflow-hidden">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-24 h-24 text-white/50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
        )}
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-purple-900/40 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Fun badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
          ▶ Video
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 bg-gradient-to-b from-[#1c0d3a] to-[#0f0720]">
        <h3 className="font-bold text-gray-100 line-clamp-2 mb-2 min-h-[3rem] group-hover:text-purple-300 transition-colors text-lg italic">
          {video.title}
        </h3>
        <div className="flex items-center text-sm text-purple-300/80">
          <svg className="w-4 h-4 mr-1.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">{formatDate(video.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
}
