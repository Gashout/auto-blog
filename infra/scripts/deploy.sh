#!/bin/bash

# EC2 Deployment Script for Auto-Generated Blog
# This script pulls the latest Docker images from ECR and restarts the services

set -e

echo "=========================================="
echo "Auto-Generated Blog - Deployment Script"
echo "=========================================="

# Configuration
AWS_REGION="ap-southeast-2"
AWS_ACCOUNT_ID="498628473785"
ECR_REGISTRY="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

echo "Step 1: Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

echo "Step 2: Pulling latest Docker images..."
docker pull $ECR_REGISTRY/auto-blog-backend:latest
docker pull $ECR_REGISTRY/auto-blog-frontend:latest

echo "Step 3: Stopping existing containers..."
docker-compose down || true

echo "Step 4: Starting new containers..."
docker-compose up -d

echo "Step 5: Checking container status..."
docker-compose ps

echo "Step 6: Cleaning up old images..."
docker image prune -f

echo "=========================================="
echo "✅ Deployment completed successfully!"
echo "=========================================="
echo ""
echo "Application URLs:"
echo "Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "Backend:  http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):5000"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f backend"
echo "  docker-compose logs -f frontend"
