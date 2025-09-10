#!/bin/bash

# Cloudflare Pages Deployment Script for Social Media Card Generator
# This script automates the deployment process to Cloudflare Pages

set -e  # Exit on any error

echo "🚀 Starting Cloudflare Pages deployment..."

# Check if required tools are installed
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ git is required but not installed. Aborting." >&2; exit 1; }

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building the project..."
npm run build

# Export static files (if using static export)
echo "📤 Exporting static files..."
npm run export 2>/dev/null || echo "ℹ️  Static export not configured, using standard build"

echo "✅ Build completed successfully!"
echo ""
echo "📋 Deployment Summary:"
echo "   - Build output: .next/ (or out/ for static export)"
echo "   - Build command: npm run build"
echo "   - Node version: $(node --version)"
echo "   - NPM version: $(npm --version)"
echo ""
echo "🔗 To deploy to Cloudflare Pages:"
echo "   1. Go to https://dash.cloudflare.com/pages"
echo "   2. Connect your GitHub repository"
echo "   3. Use these settings:"
echo "      - Build command: npm run build"
echo "      - Build output directory: .next"
echo "      - Node.js version: 18.x"
echo ""
echo "🎉 Ready for deployment!"
