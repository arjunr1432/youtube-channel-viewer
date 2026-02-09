import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import VideoPlayerPage from './pages/VideoPlayerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="playlist/:playlistId" element={<PlaylistDetailPage />} />
          <Route path="video/:videoId" element={<VideoPlayerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
