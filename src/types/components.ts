// Component Props Types

import type { Video, Playlist } from './youtube';

// Video Component Props
export interface VideoCardProps {
  video: Video;
  onClick?: (videoId: string) => void;
}

export interface VideoGridProps {
  videos: Video[];
  isLoading?: boolean;
  error?: Error | null;
  onVideoClick?: (videoId: string) => void;
}

export interface VideoListItemProps {
  video: Video;
  onClick?: (videoId: string) => void;
}

export interface VideoListProps {
  videos: Video[];
  isLoading?: boolean;
  error?: Error | null;
  onVideoClick?: (videoId: string) => void;
}

// Playlist Component Props
export interface PlaylistCardProps {
  playlist: Playlist;
  onClick?: (playlistId: string) => void;
}

export interface PlaylistGridProps {
  playlists: Playlist[];
  isLoading?: boolean;
  error?: Error | null;
  onPlaylistClick?: (playlistId: string) => void;
}

// Video Player Component Props
export interface VideoPlayerProps {
  videoId: string;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
}

export interface VideoInfoProps {
  video: Video;
}

// Layout Component Props
export interface LayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  channelTitle?: string;
}

export interface FooterProps {
  channelTitle?: string;
  channelId?: string;
}

// Error Component Props
export interface ErrorDisplayProps {
  error: Error;
  onRetry?: () => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Loading Component Props
export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

// Utility Types for Common Patterns
export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

export type PaginationState = {
  nextPageToken?: string;
  prevPageToken?: string;
  hasMore: boolean;
};

export type FetchOptions = {
  maxResults?: number;
  pageToken?: string;
};
