# Dockerfile for additional pnpm optimizations
FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

# Install pnpm globally
RUN npm install -g pnpm@latest

# Set pnpm store directory
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Create pnpm store directory
RUN mkdir -p /usr/local/share/pnpm-store

# Configure pnpm
RUN pnpm config set store-dir /usr/local/share/pnpm-store
RUN pnpm config set auto-install-peers true
RUN pnpm config set strict-peer-dependencies false

# Install common development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Set the default user
USER node