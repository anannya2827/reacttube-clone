import './VideoCard.css';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getInitial(name) {
  return name?.charAt(0)?.toUpperCase() || '?';
}

export default function VideoCard({ video, onSelect }) {
  const handleClick = () => onSelect?.(video);

  return (
    <article className="video-card">
      <button type="button" className="video-thumbnail-link" onClick={handleClick}>
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="video-thumbnail" loading="lazy" />
        ) : (
          <div className="video-thumbnail placeholder">
            <span>{getInitial(video.channelTitle)}</span>
          </div>
        )}
      </button>

      <div className="video-info">
        <div className="channel-avatar">{getInitial(video.channelTitle)}</div>
        <div className="video-meta">
          <button type="button" className="video-title" title={video.title} onClick={handleClick}>
            {video.title}
          </button>
          <p className="video-channel">{video.channelTitle}</p>
          <p className="video-date">{formatDate(video.publishedAt)}</p>
        </div>
      </div>
    </article>
  );
}
