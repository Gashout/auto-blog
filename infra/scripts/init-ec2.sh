#!/bin/bash

# EC2 Instance Initialization Script
# Run this script once on a new EC2 instance to set up the environment

set -e

echo "=========================================="
echo "EC2 Instance Initialization"
echo "=========================================="

# Update system packages
echo "Step 1: Updating system packages..."
sudo yum update -y

# Install Docker
echo "Step 2: Installing Docker..."
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
echo "Step 3: Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install AWS CLI (if not already installed)
echo "Step 4: Checking AWS CLI..."
if ! command -v aws &> /dev/null; then
    echo "Installing AWS CLI..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    rm -rf aws awscliv2.zip
else
    echo "AWS CLI already installed"
fi

# Install Git
echo "Step 5: Installing Git..."
sudo yum install -y git

# Install PostgreSQL client (optional, for debugging)
echo "Step 6: Installing PostgreSQL client..."
sudo yum install -y postgresql15

# Create application directory
echo "Step 7: Creating application directory..."
mkdir -p ~/auto-blog
cd ~/auto-blog

echo "=========================================="
echo "✅ EC2 Instance initialized successfully!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Log out and log back in for Docker group changes to take effect"
echo "2. Clone your repository: git clone <your-repo-url>"
echo "3. Configure AWS credentials if needed"
echo "4. Run the deployment script: ./infra/scripts/deploy.sh"
