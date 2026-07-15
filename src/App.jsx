import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryChips from './components/CategoryChips';
import VideoGrid from './components/VideoGrid';
import {
  CATEGORY_QUERIES,
  DEFAULT_VIDEO_ID,
  getSuggestedVideos,
  normalizeVideos,
  searchVideos,
} from './services/youtubeApi';
import './App.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Cooking');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVideos = useCallback(async (category, query = '') => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (query.trim()) {
        data = await searchVideos(query.trim());
      } else if (category === 'All') {
        data = await getSuggestedVideos(DEFAULT_VIDEO_ID);
      } else {
        const searchTerm = CATEGORY_QUERIES[category] || category;
        data = await searchVideos(searchTerm);
      }

      setVideos(normalizeVideos(data));
    } catch (err) {
      setVideos([]);
      setError(err.message || 'Failed to load videos. Check your API key.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos(activeCategory);
  }, [activeCategory, loadVideos]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      loadVideos(activeCategory, searchQuery);
    }
  };

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onMenuToggle={() => setSidebarOpen((open) => !open)}
      />

      <div className="app-body">
        <Sidebar
          isOpen={sidebarOpen}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />

        <main className="main-content">
          <CategoryChips activeCategory={activeCategory} onCategorySelect={handleCategorySelect} />
          <VideoGrid videos={videos} loading={loading} error={error} />
        </main>
      </div>
    </div>
  );
}
