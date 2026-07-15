import { useEffect, useState } from 'react';
import { DEFAULT_VIDEO_ID, getSuggestedVideos, normalizeVideos } from '../services/youtubeApi';
import './WatchPage.css';

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

function RelatedVideo({ video, onSelect }) {
  return (
    <button type="button" className="related-video" onClick={() => onSelect(video)}>
      {video.thumbnail ? (
        <img src={video.thumbnail} alt={video.title} className="related-thumbnail" loading="lazy" />
      ) : (
        <div className="related-thumbnail placeholder">{getInitial(video.channelTitle)}</div>
      )}
      <div className="related-meta">
        <p className="related-title">{video.title}</p>
        <p className="related-channel">{video.channelTitle}</p>
        <p className="related-date">{formatDate(video.publishedAt)}</p>
      </div>
    </button>
  );
}

export default function WatchPage({ video, onVideoSelect, onBack }) {
  const [related, setRelated] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadRelated() {
      setLoadingRelated(true);
      try {
        const data = await getSuggestedVideos(video.id || DEFAULT_VIDEO_ID);
        if (!cancelled) {
          setRelated(normalizeVideos(data).filter((item) => item.id !== video.id));
        }
      } catch {
        if (!cancelled) setRelated([]);
      } finally {
        if (!cancelled) setLoadingRelated(false);
      }
    }

    loadRelated();
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [video.id]);

  return (
    <div className="watch-page">
      <button type="button" className="watch-back" onClick={onBack}>
        ← Back to home
      </button>

      <div className="watch-layout">
        <section className="watch-main">
          <div className="player-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="watch-info">
            <h1 className="watch-title">{video.title}</h1>
            <div className="watch-channel-row">
              <div className="watch-channel-avatar">{getInitial(video.channelTitle)}</div>
              <div>
                <p className="watch-channel">{video.channelTitle}</p>
                <p className="watch-date">{formatDate(video.publishedAt)}</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="watch-related">
          <h2 className="watch-related-heading">Up next</h2>
          {loadingRelated ? (
            <p className="watch-related-loading">Loading related videos...</p>
          ) : (
            related.map((item) => (
              <RelatedVideo key={item.id} video={item} onSelect={onVideoSelect} />
            ))
          )}
        </aside>
      </div>
    </div>
  );
}
