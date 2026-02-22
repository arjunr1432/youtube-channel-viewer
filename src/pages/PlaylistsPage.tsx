import { useQuery } from '@tanstack/react-query';
import { youtubeService } from '../services/youtubeService';
import { PlaylistGrid, LoadingSkeleton, ErrorDisplay, ChannelBanner } from '../components';

export default function PlaylistsPage() {
  // Fetch playlists using React Query
  const {
    data: playlists,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => youtubeService.getPlaylists(50),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return (
    <div>
      <ChannelBanner />
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="gradient-text">Story Collections</span>
        </h1>
        <p className="text-purple-200/80 text-lg md:text-xl font-medium max-w-2xl">
          📋 Browse our curated collections of bedtime tales and learning series.
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
              : 'Failed to load playlists. Please try again.'
          }
          onRetry={() => refetch()}
        />
      )}

      {/* Success State */}
      {!isLoading && !isError && playlists && (
        <PlaylistGrid playlists={playlists} />
      )}
    </div>
  );
}

