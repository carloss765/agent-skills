# Contributing to Agent Skills Collection

First off, thank you for considering contributing to Agent Skills! It's people like you that make Agent Skills such a great tool.

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include the IDE/tool you're using** (Cursor, Claude Code, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List examples of how it would be used**

### Contributing New Skills

This is the most valuable contribution! Here's how to add a new skill:

#### 1. Check if the skill already exists

Search existing skills in `.claude/skills/` to avoid duplicates.

#### 2. Create the skill structure

```bash
mkdir -p .claude/skills/your-skill-name
touch .claude/skills/your-skill-name/SKILL.md
```

#### 3. Follow the standard format

```markdown
---
name: your-skill-name
description: Clear, concise description (used by agent to decide when to load)
globs: "*.ext" # Optional: file patterns
---

# Your Skill Name

## When to Use This Skill

- Clear condition 1
- Clear condition 2

## Instructions

1. Specific step 1
2. Specific step 2
3. Specific step 3

## Best Practices

- Practice 1
- Practice 2
```

#### 4. Quality Checklist

Before submitting:

- [ ] Description is clear and specific
- [ ] Instructions are actionable and numbered
- [ ] SKILL.md is under 500 lines
- [ ] Includes "When to Use This Skill" section
- [ ] Includes examples when relevant
- [ ] No typos or grammar issues
- [ ] Tested with at least one compatible IDE
- [ ] Follows existing skills' structure

#### 5. Submit a Pull Request

- Fork the repo
- Create a branch: `git checkout -b skill/your-skill-name`
- Commit your changes: `git commit -m "Add: [skill-name] - brief description"`
- Push to your fork: `git push origin skill/your-skill-name`
- Open a Pull Request with a clear description

### Improving Existing Skills

Found a way to improve an existing skill? Great!

1. Open an issue describing the improvement
2. Wait for discussion/approval
3. Make the changes
4. Submit a PR referencing the issue

### Documentation Improvements

Documentation is crucial! You can help by:

- Fixing typos or grammar
- Adding examples
- Clarifying confusing sections
- Translating to other languages
- Adding diagrams or visuals

## 📝 Style Guide

### SKILL.md Format

- Use markdown formatting consistently
- Use `**bold**` for emphasis, not ALL CAPS
- Use numbered lists for sequential steps
- Use bullet lists for unordered items
- Include code examples in fenced code blocks with language tags

### Naming Conventions

- Skill directories: `kebab-case-name/`
- Skill names in YAML: `kebab-case-name`
- File names: `SKILL.md` (capitalized), `references/` (lowercase), `scripts/` (lowercase)

### Writing Style

- Be concise and clear
- Use active voice
- Write in English for broader reach (translations welcome)
- Be inclusive in language
- Focus on "what to do" not "what not to do" (when possible)

## 🔍 Review Process

1. **Automated Checks**: GitHub Actions will run linting and validation
2. **Maintainer Review**: A maintainer will review your contribution
3. **Community Feedback**: Other contributors may provide input
4. **Approval**: Once approved, your PR will be merged
5. **Recognition**: Contributors are recognized in releases!

## 🏆 Recognition

Contributors will be:

- Listed in release notes
- Added to CONTRIBUTORS.md
- Credited in skill files (if applicable)
- Given a shoutout on social media (if desired)

## 💬 Questions?

Don't hesitate to ask questions:

- Open a [Discussion](../../discussions) for general questions
- Comment on relevant issues for specific questions
- Tag maintainers if you need attention

## 📜 License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to Agent Skills! 🎉
