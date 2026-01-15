---
name: html-development
description: Best practices for writing semantic, accessible, and performant HTML. Use when working with .html files or creating web page structure.
globs: ".html"
---

# HTML Development Skills

## When to Use This Skill

Use this skill when:
- Creating or modifying HTML documents (.html files)
- Building web page structure and layout
- Implementing accessible web content
- Working with HTML5 semantic elements
- Creating forms and interactive elements

## I. HTML Fundamentals

- **Semantic HTML**: Use elements that convey meaning (header, nav, main, article, section, footer).
- **Document Structure**: Always include proper DOCTYPE, html, head, and body elements.
- **Valid HTML**: Write valid, well-formed HTML. Use validators to check.
- **Accessibility First**: Build with accessibility in mind from the start.
- **Progressive Enhancement**: Ensure content works without JavaScript first.

## II. Document Structure

**Standard HTML5 Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav><!-- Navigation --></nav>
  </header>
  <main>
    <article><!-- Main content --></article>
  </main>
  <footer><!-- Footer --></footer>
  <script src="script.js"></script>
</body>
</html>
```

## III. Semantic Elements

**Layout Elements:**
- `<header>`: Introductory content or navigation
- `<nav>`: Navigation links
- `<main>`: Main content (only one per page)
- `<article>`: Self-contained content
- `<section>`: Thematic grouping of content
- `<aside>`: Tangentially related content
- `<footer>`: Footer for section or page

**Text Elements:**
- `<h1>` to `<h6>`: Headings (maintain hierarchy)
- `<p>`: Paragraphs
- `<blockquote>`: Quotations
- `<figure>` / `<figcaption>`: Images with captions
- `<code>` / `<pre>`: Code blocks
- `<mark>`: Highlighted text
- `<time>`: Dates and times

## IV. Accessibility (a11y)

- **Alt Text**: Always provide alt attributes for images
- **ARIA Labels**: Use aria-label, aria-labelledby when semantic HTML isn't enough
- **ARIA Roles**: Use roles to define purpose (role="button", role="navigation")
- **Skip Links**: Provide skip navigation links
- **Focus Management**: Ensure logical tab order
- **Form Labels**: Always associate labels with form inputs
- **Landmarks**: Use landmark roles for page regions

**Key ARIA Attributes:**
- `aria-label`: Accessible name
- `aria-labelledby`: References labeling element
- `aria-describedby`: References describing element
- `aria-hidden`: Hide from assistive technology
- `aria-expanded`: Expandable element state
- `aria-live`: Dynamic content announcements

## V. Forms

**Form Best Practices:**
- Always use `<label>` elements associated with inputs
- Group related inputs with `<fieldset>` and `<legend>`
- Use appropriate input types (email, tel, number, date)
- Provide helpful placeholder text
- Use autocomplete attributes appropriately
- Include validation and error messages

```html
<form action="/submit" method="POST">
  <fieldset>
    <legend>Contact Information</legend>

    <label for="name">Full Name</label>
    <input type="text" id="name" name="name" required
           autocomplete="name">

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required
           autocomplete="email">
  </fieldset>

  <button type="submit">Submit</button>
</form>
```

## VI. Images & Media

**Images:**
- Use `<img>` for content images, CSS for decorative
- Always include alt attribute
- Use srcset for responsive images
- Consider lazy loading for below-fold images

```html
<img src="image.jpg"
     alt="Description of image"
     loading="lazy"
     width="800"
     height="600"
     srcset="image-400.jpg 400w, image-800.jpg 800w"
     sizes="(max-width: 600px) 400px, 800px">
```

**Video & Audio:**
```html
<video controls poster="thumbnail.jpg">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
  Your browser does not support video.
</video>
```

## VII. Meta Tags & SEO

**Essential Meta Tags:**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Page description (150-160 chars)">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

## VIII. Links & Navigation

- Use descriptive link text (not "click here")
- Open external links in new tab with security attributes
- Use rel attributes appropriately
- Provide breadcrumb navigation

```html
<!-- External link -->
<a href="https://example.com"
   target="_blank"
   rel="noopener noreferrer">
  External Site
</a>

<!-- Download link -->
<a href="document.pdf" download>Download PDF</a>

<!-- Skip link -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

## IX. Tables

- Use tables for tabular data only
- Include proper headers with `<th>` and scope attribute
- Add caption for context
- Consider responsive strategies

```html
<table>
  <caption>Monthly Sales Data</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
    </tr>
  </tbody>
</table>
```

## X. Performance

- Minimize DOM depth
- Use lazy loading for images and iframes
- Preload critical resources
- Use async/defer for scripts
- Minimize inline styles and scripts

```html
<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="main.woff2" as="font" type="font/woff2" crossorigin>

<!-- Async/Defer scripts -->
<script src="analytics.js" async></script>
<script src="app.js" defer></script>

<!-- Lazy load iframe -->
<iframe src="video.html" loading="lazy"></iframe>
```

## XI. Common Patterns

**Good Patterns:**
- Semantic structure with proper heading hierarchy
- Accessible forms with labels
- Responsive images with srcset
- Progressive enhancement
- Clear document outline

**Anti-Patterns to Avoid:**
- Divs for everything (use semantic elements)
- Missing alt attributes
- Skipping heading levels
- Tables for layout
- Inline styles
- Missing form labels
- Auto-playing media

## XII. Best Practices Checklist

Before submitting HTML code, verify:
- [ ] Valid HTML (use W3C validator)
- [ ] Proper document structure
- [ ] Semantic elements used appropriately
- [ ] All images have alt attributes
- [ ] Forms have associated labels
- [ ] Heading hierarchy is correct
- [ ] Links are descriptive
- [ ] Language attribute set on html element
- [ ] Meta viewport tag included
- [ ] No accessibility errors (use axe or similar)
