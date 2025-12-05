import express from 'express';
import {
  getAllArticles,
  getArticleById,
  getArticleCount
} from '../models/Article.js';
import { generateAndSaveArticle } from '../services/articleJob.js';

const router = express.Router();

/**
 * GET /api/articles
 * Get all articles
 */
router.get('/', async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles'
    });
  }
});

/**
 * GET /api/articles/stats
 * Get article statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const count = await getArticleCount();
    res.json({
      success: true,
      data: {
        totalArticles: count
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

/**
 * GET /api/articles/:id
 * Get single article by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await getArticleById(id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article'
    });
  }
});

/**
 * POST /api/articles/generate
 * Manually trigger article generation (for testing)
 */
router.post('/generate', async (req, res) => {
  try {
    const article = await generateAndSaveArticle();
    res.status(201).json({
      success: true,
      message: 'Article generated successfully',
      data: article
    });
  } catch (error) {
    console.error('Error generating article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate article'
    });
  }
});

export default router;
