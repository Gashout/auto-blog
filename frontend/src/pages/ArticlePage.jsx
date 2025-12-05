import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticle } from '../api/client';
import './ArticlePage.css';

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await getArticle(id);
      setArticle(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('Article not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="article-page">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Articles
        </button>

        <article className="article-content">
          <header className="article-header">
            <h1>{article.title}</h1>
            <div className="article-meta">
              <time dateTime={article.created_at}>
                {formatDate(article.created_at)}
              </time>
              <span className="ai-badge">🤖 AI Generated</span>
            </div>
          </header>

          <div className="article-body">
            <p>{article.content}</p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default ArticlePage;
