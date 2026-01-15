#!/bin/bash
# pnpm Common Commands Reference

# ============================================
# INSTALLATION
# ============================================

# Install pnpm (via npm)
npm install -g pnpm

# Install pnpm (via corepack)
corepack enable
corepack prepare pnpm@latest --activate

# ============================================
# PROJECT INITIALIZATION
# ============================================

# Initialize new project
pnpm init

# Create workspace
# Create pnpm-workspace.yaml file

# ============================================
# DEPENDENCY MANAGEMENT
# ============================================

# Install all dependencies
pnpm install
pnpm i

# Frozen lockfile (CI/CD)
pnpm install --frozen-lockfile

# Install production only
pnpm install --prod

# Add dependency
pnpm add package-name

# Add dev dependency
pnpm add -D package-name

# Add optional dependency
pnpm add -O package-name

# Add peer dependency
pnpm add --save-peer package-name

# Add exact version
pnpm add -E package-name

# Add global package
pnpm add -g package-name

# Add to specific workspace
pnpm add package-name --filter workspace-name
pnpm add package-name -F workspace-name

# Remove package
pnpm remove package-name
pnpm rm package-name

# Update packages
pnpm update
pnpm up

# Update interactive
pnpm up -i

# Update to latest
pnpm up --latest

# ============================================
# WORKSPACE COMMANDS
# ============================================

# Install all workspace dependencies
pnpm -r install

# Run script in all workspaces
pnpm -r run build
pnpm --recursive run build

# Run script in specific workspace
pnpm --filter package-name run build
pnpm -F package-name run build

# Run in parallel
pnpm -r --parallel run build

# Filter by directory
pnpm --filter ./packages/* run build

# Filter by dependencies
pnpm --filter ...package-name run build

# ============================================
# SCRIPTS
# ============================================

# Run script
pnpm run script-name
pnpm script-name

# Run start script
pnpm start

# Run test script
pnpm test

# Execute command in all packages
pnpm -r exec command

# ============================================
# PACKAGE INFO
# ============================================

# List installed packages
pnpm list
pnpm ls

# List with depth
pnpm list --depth 0

# List global packages
pnpm list -g

# Why is package installed?
pnpm why package-name

# View package info
pnpm view package-name

# ============================================
# SECURITY & AUDITING
# ============================================

# Security audit
pnpm audit

# Fix vulnerabilities
pnpm audit --fix

# ============================================
# STORE MANAGEMENT
# ============================================

# Prune store (remove unreferenced packages)
pnpm store prune

# View store path
pnpm store path

# Check store status
pnpm store status

# Add package to store
pnpm store add package-name

# ============================================
# PUBLISHING
# ============================================

# Publish package
pnpm publish

# Publish with access
pnpm publish --access public

# Preview what will be published
pnpm pack

# ============================================
# CONFIGURATION
# ============================================

# View config
pnpm config list

# Set config
pnpm config set key value

# Get config value
pnpm config get store-dir

# ============================================
# LINK & DEVELOPMENT
# ============================================

# Link package
pnpm link --global

# Link to global package
pnpm link --global package-name

# Unlink
pnpm unlink

# ============================================
# EXECUTION (like npx)
# ============================================

# Execute package
pnpm dlx package-name

# Execute with arguments
pnpm dlx create-react-app my-app

# ============================================
# IMPORT & MIGRATION
# ============================================

# Import from package-lock.json
pnpm import

# ============================================
# TROUBLESHOOTING
# ============================================

# Rebuild native modules
pnpm rebuild

# Clear cache
pnpm store prune

# Force reinstall
pnpm install --force

# Check for issues
pnpm doctor
