---
name: css-development
description: Best practices for writing maintainable, performant, and scalable CSS. Use when working with .css, .scss, .sass, or .less files, or when styling web applications.
globs: ".css"
---

# CSS Development Skills

## When to Use This Skill

Use this skill when:
- Writing or refactoring CSS stylesheets (.css, .scss, .sass, .less files)
- Creating responsive layouts and designs
- Implementing animations and transitions
- Optimizing CSS performance
- Working with CSS frameworks or methodologies

## I. CSS Fundamentals & Best Practices

- **Mobile First**: Start with mobile styles, add complexity with min-width media queries.
- **Semantic Naming**: Use descriptive class names that convey purpose, not appearance.
- **Avoid !important**: Use specific selectors instead. Reserve !important for utilities only.
- **Single Responsibility**: Each class should do one thing well.
- **Cascade Awareness**: Understand specificity and cascade. Don't fight them.
- **Comments**: Document complex selectors, magic numbers, and browser-specific hacks.

## II. Naming Conventions & Methodologies

**BEM (Block Element Modifier):**
```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card__header--large { }
```

**Other Methodologies:**
- **SMACSS**: Base, Layout, Module, State, Theme
- **OOCSS**: Separate structure from skin, container from content
- **ITCSS**: Inverted Triangle CSS (Settings, Tools, Generic, Elements, Objects, Components, Utilities)
- **Utility-First**: Atomic CSS classes (Tailwind approach)

**Consistency**: Choose one methodology and stick with it across the project.

## III. Selectors & Specificity

- **Low Specificity**: Keep specificity low for easier overrides.
- **Avoid IDs**: Use classes for styling, IDs for JavaScript hooks.
- **Avoid Deep Nesting**: Limit nesting to 3 levels maximum.
- **Child Combinators**: Use direct child selector (>) to limit scope.
- **Attribute Selectors**: Use for state-based styling `[aria-expanded="true"]`.
```css
/* Good - Low specificity, clear intent */
.button { }
.button--primary { }
.button[disabled] { }

/* Bad - High specificity, hard to override */
div#container .content ul li a.link { }
```

**Specificity Hierarchy:**
1. Inline styles (avoid)
2. IDs (avoid for styling)
3. Classes, attributes, pseudo-classes
4. Elements, pseudo-elements

## IV. Layout Techniques

**Flexbox:**
- Use for one-dimensional layouts (row or column)
- Perfect for component-level layouts
- Great for alignment and distribution
```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

**Grid:**
- Use for two-dimensional layouts
- Perfect for page-level layouts
- Powerful for complex grid systems
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

**Best Practices:**
- Use Flexbox for components, Grid for layouts
- Use `gap` property instead of margins between items
- Avoid fixed heights; let content determine height
- Use `fr` units in Grid for flexible sizing

## V. Responsive Design

**Mobile-First Approach:**
```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 16px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

**Breakpoint Guidelines:**
- **320px**: Small mobile
- **768px**: Tablet
- **1024px**: Desktop
- **1440px**: Large desktop

**Responsive Techniques:**
- Use relative units (rem, em, %, vh, vw)
- Use clamp() for fluid typography
- Use aspect-ratio for maintaining proportions
- Use container queries for component-responsive design
```css
/* Fluid typography */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Container queries */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## VI. Typography

- **System Fonts**: Use system font stack for performance
- **Font Loading**: Use font-display: swap to prevent FOIT
- **Line Height**: Use unitless line-height (1.5, not 1.5rem)
- **Measure**: Limit line length to 45-75 characters for readability
- **Hierarchy**: Establish clear typographic hierarchy
- **Scale**: Use modular scale for font sizes
```css
:root {
  /* Type scale */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;

  /* Line heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}
```

## VII. Colors & Theming

**CSS Custom Properties (Variables):**
```css
:root {
  /* Color palette */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-primary-light: #60a5fa;

  --color-neutral-50: #f9fafb;
  --color-neutral-900: #111827;

  /* Semantic colors */
  --color-text: var(--color-neutral-900);
  --color-background: var(--color-neutral-50);
  --color-border: var(--color-neutral-200);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: var(--color-neutral-50);
    --color-background: var(--color-neutral-900);
  }
}

/* Theme class */
[data-theme="dark"] {
  --color-text: var(--color-neutral-50);
  --color-background: var(--color-neutral-900);
}
```

**Color Best Practices:**
- Use HSL for easier color manipulation
- Define semantic color names, not descriptive (--color-primary, not --color-blue)
- Ensure sufficient contrast (WCAG AA: 4.5:1 for text)
- Support both light and dark modes

## VIII. Spacing & Sizing

**Consistent Spacing Scale:**
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
}

.card {
  padding: var(--space-4);
  margin-bottom: var(--space-6);
  gap: var(--space-3);
}
```

