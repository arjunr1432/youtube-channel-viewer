import { useQuery } from '@tanstack/react-query';
import { youtubeService } from '../services/youtubeService';
import { VideoGrid, LoadingSkeleton, ErrorDisplay, ChannelBanner } from '../components';

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
      <ChannelBanner />
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="gradient-text">Magic Library</span>
        </h1>
        <p className="text-purple-200/80 text-lg md:text-xl font-medium max-w-2xl">
          🎬 Explore our latest bedtime stories and magical adventures.
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

