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

export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      
      <Link to={`/watch/${video.id}`}>
        
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="video-thumbnail" loading="lazy" />
        ) : (
          <div className="video-thumbnail placeholder">
            <span>{getInitial(video.channelTitle)}</span>
          </div>
        )}
      </a>

      <div className="video-info">
        <div className="channel-avatar">{getInitial(video.channelTitle)}</div>
        <div className="video-meta">
          
         <Link to={`/watch/${video.id}`}>
           
            {video.title}
          </a>
          <p className="video-channel">{video.channelTitle}</p>
          <p className="video-date">{formatDate(video.publishedAt)}</p>
        </div>
      </div>
    </article>
  );
}