- **Use rem for Spacing**: Relative to root font-size
- **Use em for Component Spacing**: Relative to component font-size
- **Avoid Magic Numbers**: Use variables for all spacing values
- **Consistent Scale**: Use 4px or 8px base scale

## IX. Animations & Transitions

**Transitions:**
```css
.button {
  background-color: var(--color-primary);
  transition: background-color 200ms ease-in-out;
}

.button:hover {
  background-color: var(--color-primary-dark);
}
```

**Animations:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: fadeIn 300ms ease-out;
}
```

**Best Practices:**
- Animate only transform and opacity for best performance
- Use will-change sparingly for performance hints
- Respect prefers-reduced-motion
- Keep animations short (200-400ms)
- Use cubic-bezier for custom easing
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## X. CSS Architecture & Organization

**File Structure:**
```
styles/
├── abstracts/        # Variables, mixins, functions
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── base/             # Reset, typography, base elements
│   ├── _reset.scss
│   └── _typography.scss
├── components/       # Component styles
│   ├── _button.scss
│   ├── _card.scss
│   └── _modal.scss
├── layout/           # Layout components
│   ├── _header.scss
│   ├── _footer.scss
│   └── _grid.scss
├── pages/            # Page-specific styles
├── utilities/        # Utility classes
│   └── _utilities.scss
└── main.scss         # Main file that imports all
```

**Import Order:**
1. Abstracts (variables, mixins)
2. Base styles
3. Layout
4. Components
5. Pages
6. Utilities

## XI. Performance Optimization

- **Minimize CSS**: Use CSS minification in production
- **Critical CSS**: Inline critical above-the-fold CSS
- **Remove Unused CSS**: Use PurgeCSS or similar tools
- **Avoid @import**: Use build tool concatenation instead
- **CSS Containment**: Use contain property for isolated components
- **Reduce Repaints**: Avoid changing layout-affecting properties frequently
```css
/* CSS Containment */
.card {
  contain: layout style paint;
}

/* Content-visibility for performance */
.expensive-component {
  content-visibility: auto;
}
```

## XII. Preprocessors (Sass/SCSS)

**Nesting:**
```scss
// Good - Shallow nesting
.card {
  padding: 1rem;

  &__header {
    font-weight: bold;
  }

  &--featured {
    border: 2px solid gold;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

// Bad - Deep nesting
.nav {
  ul {
    li {
      a {
        span {
          // Too deep!
        }
      }
    }
  }
}
```

**Mixins:**
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

.centered-box {
  @include flex-center;

  @include respond-to(768px) {
    padding: 2rem;
  }
}
```

**Best Practices:**
- Limit nesting to 3 levels
- Use mixins for repeated patterns
- Use functions for calculations
- Organize partials logically

## XIII. Modern CSS Features

**Custom Properties:**
- Dynamic values that can change at runtime
- Inherit down the DOM tree
- Can be manipulated with JavaScript

**Logical Properties:**
```css
/* Old way */
.element {
  margin-left: 1rem;
  padding-right: 2rem;
}

/* New way - RTL friendly */
.element {
  margin-inline-start: 1rem;
  padding-inline-end: 2rem;
}
```

**Container Queries:**
```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**CSS Grid Subgrid:**
```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  display: grid;
  grid-template-columns: subgrid;
}
```

## XIV. Accessibility in CSS

- **Focus Styles**: Always provide visible focus indicators
- **Color Contrast**: Ensure WCAG AA compliance (4.5:1 for text)
- **Hidden Content**: Use proper techniques for screen readers
- **Reduced Motion**: Respect prefers-reduced-motion
- **Keyboard Navigation**: Ensure interactive elements are keyboard accessible
```css
/* Visible focus indicator */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip to main content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-background);
  color: var(--color-text);
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

## XV. Common Patterns & Anti-Patterns

**Good Patterns:**
- Utility classes for common patterns
- Component-based architecture
- CSS custom properties for theming
- Mobile-first responsive design
- Semantic class names

**Anti-Patterns to Avoid:**
- Overly specific selectors
- !important overuse
- Magic numbers without variables
- Deep nesting (>3 levels)
- Inline styles
- Non-semantic class names (.red-text, .mt-10)
- Fixed widths and heights everywhere
- Pixel-based media queries

## XVI. Best Practices Checklist

Before submitting CSS code, verify:
- [ ] Mobile-first approach used
- [ ] Consistent naming convention applied
- [ ] No !important (except utilities)
- [ ] Specificity kept low
- [ ] Custom properties for theming
- [ ] Accessible focus states
- [ ] Color contrast meets WCAG AA
- [ ] Animations respect prefers-reduced-motion
- [ ] No unused CSS
- [ ] Code formatted and linted
