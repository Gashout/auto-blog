-- Auto-Generated Blog Database Schema

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries on created_at
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- Insert sample article for testing
INSERT INTO articles (title, content, summary) VALUES
(
  'Welcome to Auto-Generated Blog',
  'This is the first article in our auto-generated blog system. This blog uses AI to automatically generate interesting content every day. The system leverages modern technologies including React for the frontend, Node.js for the backend, and PostgreSQL for data storage. Articles are generated using AI language models and scheduled to publish automatically.',
  'Introduction to the auto-generated blog system powered by AI and modern web technologies.'
);
