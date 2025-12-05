# Auto-Generated Blog - System Architecture

## Overview

This document describes the technical architecture of the Auto-Generated Blog application, including system design decisions, deployment workflow, and infrastructure setup.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         GitHub Repository                    │
│                    (Source Code + Config)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Push/Webhook
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      AWS CodeBuild                           │
│  • Pull source code                                          │
│  • Build Docker images (frontend + backend)                  │
│  • Push images to ECR                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Push Images
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Amazon ECR (Elastic Container Registry)         │
│  • auto-blog-backend:latest                                  │
│  • auto-blog-frontend:latest                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Pull Images
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS EC2 Instance (t2.micro)               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Docker Containers                                     │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │   Nginx      │  │   Node.js    │  │ PostgreSQL │  │  │
│  │  │  (Frontend)  │  │  (Backend)   │  │    (DB)    │  │  │
│  │  │   Port 80    │  │  Port 5000   │  │  Port 5432 │  │  │
│  │  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │  │
│  │         │                  │                 │         │  │
│  │         └──────────────────┴─────────────────┘         │  │
│  │                    Docker Network                      │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         ▼
                  ┌──────────────┐
                  │    Users     │
                  └──────────────┘

External Services:
┌─────────────────────┐
│  HuggingFace API    │  ← AI Article Generation
└─────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Server**: Nginx (production)

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Native pg driver
- **Scheduling**: node-cron
- **AI Integration**: HuggingFace Inference API

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Registry**: AWS ECR
- **CI/CD**: AWS CodeBuild
- **Hosting**: AWS EC2 (t2.micro, Amazon Linux 2023)
- **Version Control**: Git + GitHub

## Database Schema

### Articles Table

```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
```

## API Endpoints

### Backend REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | Get all articles (list view) |
| GET | `/api/articles/:id` | Get single article by ID |
| GET | `/api/articles/stats` | Get article statistics |
| POST | `/api/articles/generate` | Manually trigger article generation |
| GET | `/health` | Health check endpoint |

## Automated Article Generation

### Cron Schedule
- **Frequency**: Daily at 2:00 AM UTC
- **Implementation**: node-cron
- **Process**:
  1. Select random topic from predefined list
  2. Generate article using HuggingFace API
  3. Save to PostgreSQL database
  4. Log generation status

### AI Integration
- **Service**: HuggingFace Inference API (Free Tier)
- **Model**: GPT-2 or similar
- **Fallback**: Predefined content if API fails
- **Cost**: $0 (using free tier)

## Deployment Workflow

### 1. Development
```bash
# Local development with hot reload
docker-compose up
```

### 2. Build & Push (CodeBuild)
```bash
# Automated via buildspec.yml
1. Pull source from GitHub
2. Build Docker images
3. Tag images (latest + commit hash)
4. Push to ECR
```

### 3. Deploy (EC2)
```bash
# Manual or automated deployment
./infra/scripts/deploy.sh
```

## Security Considerations

### Network Security
- EC2 Security Group rules:
  - SSH (22): Restricted to admin IP
  - HTTP (80): Open to public
  - Custom TCP (3000, 5000): Open for testing
  - PostgreSQL (5432): Internal only (Docker network)

### Application Security
- Environment variables for sensitive data
- No hardcoded credentials
- CORS enabled for frontend-backend communication
- Database connection pooling with limits

### Container Security
- Multi-stage builds for smaller images
- Non-root user in containers (where applicable)
- Health checks for all services
- Resource limits in docker-compose

## Monitoring & Logging

### Application Logs
```bash
# View backend logs
docker logs auto-blog-backend -f

# View frontend logs
docker logs auto-blog-frontend -f

# View database logs
docker logs auto-blog-db -f
```

### Health Checks
- Backend: `http://EC2_IP:5000/health`
- Frontend: `http://EC2_IP:3000`
- Database: PostgreSQL health check in docker-compose

## Scalability Considerations

### Current Limitations
- Single EC2 instance (no load balancing)
- Single PostgreSQL instance (no replication)
- No CDN for static assets

### Future Improvements
1. **Horizontal Scaling**: Add load balancer + multiple EC2 instances
2. **Database**: Implement read replicas or managed RDS
3. **Caching**: Add Redis for API responses
4. **CDN**: CloudFront for static assets
5. **Monitoring**: CloudWatch metrics and alarms
6. **Auto-scaling**: Based on CPU/memory usage

## Cost Optimization

### AWS Free Tier Usage
- **EC2**: t2.micro (750 hours/month free)
- **ECR**: 500 MB storage free
- **CodeBuild**: 100 build minutes/month free
- **Data Transfer**: 1 GB/month free

### Estimated Monthly Cost
- **Free Tier**: $0
- **After Free Tier**: ~$8-10/month (EC2 + storage)

## Backup & Recovery

### Database Backups
```bash
# Manual backup
docker exec auto-blog-db pg_dump -U bloguser autoblog > backup.sql

# Restore
docker exec -i auto-blog-db psql -U bloguser autoblog < backup.sql
```

### Disaster Recovery
1. Source code in GitHub (version controlled)
2. Docker images in ECR (tagged by commit)
3. Database backups (manual or automated)
4. Infrastructure as Code (buildspec.yml, docker-compose.yml)

## Performance Optimization

### Frontend
- Vite for fast builds
- Code splitting with React Router
- Nginx gzip compression
- Static asset caching (1 year)

### Backend
- PostgreSQL connection pooling
- Database indexes on frequently queried fields
- Efficient SQL queries
- Express middleware optimization

### Database
- Indexed `created_at` column for sorting
- Connection pool (max 20 connections)
- Query timeout limits

## Development Guidelines

### Local Development
1. Clone repository
2. Run `docker-compose up`
3. Access frontend at `http://localhost:3000`
4. Access backend at `http://localhost:5000`

### Testing
- Manual testing via Postman/curl
- Browser testing for frontend
- Database queries via psql client

### Deployment
1. Push code to GitHub
2. Trigger CodeBuild (manual or webhook)
3. SSH to EC2 and run deploy script
4. Verify application is running

## Troubleshooting

### Common Issues

**Container won't start**
```bash
docker-compose logs <service-name>
docker-compose restart <service-name>
```

**Database connection failed**
```bash
# Check if database is ready
docker exec auto-blog-db pg_isready -U bloguser
```

**ECR login failed**
```bash
# Re-authenticate
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_URI>
```

**Port already in use**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```
