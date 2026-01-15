---
name: bun-package-manager
description: Modern package manager and runtime guidelines for Bun, emphasizing speed, built-in tooling, and compatibility while leveraging Bun's unique features.
globs:
  - "bun.lockb"
  - "bunfig.toml"
  - "package.json"
alwaysApply: false
---

# I. Core Bun Principles

- Speed First: Leverage Bun's exceptional speed for installs, runs, and builds.
- Built-in Tooling: Use Bun's native bundler, test runner, and transpiler instead of external tools when possible.
- Drop-in Replacement: Understand that Bun is designed as a drop-in replacement for Node.js and npm/yarn/pnpm.
- Binary Lockfile: Commit bun.lockb (binary format) for faster parsing and smaller size.
- Native Performance: Take advantage of Bun's native code execution and optimized APIs.

# II. Installation & Dependency Management

- Bun Install: Use bun install for ultra-fast dependency installation.
- Bun Add: Use bun add <pkg> for adding dependencies (auto-detects dev vs prod).
- Bun Remove: Use bun remove <pkg> to cleanly remove packages.
- Global Packages: Use bun install -g <pkg> for global installations.
- Trusted Dependencies: Use --trust flag for packages with lifecycle scripts.

# III. Running & Executing Code

- Bun Run: Execute scripts using bun run <script> or simply bun <script>.
- Direct Execution: Run files directly with bun <file.ts> without transpilation step.
- TypeScript Native: Write TypeScript without additional configuration or build steps.
- JSX Support: Use JSX directly without Babel or other transpilers.
- Watch Mode: Use bun --watch <file> for automatic reloading during development.

# IV. Built-in Features & Tools

- Bun Test: Use built-in test runner with bun test (Jest-compatible API).
- Bun Build: Utilize native bundler with bun build for production builds.
- Hot Reloading: Leverage --hot flag for hot module reloading.
- Environment Variables: Use Bun.env instead of process.env for better performance.
- SQLite Built-in: Use bun:sqlite for embedded database without external dependencies.

# V. Configuration (bunfig.toml)

- Project Configuration: Create bunfig.toml for Bun-specific project settings.
- Install Settings: Configure install behavior (registry, lockfile, cache).
- Test Configuration: Define test patterns, timeout, and preload files.
- Dev Settings: Configure development server, hot reload, and watch patterns.
- Build Options: Set bundler defaults, target, minification, and source maps.

# VI. Workspace Support

- Workspace Definition: Define workspaces in package.json (same as npm/pnpm).
- Workspace Install: Run bun install at root for all workspace packages.
- Workspace Commands: Use --filter flag to target specific workspace packages.
- Fast Workspace Linking: Benefit from Bun's optimized workspace symlink creation.
- Workspace Scripts: Execute across workspaces with bun run --filter <pattern> <script>.

# VII. Performance Optimization

- Parallel Installs: Bun automatically parallelizes installs maximally.
- Global Cache: Utilize Bun's global cache for shared dependencies across projects.
- Binary Lockfile: Leverage bun.lockb's binary format for instant parsing.
- Minimal Transpilation: Reduce build times by running TypeScript/JSX directly.
- Native APIs: Use Bun's native APIs (Bun.file, Bun.serve) for better performance.

# VIII. Compatibility & Migration

- Node.js Compatibility: Most Node.js code runs without changes in Bun.
- npm Package Support: Install and use npm packages normally.
- Lockfile Import: Bun can read package-lock.json and yarn.lock files.
- Gradual Migration: Migrate incrementally by running specific scripts with Bun.
- Fallback Strategy: Keep Node.js available for packages with native modules incompatibility.

# IX. Common Commands Reference

- bun install: Install all dependencies
- bun add <pkg>: Add dependency
- bun remove <pkg>: Remove dependency
- bun update: Update dependencies
- bun run <script>: Execute package.json script
- bun <file>: Run TypeScript/JavaScript file directly
- bun test: Run tests with built-in test runner
- bun build <entry>: Bundle application for production
- bunx <pkg>: Execute package without installing (like npx)

# X. Troubleshooting & Debugging

- Cache Clear: Run bun pm cache rm to clear global cache.
- Verbose Mode: Use --verbose flag for detailed operation logs.
- Trust Issues: Add --trust flag if lifecycle scripts are blocked.
- Native Module Issues: Some native modules may not work; use Node.js as fallback.
- Check Compatibility: Visit bun.sh/docs/runtime/nodejs-apis for Node.js API compatibility status.
