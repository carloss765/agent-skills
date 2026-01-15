---
name: npm-package-manager
description: Guidelines for using npm as a package manager, focusing on security, dependency management, and standard workflows for traditional Node.js projects.
globs:
  - "package-lock.json"
  - "package.json"
  - ".npmrc"
alwaysApply: false
---

# I. Core npm Principles

- Lockfile Discipline: Always commit package-lock.json. Never manually edit it.
- Semantic Versioning: Understand and respect semver (^, ~, exact versions) in package.json.
- Clean Install: Use npm ci in CI/CD environments for reproducible, faster installs.
- Security First: Regularly run npm audit and address vulnerabilities promptly.
- npm Version Awareness: Use npm >= 7 for modern features (workspaces, peer dependency auto-install).

# II. Installation & Dependency Management

- Explicit Install Commands: Use npm install <pkg> --save or --save-dev explicitly.
- Exact Versions for Critical Deps: Use --save-exact for packages where version stability is crucial.
- Peer Dependencies: Declare peer dependencies in package.json with appropriate version ranges.
- Optional Dependencies: Use optionalDependencies for packages that enhance but aren't required.
- Avoid npm install -g: Minimize global installations. Use npx for one-off CLI executions.

# III. Workspace Support (npm >= 7)

- Workspace Definition: Define workspaces array in root package.json for monorepo structure.
- Workspace Commands: Use -w or --workspace flags to target specific packages.
- Workspace Install: Run npm install at root to install all workspace dependencies.
- Cross-Package Dependencies: Reference workspace packages using workspace: protocol.
- Workspace Scripts: Execute scripts across workspaces using npm run <script> --workspaces.

# IV. Scripts & Lifecycle Hooks

- Standard Script Names: Use conventional names (start, test, build, dev, lint).
- Lifecycle Hooks: Understand and use pre/post hooks when necessary (preinstall, postbuild).
- Script Chaining: Chain commands using && for sequential execution or & for parallel.
- Environment Variables: Use cross-env for cross-platform environment variable setting.
- Script Documentation: Document complex scripts in README or add comments in package.json.

# V. Configuration & Registry

- .npmrc Configuration: Use .npmrc for project-specific npm configuration.
- Registry Management: Configure private registries using registry or scoped registry settings.
- Authentication: Use npm login or configure authToken in .npmrc for private registries.
- Scope Configuration: Set default scope for organization packages (@org:registry).
- Save Prefix: Configure save-prefix to control default version prefix (^, ~, or empty).

# VI. Security & Auditing

- Regular Audits: Run npm audit regularly to identify vulnerabilities.
- Automatic Fixes: Use npm audit fix to automatically update vulnerable dependencies.
- Manual Review: Review npm audit fix --force carefully as it may introduce breaking changes.
- Package Verification: Use npm view <pkg> to inspect package details before installing.
- Dependency Scanning: Integrate npm audit into CI/CD pipeline for continuous security checks.

# VII. Publishing & Version Management

- Semantic Versioning: Follow semver strictly (MAJOR.MINOR.PATCH).
- Version Bumping: Use npm version [major|minor|patch] to update version and create git tags.
- Pre-Release Versions: Use version suffixes (-alpha, -beta, -rc) for pre-releases.
- npm Publish: Use npm publish with appropriate --access flag (public or restricted).
- Publish Verification: Test published packages using npm pack before publishing.

# VIII. Common Commands Reference

- npm install: Install all dependencies from package.json
- npm ci: Clean install from package-lock.json (CI/CD preferred)
- npm update: Update packages within semver constraints
- npm outdated: List outdated packages
- npm list: Display dependency tree
- npm audit: Check for security vulnerabilities
- npm fund: Display funding information for dependencies
- npm run <script>: Execute defined script from package.json

# IX. Troubleshooting & Debugging

- Clear Cache: Run npm cache clean --force to resolve corrupted cache issues.
- Rebuild Native Modules: Use npm rebuild to recompile native addons.
- Lockfile Sync: Delete node_modules and package-lock.json, then run npm install for clean state.
- Verbose Logging: Use npm install --verbose for detailed installation logs.
- Debug Mode: Set NODE_DEBUG=npm or use --loglevel=silly for maximum debugging information.
