import type { Playlist } from '../types/youtube';
import PlaylistCard from './PlaylistCard';

interface PlaylistGridProps {
  playlists: Playlist[];
}

export default function PlaylistGrid({ playlists }: PlaylistGridProps) {
  if (playlists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No playlists found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
