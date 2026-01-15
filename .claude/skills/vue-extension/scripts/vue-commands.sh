#!/bin/bash
# Vue.js Common Commands Reference

# ============================================
# PROJECT CREATION
# ============================================

# Create Vue project with Vite (recommended)
npm create vue@latest my-app
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template vue-ts

# Create with pnpm
pnpm create vue@latest my-app
pnpm create vite my-app --template vue-ts

# Using Nuxt (SSR/SSG framework)
npx nuxi init my-nuxt-app

# ============================================
# DEVELOPMENT
# ============================================

# Start development server
npm run dev
pnpm dev

# Start with specific port
npm run dev -- --port 3000

# Start with host exposure
npm run dev -- --host

# ============================================
# BUILDING
# ============================================

# Build for production
npm run build
pnpm build

# Preview production build
npm run preview
pnpm preview

# Build with type checking
vue-tsc --noEmit && vite build

# ============================================
# TYPE CHECKING
# ============================================

# Type check (without emit)
vue-tsc --noEmit

# Type check and watch
vue-tsc --noEmit --watch

# ============================================
# LINTING & FORMATTING
# ============================================

# ESLint
npm run lint
npm run lint -- --fix

# Prettier
npm run format

# ============================================
# TESTING
# ============================================

# Run unit tests (Vitest)
npm run test
npm run test:unit
pnpm test

# Run tests with coverage
npm run test -- --coverage

# Run tests in watch mode
npm run test -- --watch

# Run e2e tests (Cypress)
npm run test:e2e
npx cypress open

# Run e2e tests (Playwright)
npx playwright test

# ============================================
# VUE CLI (Legacy - Vue 2/3)
# ============================================

# Install Vue CLI globally
npm install -g @vue/cli

# Create project with CLI
vue create my-project

# Add plugin to existing project
vue add router
vue add pinia
vue add vuetify

# Upgrade Vue CLI project
vue upgrade

# GUI project manager
vue ui

# ============================================
# NUXT COMMANDS (if using Nuxt)
# ============================================

# Development
npx nuxt dev

# Build for production
npx nuxt build

# Preview production
npx nuxt preview

# Generate static site
npx nuxt generate

# Add Nuxt module
npx nuxi module add @nuxt/image

# ============================================
# COMPONENT GENERATION
# ============================================

# Using vue-cli-service
vue generate component MyComponent
vue generate view MyView

# Using Plop or custom scripts
# npm run generate:component -- ComponentName

# ============================================
# DEPENDENCY MANAGEMENT
# ============================================

# Add Vue Router
npm install vue-router@4
pnpm add vue-router@4

# Add Pinia (state management)
npm install pinia
pnpm add pinia

# Add VueUse (composition utilities)
npm install @vueuse/core
pnpm add @vueuse/core

# Add UI library (examples)
npm install vuetify
npm install @headlessui/vue
npm install primevue

# ============================================
# PRODUCTION OPTIMIZATION
# ============================================

# Analyze bundle size
npm run build -- --mode analyze
npx vite-bundle-visualizer

# Build with SSR
npm run build:ssr

# ============================================
# ENVIRONMENT
# ============================================

# Run with specific environment
npm run build -- --mode production
npm run build -- --mode staging

# Check Vue version
npm list vue
