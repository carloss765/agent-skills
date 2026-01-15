#!/bin/bash
# TypeScript Common Commands Reference

# ============================================
# COMPILATION
# ============================================

# Compile project using tsconfig.json
tsc

# Compile specific file
tsc file.ts

# Compile with specific config
tsc --project tsconfig.build.json
tsc -p tsconfig.build.json

# Compile and watch
tsc --watch
tsc -w

# ============================================
# TYPE CHECKING (without emitting)
# ============================================

# Type check only
tsc --noEmit

# Watch mode without emit
tsc --noEmit --watch

# ============================================
# OUTPUT OPTIONS
# ============================================

# Specify output directory
tsc --outDir ./dist

# Specify output file (bundle all)
tsc --outFile ./dist/bundle.js

# Generate declaration files
tsc --declaration
tsc -d

# Generate source maps
tsc --sourceMap

# ============================================
# TARGET & MODULE
# ============================================

# Compile to specific target
tsc --target ES2022
tsc -t ES2022

# Specify module system
tsc --module ESNext
tsc -m ESNext

# ============================================
# STRICT MODE OPTIONS
# ============================================

# Enable all strict options
tsc --strict

# Individual strict options
tsc --strictNullChecks
tsc --strictFunctionTypes
tsc --strictBindCallApply
tsc --strictPropertyInitialization
tsc --noImplicitAny
tsc --noImplicitThis

# ============================================
# INITIALIZATION
# ============================================

# Create tsconfig.json
tsc --init

# ============================================
# DEBUGGING & INFO
# ============================================

# Show help
tsc --help
tsc -h

# Show version
tsc --version
tsc -v

# Show configuration
tsc --showConfig

# List files that would be compiled
tsc --listFiles

# Show diagnostics
tsc --extendedDiagnostics

# ============================================
# PROJECT REFERENCES
# ============================================

# Build project references
tsc --build
tsc -b

# Build in watch mode
tsc --build --watch

# Force rebuild
tsc --build --force

# Clean build output
tsc --build --clean

# Verbose build
tsc --build --verbose

# ============================================
# TYPE ACQUISITION (for JS projects)
# ============================================

# Allow JavaScript files
tsc --allowJs

# Check JavaScript files
tsc --checkJs

# ============================================
# COMMON CONFIGURATIONS
# ============================================

# Development build
tsc --sourceMap --declaration --declarationMap

# Production build
tsc --removeComments --declaration

# Library build
tsc --declaration --declarationMap --emitDeclarationOnly

# ============================================
# NPXUSAGE
# ============================================

# Run TypeScript without installing
npx tsc --version

# Run with specific version
npx typescript@5.0 --version

# ============================================
# TYPE CHECKER UTILITIES
# ============================================

# Check single file with explicit config
npx tsc --noEmit --strict file.ts

# Generate type declaration for JS library
npx tsc --allowJs --declaration --emitDeclarationOnly lib.js
