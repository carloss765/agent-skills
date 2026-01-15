---
name: javascript-development
description: Best practices and guidelines for writing clean, modern, and maintainable JavaScript code. Use when working with .js files, Node.js applications, or frontend JavaScript development.
globs: ".js"
---

# JavaScript Development Skills

## When to Use This Skill

Use this skill when:
- Writing or refactoring JavaScript code (.js files)
- Developing Node.js applications or server-side JavaScript
- Creating frontend JavaScript applications
- Working with modern ES6+ features
- Debugging JavaScript code or performance issues

## I. Modern JavaScript Principles

- **ES6+ First**: Always use modern JavaScript syntax (let/const, arrow functions, destructuring, template literals).
- **Const by Default**: Use const for variables that won't be reassigned. Use let only when reassignment is necessary. Avoid var entirely.
- **Arrow Functions**: Prefer arrow functions for callbacks and function expressions. Use traditional functions for methods and when this binding matters.
- **Template Literals**: Use template literals for string interpolation instead of concatenation.
- **Destructuring**: Use destructuring for object and array extraction to improve readability.
- **Spread/Rest Operators**: Leverage spread (...) for array/object copying and rest parameters.

## II. Code Structure & Organization

- **Module System**: Use ES6 modules (import/export) for code organization. Avoid CommonJS except in Node.js contexts where required.
- **Single Responsibility**: Each function should do one thing well. Keep functions small (ideally under 20 lines).
- **File Organization**: Group related functions in modules. Export only what's necessary.
- **Naming Conventions**: Use camelCase for variables and functions, PascalCase for classes and constructors, UPPER_CASE for constants.
- **Avoid Global Scope**: Never pollute global scope. Use modules, IIFEs, or block scope to encapsulate code.

## III. Asynchronous Programming

- **Async/Await Over Promises**: Prefer async/await for cleaner asynchronous code. Use .then() chains sparingly.
- **Error Handling**: Always use try/catch with async/await. Handle promise rejections explicitly.
- **Promise.all for Parallel**: Use Promise.all() for concurrent independent operations.
- **Avoid Callback Hell**: Convert callback-based APIs to promises or use promisify utilities.
- **Handle Race Conditions**: Be mindful of timing issues in async operations.

## IV. Functions & Methods

- **Pure Functions**: Strive for pure functions that don't mutate inputs or cause side effects.
- **Default Parameters**: Use default parameter syntax instead of manual checks.
- **Rest Parameters**: Use rest parameters (...args) instead of arguments object.
- **Return Early**: Use guard clauses and early returns to reduce nesting.
- **Method Chaining**: Design APIs that support method chaining when appropriate.

## V. Objects & Arrays

- **Object Shorthand**: Use property shorthand and computed property names.
- **Array Methods**: Use map, filter, reduce, find, some, every instead of loops when appropriate.
- **Immutability**: Avoid mutating objects and arrays. Use spread operator or methods that return new instances.
- **Optional Chaining**: Use optional chaining (?.) to safely access nested properties.
- **Nullish Coalescing**: Use ?? operator for default values (distinct from ||).

## VI. Error Handling

- **Custom Error Classes**: Extend Error class for domain-specific errors.
- **Meaningful Error Messages**: Provide context and actionable information in error messages.
- **Fail Fast**: Validate inputs early and throw errors for invalid states.
- **Don't Swallow Errors**: Always handle or propagate errors. Never use empty catch blocks.
- **Error Boundaries**: In frontend apps, implement error boundaries to prevent full app crashes.

## VII. Performance Considerations

- **Avoid Premature Optimization**: Focus on clean code first. Optimize only when measured bottlenecks exist.
- **Debounce/Throttle**: Use debouncing and throttling for event handlers and expensive operations.
- **Lazy Loading**: Load modules and resources on demand when appropriate.
- **Memoization**: Cache expensive computation results when applicable.
- **Efficient Loops**: Be mindful of loop complexity. Avoid nested loops with large datasets.

## VIII. Common Patterns & Anti-Patterns

**Good Patterns:**
- Factory functions for object creation
- Module pattern for encapsulation
- Observer pattern for event handling
- Composition over inheritance

**Anti-Patterns to Avoid:**
- Modifying prototypes of built-in objects
- Using == instead of === (always use strict equality)
- Excessive use of this (prefer functional approaches)
- Deeply nested callbacks or promise chains
- Magic numbers and strings (use named constants)

## IX. Testing & Debugging

- **Write Testable Code**: Functions with clear inputs/outputs are easier to test.
- **Console Methods**: Use console.table, console.group, console.time for better debugging.
- **Debugger Statement**: Use debugger keyword strategically for breakpoints.
- **Type Checking**: Consider using JSDoc comments or TypeScript for type safety.
- **Validation**: Validate function inputs, especially in public APIs.

## X. Best Practices Checklist

Before submitting JavaScript code, verify:
- [ ] No var declarations (use const/let)
- [ ] Consistent naming conventions applied
- [ ] No unused variables or imports
- [ ] Error handling implemented for async operations
- [ ] No console.log statements in production code
- [ ] Functions are pure when possible
- [ ] Code is properly modularized
- [ ] Comments explain "why" not "what"
- [ ] No magic numbers or strings
- [ ] Semicolons used consistently (or intentionally omitted)
