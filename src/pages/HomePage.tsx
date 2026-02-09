import { useQuery } from '@tanstack/react-query';
import { youtubeService } from '../services/youtubeService';
import { VideoGrid, LoadingSkeleton, ErrorDisplay } from '../components';

export default function HomePage() {
  // Fetch recent videos using React Query
  const {
    data: videos,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['recentVideos'],
    queryFn: () => youtubeService.getRecentVideos(12),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Debug: Log video data to console
  if (videos && videos.length > 0) {
    console.log('Videos loaded:', videos.length);
    console.log('First video thumbnail:', videos[0].thumbnailUrl);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          <span className="gradient-text">Recent Videos</span>
        </h1>
        <p className="text-gray-600 text-lg">
          🎬 Check out the latest uploads from the channel
        </p>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSkeleton />}

      {/* Error State */}
      {isError && (
        <ErrorDisplay
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load videos. Please try again.'
          }
          onRetry={() => refetch()}
        />
      )}

      {/* Success State */}
      {!isLoading && !isError && videos && <VideoGrid videos={videos} />}
    </div>
  );
}

