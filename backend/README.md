# Backend - Auto-Generated Blog API

Node.js + Express backend for the auto-generated blog application.

## Features

- RESTful API for article management
- PostgreSQL database integration
- AI-powered article generation using HuggingFace
- Automated daily article generation with node-cron
- Docker support

## API Endpoints

### Articles

- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `GET /api/articles/stats` - Get article statistics
- `POST /api/articles/generate` - Manually generate new article

### System

- `GET /health` - Health check endpoint
- `GET /` - API information

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
DATABASE_URL=postgresql://bloguser:blogpass@db:5432/autoblog
NODE_ENV=development
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/gpt2
```

## Local Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run with Docker

```bash
docker build -t auto-blog-backend .
docker run -p 5000:5000 --env-file .env auto-blog-backend
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── database.sql       # Database schema
│   ├── models/
│   │   └── Article.js         # Article model
│   ├── routes/
│   │   └── articles.js        # Article routes
│   ├── services/
│   │   ├── aiClient.js        # AI article generation
│   │   └── articleJob.js      # Cron job scheduler
│   └── index.js               # Main application
├── Dockerfile
├── package.json
└── .env.example
```

## Automated Article Generation

The system automatically generates one new article every day at 2:00 AM UTC using node-cron. Articles are generated using the HuggingFace API (free tier).

## Testing

Test the API:

```bash
# Get all articles
curl http://localhost:5000/api/articles

# Generate a new article
curl -X POST http://localhost:5000/api/articles/generate

# Get article by ID
curl http://localhost:5000/api/articles/1
```
