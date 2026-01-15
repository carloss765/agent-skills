#!/bin/bash
# Bun Common Commands Reference

# ============================================
# INSTALLATION
# ============================================

# Install Bun (macOS/Linux)
curl -fsSL https://bun.sh/install | bash

# Upgrade Bun
bun upgrade

# ============================================
# PROJECT INITIALIZATION
# ============================================

# Initialize new project
bun init

# Create from template
bun create react my-app
bun create next my-app
bun create vite my-app

# ============================================
# DEPENDENCY MANAGEMENT
# ============================================

# Install all dependencies
bun install

# Install with frozen lockfile (CI)
bun install --frozen-lockfile

# Add dependency
bun add package-name

# Add dev dependency
bun add -d package-name

# Add global package
bun add -g package-name

# Remove dependency
bun remove package-name

# Update dependencies
bun update

# Update specific package
bun update package-name

# ============================================
# RUNNING CODE
# ============================================

# Run TypeScript/JavaScript file directly
bun run index.ts
bun index.ts

# Run package.json script
bun run dev
bun dev

# Run with watch mode
bun --watch index.ts

# Run with hot reload
bun --hot index.ts

# ============================================
# BUILDING
# ============================================

# Build/bundle application
bun build ./src/index.ts --outdir ./dist

# Build for production (minified)
bun build ./src/index.ts --outdir ./dist --minify

# Build with source maps
bun build ./src/index.ts --outdir ./dist --sourcemap

# Build for specific target
bun build ./src/index.ts --target node
bun build ./src/index.ts --target browser
bun build ./src/index.ts --target bun

# ============================================
# TESTING
# ============================================

# Run tests
bun test

# Run specific test file
bun test ./tests/unit.test.ts

# Run tests with coverage
bun test --coverage

# Run tests in watch mode
bun test --watch

# ============================================
# PACKAGE EXECUTION (like npx)
# ============================================

# Execute package without installing
bunx create-react-app my-app
bunx eslint .

# ============================================
# PACKAGE MANAGEMENT
# ============================================

# View package info
bun pm ls

# Clear cache
bun pm cache rm

# View global packages
bun pm ls -g

# ============================================
# ENVIRONMENT
# ============================================

# Run with env file
bun --env-file=.env.local run dev

# Print environment info
bun --version
bun --revision
