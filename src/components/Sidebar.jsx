import './Sidebar.css';

const mainItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'shorts', label: 'Shorts', icon: 'shorts' },
  { id: 'library', label: 'Library', icon: 'library' },
];

const exploreItems = [
  { id: 'New', label: 'New' },
  { id: 'Music', label: 'Music' },
  { id: 'Gaming', label: 'Gaming' },
  { id: 'Live', label: 'Live' },
  { id: 'Education', label: 'Education' },
  { id: 'Coding', label: 'Coding' },
  { id: 'Fitness', label: 'Fitness' },
];

function NavIcon({ type }) {
  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
      </svg>
    );
  }
  if (type === 'shorts') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.21-4.79-.82-1.04-2.07-1.35-3.16-1.01l-5.49 1.72c-1.21.38-2.08 1.47-2.08 2.7v6.26c0 1.23.87 2.32 2.08 2.7l5.49 1.72c1.09.34 2.34.03 3.16-1.01 1.32-1.56.63-3.83-1.21-4.79l-1.43-.76c0 0 .43-.18 1.2-.5.77-.32 1.43-.96 1.43-1.83 0-.87-.66-1.51-1.43-1.83z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path
        d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5-6-4.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Sidebar({ isOpen, activeCategory, onCategorySelect }) {
  if (!isOpen) return null;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {mainItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${item.id === 'home' && activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => onCategorySelect('All')}
          >
            <NavIcon type={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <h3 className="sidebar-heading">Explore</h3>
      <nav className="sidebar-nav">
        {exploreItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeCategory === item.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(item.id)}
          >
            <span className="sidebar-dot" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
