# Use the official Microsoft Dev Container base image for Node.js
FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

# Switch to root to install packages
USER root

# Install pnpm globally
RUN npm install -g pnpm@latest

# Set pnpm environment variables
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Create pnpm store directory with proper permissions
RUN mkdir -p /usr/local/share/pnpm-store && \
    chown -R node:node /usr/local/share/pnpm-store

# Install common development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    tree \
    && rm -rf /var/lib/apt/lists/*

# Switch back to the node user
USER node

# Configure pnpm as the node user
RUN pnpm config set store-dir /usr/local/share/pnpm-store && \
    pnpm config set auto-install-peers true && \
    pnpm config set strict-peer-dependencies false

# Verify pnpm installation
RUN pnpm --version