import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../api/client';
import './HomePage.css';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticles();
      setArticles(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchArticles} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="home-page">
        <div className="page-header">
          <h1>Latest Articles</h1>
          <p className="subtitle">
            Discover AI-generated content on various topics
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="empty-state">
            <p>No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
