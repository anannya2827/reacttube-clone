import './Header.css';

export default function Header({ searchQuery, onSearchChange, onSearchSubmit, onMenuToggle }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </button>
        <div className="logo">
          <svg viewBox="0 0 90 20" width="90" height="20" aria-hidden="true">
            <path
              fill="#FF0000"
              d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35042 27.9727 3.12324Z"
            />
            <path fill="white" d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" />
          </svg>
          <span className="logo-text">YouTube</span>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <button type="button" className="icon-btn mic-btn" aria-label="Voice search">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>

      <div className="header-right">
        <button className="icon-btn" aria-label="Create">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-4H6V5h11v4zm0 5H6v4h11v-4z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm9-4.58V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v4.42l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L19 15.42z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button className="avatar-btn" aria-label="Account">
          U
        </button>
      </div>
    </header>
  );
}
