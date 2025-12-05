import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">
            <a href="/">✨ AI Blog</a>
          </h1>
          <p className="tagline">Powered by Artificial Intelligence</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
