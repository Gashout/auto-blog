import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>© 2025 Auto-Generated Blog. Powered by AI.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
