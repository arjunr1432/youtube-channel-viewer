import type { Video } from '../types/youtube';
import VideoListItem from './VideoListItem';

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No videos found in this playlist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <VideoListItem key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}
