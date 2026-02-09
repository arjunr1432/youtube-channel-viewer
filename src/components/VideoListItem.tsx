import { useNavigate } from 'react-router-dom';
import type { Video } from '../types/youtube';

interface VideoListItemProps {
  video: Video;
  index: number;
}

export default function VideoListItem({ video, index }: VideoListItemProps) {
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
      className="flex gap-4 bg-white rounded-lg shadow-sm hover:shadow-md p-4 cursor-pointer transition-all"
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
      {/* Index Number */}
      <div className="flex-shrink-0 w-8 text-gray-500 font-semibold text-lg">
        {index + 1}
      </div>

      {/* Thumbnail */}
      <div className="flex-shrink-0 w-40 md:w-48">
        <div className="relative aspect-video bg-gray-200 rounded overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-all">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {video.description || 'No description available'}
        </p>
        <p className="text-xs text-gray-500">
          {formatDate(video.publishedAt)}
        </p>
      </div>
    </div>
  );
}
