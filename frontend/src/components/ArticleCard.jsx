import { Link } from 'react-router-dom';
import './ArticleCard.css';

function ArticleCard({ article }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Link to={`/article/${article.id}`} className="article-card">
      <div className="article-card-content">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-date">{formatDate(article.created_at)}</p>
        <p className="article-summary">{article.summary}</p>
        <span className="read-more">Read more →</span>
      </div>
    </Link>
  );
}

export default ArticleCard;
