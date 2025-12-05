import { query } from '../config/db.js';

/**
 * Get all articles
 */
export async function getAllArticles() {
  const result = await query(
    'SELECT id, title, summary, created_at, updated_at FROM articles ORDER BY created_at DESC'
  );
  return result.rows;
}

/**
 * Get single article by ID
 */
export async function getArticleById(id) {
  const result = await query(
    'SELECT * FROM articles WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

/**
 * Create new article
 */
export async function createArticle({ title, content, summary }) {
  const result = await query(
    'INSERT INTO articles (title, content, summary) VALUES ($1, $2, $3) RETURNING *',
    [title, content, summary]
  );
  return result.rows[0];
}

/**
 * Get article count
 */
export async function getArticleCount() {
  const result = await query('SELECT COUNT(*) FROM articles');
  return parseInt(result.rows[0].count);
}

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  getArticleCount
};
