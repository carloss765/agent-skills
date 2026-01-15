#!/bin/bash
# npm Common Commands Reference

# ============================================
# PROJECT INITIALIZATION
# ============================================

# Initialize new project
npm init

# Initialize with defaults
npm init -y

# Initialize scoped package
npm init --scope=@myorg

# ============================================
# DEPENDENCY MANAGEMENT
# ============================================

# Install all dependencies
npm install
npm i

# Clean install (CI/CD)
npm ci

# Install production dependencies
npm install package-name
npm i package-name

# Install dev dependencies
npm install package-name --save-dev
npm i -D package-name

# Install exact version
npm install package-name --save-exact
npm i -E package-name

# Install global package
npm install -g package-name

# Install specific version
npm install package-name@1.2.3
npm install package-name@latest
npm install package-name@next

# Remove package
npm uninstall package-name
npm un package-name

# Update packages
npm update
npm update package-name

# ============================================
# PACKAGE INFO
# ============================================

# List installed packages
npm list
npm ls

# List with depth
npm list --depth=0

# List global packages
npm list -g --depth=0

# View package info
npm view package-name
npm info package-name

# Check outdated packages
npm outdated

# Why is package installed?
npm explain package-name
npm why package-name

# ============================================
# SCRIPTS
# ============================================

# Run script
npm run script-name
npm run dev
npm run build
npm run test

# Run start script
npm start

# Run test script
npm test
npm t

# List available scripts
npm run

# ============================================
# SECURITY & AUDITING
# ============================================

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force

# Audit report only
npm audit --json
npm audit --parseable

# ============================================
# PUBLISHING
# ============================================

# Login to npm
npm login

# Logout
npm logout

# Publish package
npm publish

# Publish scoped public package
npm publish --access public

# Preview what will be published
npm pack

# Unpublish (use with caution)
npm unpublish package-name@1.0.0

# ============================================
# VERSION MANAGEMENT
# ============================================

# Bump version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Pre-release versions
npm version prerelease
npm version preminor
npm version premajor

# View version
npm version

# ============================================
# CACHE MANAGEMENT
# ============================================

# Verify cache
npm cache verify

# Clean cache
npm cache clean --force

# Cache location
npm config get cache

# ============================================
# CONFIGURATION
# ============================================

# View config
npm config list
npm config list -l

# Set config
npm config set key value
npm config set init-author-name "Your Name"

# Get config value
npm config get registry

# Delete config
npm config delete key

# Edit config file
npm config edit

# ============================================
# WORKSPACES (npm 7+)
# ============================================

# Install all workspace dependencies
npm install --workspaces
npm i -ws

# Run script in all workspaces
npm run build --workspaces
npm run build -ws

# Run script in specific workspace
npm run build --workspace=packages/my-package
npm run build -w packages/my-package

# Install in specific workspace
npm install lodash -w packages/my-package

# ============================================
# LINK & DEVELOPMENT
# ============================================

# Link package globally
npm link

# Link to global package
npm link package-name

# Unlink package
npm unlink package-name

# ============================================
# TROUBLESHOOTING
# ============================================

# View npm root
npm root
npm root -g

# View npm prefix
npm prefix

# Rebuild native modules
npm rebuild

# Check npm doctor
npm doctor

# Verbose mode
npm install --verbose

# Debug mode
npm install --loglevel=silly
