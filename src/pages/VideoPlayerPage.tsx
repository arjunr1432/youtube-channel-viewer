import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { youtubeService } from '../services/youtubeService';
import { ErrorDisplay } from '../components';

export default function VideoPlayerPage() {
  const { videoId } = useParams<{ videoId: string }>();

  // Fetch video details using React Query
  const {
    data: video,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['videoDetails', videoId],
    queryFn: () => youtubeService.getVideoDetails(videoId!),
    enabled: !!videoId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  if (!videoId) {
    return (
      <ErrorDisplay
        message="Invalid video ID. Please check the URL and try again."
      />
    );
  }

  const navigate = useNavigate();

  // Format the published date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 font-bold hover:text-purple-600 group"
      >
        <svg
          className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <div className="aspect-video bg-gray-300 rounded-lg animate-pulse" />
          <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <ErrorDisplay
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load video. Please try again.'
          }
          onRetry={() => refetch()}
        />
      )}

      {/* Success State */}
      {!isLoading && !isError && video && (
        <div className="space-y-6">
          {/* Video Player */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Video Information */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-gray-100">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {video.title}
            </h1>

            <div className="flex items-center text-sm md:text-base text-gray-600 bg-red-50 px-4 py-3 rounded-xl mb-6 border border-red-100">
              <svg
                className="w-5 h-5 mr-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Published: {formatDate(video.publishedAt)}</span>
            </div>

            {video.description && (
              <div className="border-t-2 border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Description
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {video.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
