import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Get all articles
 */
export const getArticles = async () => {
  const response = await apiClient.get('/articles');
  return response.data;
};

/**
 * Get single article by ID
 */
export const getArticle = async (id) => {
  const response = await apiClient.get(`/articles/${id}`);
  return response.data;
};

/**
 * Get article statistics
 */
export const getStats = async () => {
  const response = await apiClient.get('/articles/stats');
  return response.data;
};

/**
 * Generate new article (for testing)
 */
export const generateArticle = async () => {
  const response = await apiClient.post('/articles/generate');
  return response.data;
};

export default {
  getArticles,
  getArticle,
  getStats,
  generateArticle,
};
