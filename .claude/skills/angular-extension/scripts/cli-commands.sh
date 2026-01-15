#!/bin/bash
# Angular CLI Common Commands Reference

# ============================================
# PROJECT SETUP
# ============================================

# Create new Angular project
ng new my-app --routing --style=scss --strict

# Create new project with SSR
ng new my-app --ssr

# ============================================
# GENERATE COMPONENTS & SERVICES
# ============================================

# Generate component
ng generate component features/my-feature --standalone

# Generate service
ng generate service core/services/my-service

# Generate module with routing
ng generate module features/my-feature --routing

# Generate guard
ng generate guard core/guards/auth --implements=CanActivate

# Generate pipe
ng generate pipe shared/pipes/my-pipe

# Generate directive
ng generate directive shared/directives/my-directive

# Generate interceptor
ng generate interceptor core/interceptors/auth

# ============================================
# DEVELOPMENT
# ============================================

# Start development server
ng serve

# Start with specific port
ng serve --port 4201

# Start with proxy configuration
ng serve --proxy-config proxy.conf.json

# ============================================
# BUILD
# ============================================

# Build for production
ng build --configuration production

# Build with bundle analyzer
ng build --stats-json
npx webpack-bundle-analyzer dist/my-app/stats.json

# ============================================
# TESTING
# ============================================

# Run unit tests
ng test

# Run tests with coverage
ng test --code-coverage

# Run tests once (CI)
ng test --watch=false --browsers=ChromeHeadless

# Run e2e tests
ng e2e

# ============================================
# LINTING & FORMATTING
# ============================================

# Lint project
ng lint

# Lint and fix
ng lint --fix

# ============================================
# UPDATE & MAINTENANCE
# ============================================

# Check for updates
ng update

# Update Angular packages
ng update @angular/core @angular/cli

# Update all packages
ng update --all

# ============================================
# CACHE MANAGEMENT
# ============================================

# Clear Angular cache
ng cache clean

# Disable cache
ng cache disable
