// YouTube Data API Response Types

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

// Video Types
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: string;
  channelId: string;
}

export interface YouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  resourceId?: {
    videoId: string;
  };
}

export interface YouTubeVideoContentDetails {
  duration: string;
  dimension: string;
  definition: string;
}

export interface YouTubeVideoItem {
  kind: string;
  etag: string;
  id: string | { videoId: string };
  snippet: YouTubeVideoSnippet;
  contentDetails?: YouTubeVideoContentDetails;
}

export interface YouTubeVideosResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeVideoItem[];
}

// Playlist Types
export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoCount: number;
  channelId: string;
}

export interface YouTubePlaylistSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
}

export interface YouTubePlaylistContentDetails {
  itemCount: number;
}

export interface YouTubePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubePlaylistSnippet;
  contentDetails: YouTubePlaylistContentDetails;
}

export interface YouTubePlaylistsResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubePlaylistItem[];
}

// Playlist Items (videos in a playlist)
export interface YouTubePlaylistItemResourceContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

export interface YouTubePlaylistItemResource {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeVideoSnippet;
  contentDetails: YouTubePlaylistItemResourceContentDetails;
}

export interface YouTubePlaylistItemsResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubePlaylistItemResource[];
}

// Error Types
export interface YouTubeAPIError {
  code: number;
  message: string;
  errors?: Array<{
    domain: string;
    reason: string;
    message: string;
  }>;
}

export interface YouTubeErrorResponse {
  error: YouTubeAPIError;
}
