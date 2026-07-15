import VideoCard from './VideoCard';
import './VideoGrid.css';

export default function VideoGrid({ videos, loading, error, onVideoSelect }) {
  if (loading) {
    return (
      <div className="video-grid-state">
        <div className="spinner" />
        <p>Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-grid-state error">
        <p>{error}</p>
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="video-grid-state">
        <p>No videos found.</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onSelect={onVideoSelect} />
      ))}
    </div>
  );
}
