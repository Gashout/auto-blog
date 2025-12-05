import cron from 'node-cron';
import { generateArticle } from './aiClient.js';
import { createArticle, getArticleCount } from '../models/Article.js';

/**
 * Generate and save a new article
 */
export async function generateAndSaveArticle() {
  try {
    console.log('🚀 Starting article generation job...');
    
    // Generate article using AI
    const articleData = await generateArticle();
    
    // Save to database
    const savedArticle = await createArticle(articleData);
    
    const count = await getArticleCount();
    console.log(`✅ Article generated and saved! Total articles: ${count}`);
    console.log(`📝 Title: ${savedArticle.title}`);
    
    return savedArticle;
  } catch (error) {
    console.error('❌ Error in article generation job:', error);
    throw error;
  }
}

/**
 * Initialize the cron job for daily article generation
 * Runs every day at 2:00 AM UTC
 */
export function initializeArticleJob() {
  // Schedule: Run at 2:00 AM every day (UTC)
  // Format: minute hour day month weekday
  const schedule = '0 2 * * *';
  
  console.log('⏰ Initializing daily article generation job...');
  console.log(`📅 Schedule: Every day at 2:00 AM UTC`);
  
  cron.schedule(schedule, async () => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`⏰ Cron job triggered at ${new Date().toISOString()}`);
    console.log(`${'='.repeat(50)}\n`);
    
    await generateAndSaveArticle();
  });
  
  console.log('✅ Article generation job initialized successfully');
}

export default {
  generateAndSaveArticle,
  initializeArticleJob
};
