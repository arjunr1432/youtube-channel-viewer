import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import type {
  Video,
  Playlist,
  YouTubeVideosResponse,
  YouTubePlaylistsResponse,
  YouTubePlaylistItemsResponse,
  YouTubeErrorResponse,
  YouTubeVideoItem,
} from '../types/youtube';

/**
 * Custom error class for YouTube API errors
 */
export class YouTubeAPIError extends Error {
  code?: number;
  reason?: string;

  constructor(
    message: string,
    code?: number,
    reason?: string
  ) {
    super(message);
    this.name = 'YouTubeAPIError';
    this.code = code;
    this.reason = reason;
  }
}

/**
 * Service class for interacting with YouTube Data API v3
 */
class YouTubeService {
  private apiKey: string;
  private channelId: string;
  private axiosInstance: AxiosInstance | null = null;
  private readonly BASE_URL = 'https://www.googleapis.com/youtube/v3';
  private initError: YouTubeAPIError | null = null;
  private channelName: string | null = null;

  constructor() {
    // Get API key and channel ID from environment variables
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || '';
    this.channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '';

    // Don't throw errors in constructor - store them for later
    if (!this.apiKey) {
      this.initError = new YouTubeAPIError(
        'YouTube API key is not configured. Please create a .env file with VITE_YOUTUBE_API_KEY.',
        401,
        'missing_api_key'
      );
      return;
    }

    if (!this.channelId) {
      this.initError = new YouTubeAPIError(
        'YouTube Channel ID is not configured. Please add VITE_YOUTUBE_CHANNEL_ID to your .env file.',
        400,
        'missing_channel_id'
      );
      return;
    }

    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      params: {
        key: this.apiKey,
      },
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<YouTubeErrorResponse>) => {
        return Promise.reject(this.handleAPIError(error));
      }
    );
  }

  /**
   * Check if service is properly initialized
   */
  private checkInitialization(): void {
    if (this.initError) {
      throw this.initError;
    }
    if (!this.axiosInstance) {
      throw new YouTubeAPIError(
        'YouTube service is not properly initialized.',
        500,
        'initialization_error'
      );
    }
  }

  /**
   * Get the channel name
   */
  async getChannelName(): Promise<string> {
    this.checkInitialization();

    if (this.channelName) {
      return this.channelName;
    }

    try {
      const response = await this.axiosInstance!.get('/channels', {
        params: {
          part: 'snippet',
          id: this.channelId,
        },
      });

      if (response.data.items && response.data.items.length > 0) {
        this.channelName = response.data.items[0].snippet.title;
        return this.channelName || 'Kids Arts & Learn';
      }

      return 'Kids Arts & Learn';
    } catch (error) {
      console.error('Failed to fetch channel name:', error);
      return 'Kids Arts & Learn';
    }
  }

  /**
   * Handle API errors and convert them to YouTubeAPIError
   */
  private handleAPIError(error: AxiosError<YouTubeErrorResponse>): YouTubeAPIError {
    if (error.response?.data?.error) {
      const apiError = error.response.data.error;
      const reason = apiError.errors?.[0]?.reason || 'unknown_error';

      // Handle specific error cases
      if (apiError.code === 403) {
        if (reason === 'quotaExceeded' || reason === 'rateLimitExceeded') {
          return new YouTubeAPIError(
            'YouTube API quota exceeded. Please try again later.',
            403,
            reason
          );
        }
        return new YouTubeAPIError(
          'Access forbidden. Please check your API key restrictions.',
          403,
          reason
        );
      }

      if (apiError.code === 400) {
        return new YouTubeAPIError(
          `Invalid request: ${apiError.message}`,
          400,
          reason
        );
      }

      if (apiError.code === 404) {
        return new YouTubeAPIError(
          'Resource not found. Please check the channel or playlist ID.',
          404,
          reason
        );
      }

      return new YouTubeAPIError(
        apiError.message || 'An error occurred while fetching data from YouTube.',
        apiError.code,
        reason
      );
    }

    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      return new YouTubeAPIError(
        'Network error. Please check your internet connection.',
        0,
        'network_error'
      );
    }

    // Generic error
    return new YouTubeAPIError(
      error.message || 'An unexpected error occurred.',
      error.response?.status,
      'unknown_error'
    );
  }

  /**
   * Transform YouTube API video item to our Video model
   */
  private transformVideo(item: YouTubeVideoItem): Video {
    const videoId = typeof item.id === 'string' ? item.id : item.id.videoId;
    const thumbnailUrl =
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url ||
      '';

    return {
      id: videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl,
      publishedAt: item.snippet.publishedAt,
      duration: item.contentDetails?.duration || '',
      channelId: item.snippet.channelId,
    };
  }

  /**
   * Get recent videos from the configured channel
   * @param maxResults Maximum number of videos to fetch (default: 12)
   * @returns Promise<Video[]>
   */
  async getRecentVideos(maxResults: number = 12): Promise<Video[]> {
    this.checkInitialization();

    try {
      // First, get the uploads playlist ID
      const channelResponse = await this.axiosInstance!.get('/channels', {
        params: {
          part: 'contentDetails',
          id: this.channelId,
        },
      });

      if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
        throw new YouTubeAPIError(
          'Channel not found. Please check your channel ID.',
          404,
          'channel_not_found'
        );
      }

      const uploadsPlaylistId =
        channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

      // Get videos from the uploads playlist
      const playlistResponse = await this.axiosInstance!.get<YouTubePlaylistItemsResponse>(
        '/playlistItems',
        {
          params: {
            part: 'snippet,contentDetails',
            playlistId: uploadsPlaylistId,
            maxResults,
          },
        }
      );

      // Transform playlist items directly - they have thumbnails!
      return playlistResponse.data.items.map((item) => {
        const videoId = item.snippet.resourceId?.videoId || '';
        const thumbnailUrl =
          item.snippet.thumbnails.maxres?.url ||
          item.snippet.thumbnails.standard?.url ||
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; // Try maxres first as fallback

        console.log('Video ID:', videoId, 'Thumbnail:', thumbnailUrl);

        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl,
          publishedAt: item.snippet.publishedAt,
          duration: item.contentDetails?.videoPublishedAt || '',
          channelId: item.snippet.channelId,
        };
      });
    } catch (error) {
      if (error instanceof YouTubeAPIError) {
        throw error;
      }
      throw new YouTubeAPIError('Failed to fetch recent videos.', 500, 'fetch_error');
    }
  }

  /**
   * Get all playlists from the configured channel
   * @param maxResults Maximum number of playlists to fetch (default: 50)
   * @returns Promise<Playlist[]>
   */
  async getPlaylists(maxResults: number = 50): Promise<Playlist[]> {
    this.checkInitialization();

    try {
      const response = await this.axiosInstance!.get<YouTubePlaylistsResponse>('/playlists', {
        params: {
          part: 'snippet,contentDetails',
          channelId: this.channelId,
          maxResults,
        },
      });

      return response.data.items.map((item) => {
        const thumbnailUrl =
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          '';

        return {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl,
          videoCount: item.contentDetails.itemCount,
          channelId: item.snippet.channelId,
        };
      });
    } catch (error) {
      if (error instanceof YouTubeAPIError) {
        throw error;
      }
      throw new YouTubeAPIError('Failed to fetch playlists.', 500, 'fetch_error');
    }
  }

  /**
   * Get all videos in a specific playlist
   * @param playlistId The ID of the playlist
   * @param maxResults Maximum number of videos to fetch (default: 50)
   * @returns Promise<Video[]>
   */
  async getPlaylistVideos(playlistId: string, maxResults: number = 50): Promise<Video[]> {
    this.checkInitialization();

    try {
      // Get playlist items
      const playlistResponse = await this.axiosInstance!.get<YouTubePlaylistItemsResponse>(
        '/playlistItems',
        {
          params: {
            part: 'snippet',
            playlistId,
            maxResults,
          },
        }
      );

      // Get video IDs to fetch additional details
      const videoIds = playlistResponse.data.items
        .map((item) => item.snippet.resourceId?.videoId)
        .filter(Boolean)
        .join(',');

      if (!videoIds) {
        return [];
      }

      // Fetch video details including duration
      const videosResponse = await this.axiosInstance!.get<YouTubeVideosResponse>('/videos', {
        params: {
          part: 'snippet,contentDetails',
          id: videoIds,
        },
      });

      return videosResponse.data.items.map((item) => this.transformVideo(item));
    } catch (error) {
      if (error instanceof YouTubeAPIError) {
        throw error;
      }
      throw new YouTubeAPIError('Failed to fetch playlist videos.', 500, 'fetch_error');
    }
  }

  /**
   * Get details for a specific video
   * @param videoId The ID of the video
   * @returns Promise<Video>
   */
  async getVideoDetails(videoId: string): Promise<Video> {
    this.checkInitialization();

    try {
      const response = await this.axiosInstance!.get<YouTubeVideosResponse>('/videos', {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
        },
      });

      if (!response.data.items || response.data.items.length === 0) {
        throw new YouTubeAPIError('Video not found.', 404, 'video_not_found');
      }

      return this.transformVideo(response.data.items[0]);
    } catch (error) {
      if (error instanceof YouTubeAPIError) {
        throw error;
      }
      throw new YouTubeAPIError('Failed to fetch video details.', 500, 'fetch_error');
    }
  }

  /**
   * Get the configured channel ID
   */
  getChannelId(): string {
    return this.channelId;
  }
}

// Export a singleton instance
export const youtubeService = new YouTubeService();
export default youtubeService;
