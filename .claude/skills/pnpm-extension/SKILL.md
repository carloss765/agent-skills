---
name: pnpm-package-manager
description: Best practices and guidelines for using pnpm as the primary package manager, emphasizing workspace management, dependency optimization, and efficient monorepo operations.
globs:
  - "pnpm-lock.yaml"
  - "pnpm-workspace.yaml"
  - ".npmrc"
  - "package.json"
alwaysApply: false
---

# I. Core pnpm Principles

- Prefer pnpm Over Other Managers: Use pnpm as the default package manager for superior disk space efficiency and strict dependency resolution.
- Workspace-First Approach: Leverage pnpm workspaces for monorepo management. Define workspaces in pnpm-workspace.yaml.
- Strict Dependency Resolution: Embrace pnpm's strict linking model. Avoid hoisting unless absolutely necessary.
- Lockfile Integrity: Always commit pnpm-lock.yaml. Never manually edit it. Use pnpm install to regenerate.
- Consistent Node Version: Define node version in package.json engines field and use .nvmrc or .node-version files.

# II. Installation & Dependency Management

- Explicit Dependencies: Install packages with exact intent (--save-prod, --save-dev, --save-optional).
- Workspace Protocol: Use workspace:* protocol for internal package dependencies in monorepos.
- Avoid Global Installs: Minimize global packages. Use npx or pnpm dlx for CLI tools when possible.
- Peer Dependencies: Declare peer dependencies explicitly. Use pnpm's auto-install-peers carefully.
- Clean Installs: Use pnpm install --frozen-lockfile in CI/CD to ensure reproducible builds.

# III. Workspace Configuration

- Workspace Definition: Define all workspace packages in pnpm-workspace.yaml with clear glob patterns.
- Shared Dependencies: Hoist common dependencies to root when beneficial for version consistency.
- Workspace Commands: Use pnpm -r (recursive) or --filter flags for targeted workspace operations.
- Workspace Linking: Understand that pnpm creates symlinks between workspace packages automatically.
- Version Management: Use pnpm's built-in versioning or tools like changesets for monorepo versioning.

# IV. Scripts & Task Running

- Parallel Execution: Leverage pnpm -r --parallel for independent tasks across workspaces.
- Filtered Execution: Use --filter flag to run scripts in specific packages or based on changes.
- Script Naming: Follow consistent naming conventions (dev, build, test, lint, format).
- Pre/Post Hooks: Utilize pre and post script hooks sparingly. Keep scripts simple and explicit.
- Task Dependencies: Define script dependencies clearly using && or tools like npm-run-all.

# V. Configuration Best Practices

- .npmrc Configuration: Define pnpm-specific settings in .npmrc (shamefully-hoist, strict-peer-dependencies, etc.).
- Store Directory: Configure store-dir if needed for custom pnpm store location.
- Public Hoist Pattern: Use public-hoist-pattern cautiously only for packages requiring hoisting.
- Registry Configuration: Set registry URLs in .npmrc for private registries or mirrors.
- Auto Install Peers: Set auto-install-peers=false for explicit control over peer dependencies.

# VI. Performance Optimization

- Frozen Lockfile: Use --frozen-lockfile flag in CI to skip lockfile updates and speed up installs.
- Prefer Offline: Use --prefer-offline to prioritize local cache when network is slow.
- Store Path: Consider using a shared pnpm store across projects to save disk space.
- Prune Strategy: Regularly run pnpm store prune to remove unreferenced packages.
- Parallel Workers: Configure network-concurrency for optimal concurrent downloads.

# VII. Common Commands Reference

- pnpm install: Install all dependencies from package.json
- pnpm add <pkg>: Add dependency to current package
- pnpm remove <pkg>: Remove dependency from current package
- pnpm update: Update dependencies according to version ranges
- pnpm list: List installed packages and their dependencies
- pnpm why <pkg>: Explain why a package is installed
- pnpm audit: Check for known security vulnerabilities
- pnpm -r exec <cmd>: Execute command in each workspace package

# VIII. Troubleshooting & Debugging

- Clear Cache: Run pnpm store prune when experiencing unexplained issues.
- Verify Installation: Use pnpm list to verify package installation structure.
- Check Links: Inspect node_modules/.pnpm for symlink structure understanding.
- Lockfile Conflicts: Resolve merge conflicts by running pnpm install after merge.
- Peer Dependency Issues: Use pnpm why to understand dependency resolution paths.
