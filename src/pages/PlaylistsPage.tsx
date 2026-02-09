import { useQuery } from '@tanstack/react-query';
import { youtubeService } from '../services/youtubeService';
import { PlaylistGrid, LoadingSkeleton, ErrorDisplay } from '../components';

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
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          <span className="gradient-text">Playlists</span>
        </h1>
        <p className="text-gray-600 text-lg">
          📋 Explore curated collections of videos
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

