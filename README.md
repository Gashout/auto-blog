# Auto-Generated Blog

> A full-stack blog application that automatically generates articles using AI, built with React, Node.js, PostgreSQL, and deployed on AWS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 Live Demo

**🚀 Application URL:** http://auto-blog.duckdns.org:3000

The application is deployed on AWS EC2 in the **ap-southeast-2 (Sydney)** region.

**Features you can explore:**
- Browse AI-generated articles with modern, animated UI
- Click any article to read the full content
- Responsive design optimized for all devices
- Professional skeleton loaders and smooth animations

> **Note:** The application runs on port 3000. In a production environment, this would be behind a custom domain with SSL/TLS.

---

## 🎯 Project Overview

This project is a technical challenge submission demonstrating full-stack development and DevOps capabilities. The application automatically generates blog articles daily using AI and features a modern, responsive web interface.

### Key Features

- ✨ **AI-Powered Content**: Automatic article generation using HuggingFace API
- 📅 **Daily Automation**: Scheduled article creation via node-cron
- 🎨 **Modern UI**: Responsive React frontend with clean design
- 🐳 **Containerized**: Full Docker support for development and production
- ☁️ **AWS Deployment**: CI/CD pipeline with CodeBuild, ECR, and EC2
- 💾 **PostgreSQL Database**: Reliable data persistence

## 🏗️ Architecture

```
┌──────────┐      ┌──────────┐      ┌────────────┐
│  React   │ ───▶ │ Node.js  │ ───▶ │ PostgreSQL │
│ Frontend │      │ Backend  │      │  Database  │
└──────────┘      └──────────┘      └────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ HuggingFace API │
              │  (AI Articles)  │
              └─────────────────┘
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

## 🚀 Quick Start

### Prerequisites

- Docker Desktop
- Node.js 18+ (for local development)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gashout/auto-blog.git
   cd auto-blog
   ```

2. **Create environment file**
   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/

5. **Generate initial articles** (optional)
   ```bash
   curl -X POST http://localhost:5000/api/articles/generate
   curl -X POST http://localhost:5000/api/articles/generate
   curl -X POST http://localhost:5000/api/articles/generate
   ```

### Stop Services

```bash
docker-compose down
```

## 📁 Project Structure

```
auto-blog/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (AI, cron)
│   │   └── index.js        # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app
│   ├── Dockerfile
│   └── package.json
│
├── infra/                  # Infrastructure as Code
│   ├── buildspec.yml      # AWS CodeBuild config
│   └── scripts/
│       ├── deploy.sh      # EC2 deployment script
│       └── init-ec2.sh    # EC2 initialization
│
├── docs/
│   └── ARCHITECTURE.md    # Architecture documentation
│
├── docker-compose.yml      # Local development setup
├── TASK.md                # Development checklist
├── PROJECT_ROADMAP.md     # Implementation guide
└── README.md              # This file
```

## 🔧 Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Nginx** - Production web server

### Backend
- **Node.js 18** - Runtime
- **Express** - Web framework
- **PostgreSQL 15** - Database
- **node-cron** - Task scheduling
- **Axios** - HTTP client for AI API

### Infrastructure
- **Docker** - Containerization
- **AWS EC2** - Hosting (t2.micro)
- **AWS ECR** - Container registry
- **AWS CodeBuild** - CI/CD pipeline
- **GitHub** - Version control

## 📡 API Endpoints

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get article by ID |
| GET | `/api/articles/stats` | Get statistics |
| POST | `/api/articles/generate` | Generate new article |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/` | API information |

## 🤖 AI Article Generation

- **Service**: HuggingFace Inference API (Free Tier)
- **Model**: GPT-2
- **Schedule**: Daily at 2:00 AM UTC
- **Topics**: Technology, AI, sustainability, web development, and more
- **Fallback**: Predefined content if API fails

## ☁️ AWS Deployment

### Prerequisites

1. AWS Account with free tier
2. AWS CLI configured
3. GitHub repository

### Setup Steps

1. **Create ECR Repositories**
   ```bash
   aws ecr create-repository --repository-name auto-blog-backend
   aws ecr create-repository --repository-name auto-blog-frontend
   ```

2. **Launch EC2 Instance**
   - AMI: Amazon Linux 2023
   - Instance Type: t2.micro
   - Security Group: Allow ports 22, 80, 3000, 5000
   - Run initialization script: `./infra/scripts/init-ec2.sh`

3. **Configure CodeBuild**
   - Create build project
   - Source: GitHub repository
   - Buildspec: `infra/buildspec.yml`
   - Environment variables: `AWS_ACCOUNT_ID`, `AWS_DEFAULT_REGION`

4. **Deploy to EC2**
   ```bash
   ssh -i your-key.pem ec2-user@YOUR_EC2_IP
   git clone https://github.com/YOUR_USERNAME/auto-blog.git
   cd auto-blog
   ./infra/scripts/deploy.sh
   ```

See [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) for detailed deployment guide.

## 🧪 Testing

### Backend Tests

```bash
# Health check
curl http://localhost:5000/health

# Get all articles
curl http://localhost:5000/api/articles

# Generate article
curl -X POST http://localhost:5000/api/articles/generate
```

### Frontend Tests

Open http://localhost:3000 in your browser and verify:
- Article list displays correctly
- Clicking an article shows full content
- Navigation works properly
- Responsive design on mobile

## 📊 Monitoring

### View Logs

```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# Database logs
docker-compose logs -f db
```

### Check Container Status

```bash
docker-compose ps
```

## 🔒 Security

- Environment variables for sensitive data
- No hardcoded credentials
- CORS enabled for frontend-backend communication
- PostgreSQL not exposed publicly
- Docker health checks
- EC2 security groups properly configured

## 💰 Cost Estimation

### AWS Free Tier
- EC2 t2.micro: 750 hours/month free
- ECR: 500 MB storage free
- CodeBuild: 100 build minutes/month free

### After Free Tier
- Estimated: $8-10/month

## 🛠️ Development

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Run Locally (without Docker)

```bash
# Terminal 1 - Database
docker run -d -p 5432:5432 \
  -e POSTGRES_USER=bloguser \
  -e POSTGRES_PASSWORD=blogpass \
  -e POSTGRES_DB=autoblog \
  postgres:15-alpine

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - Frontend
cd frontend
npm run dev
```

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
DATABASE_URL=postgresql://bloguser:blogpass@db:5432/autoblog
NODE_ENV=development
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/gpt2
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

### Database Connection Failed

```bash
# Check if database is running
docker-compose ps db

# Restart database
docker-compose restart db
```

### Docker Build Failed

```bash
# Clean up and rebuild
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## 📚 Documentation

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Project Roadmap](PROJECT_ROADMAP.md)
- [Task Checklist](TASK.md)
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

## 🎥 Demo Video

[Watch the Demo Video](https://www.loom.com/share/65bc0f8d471642798559804bfdcef679)

## 🚀 Live Demo

[http://auto-blog.duckdns.org:3000](http://auto-blog.duckdns.org:3000)

## 📧 Contact

For questions about this project, please contact: Ahmedgashout998@gmail.com

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Built with ❤️ for the Technical Challenge**
