import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        {/* SVG illustration */}
        <div className="illustration">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="72" fill="#F7F9F8" stroke="#006B3F" strokeWidth="4" />
            <path d="M80 40 L80 90 L110 110" stroke="#008C52" strokeWidth="6" strokeLinecap="round" />
            <circle cx="60" cy="65" r="6" fill="#1F2933" />
            <circle cx="100" cy="65" r="6" fill="#1F2933" />
            <path d="M65 95 Q80 110 95 95" stroke="#1F2933" strokeWidth="4" strokeLinecap="round" />
            <text x="80" y="135" textAnchor="middle" fontSize="22" fontWeight="700" fill="#006B3F">404</text>
          </svg>
        </div>

        <h1 className="error-title">Page not found</h1>
        <p className="error-description">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="action-group">
          <a href="/" className="btn btn-primary">Go back home</a>
          <a href="/contact" className="btn btn-secondary">Contact support</a>
        </div>
      </div>
      <p className="footer-note">&copy; {new Date().getFullYear()} — All rights reserved.</p>
    </div>
  );
};

export default NotFoundPage;