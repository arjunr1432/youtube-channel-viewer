import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { youtubeService } from '../services/youtubeService';
import { VideoList, LoadingSkeleton, ErrorDisplay } from '../components';

export default function PlaylistDetailPage() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();

  // Fetch playlist videos using React Query
  const {
    data: videos,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['playlistVideos', playlistId],
    queryFn: () => youtubeService.getPlaylistVideos(playlistId!, 50),
    enabled: !!playlistId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  if (!playlistId) {
    return (
      <ErrorDisplay
        message="Invalid playlist ID. Please check the URL and try again."
      />
    );
  }

  return (
    <div>
      <div className="mb-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-bold hover:text-purple-600 group w-fit"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Playlists
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Playlist Videos</h1>
        {videos && videos.length > 0 && (
          <p className="text-gray-600">
            {videos.length} video{videos.length !== 1 ? 's' : ''} in this playlist
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSkeleton />}

      {/* Error State */}
      {isError && (
        <ErrorDisplay
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load playlist videos. Please try again.'
          }
          onRetry={() => refetch()}
        />
      )}

      {/* Success State */}
      {!isLoading && !isError && videos && <VideoList videos={videos} />}
    </div>
  );
}
