---
name: react-development
description: Best practices for building modern React applications with functional components, hooks, and optimal performance. Use when working with .jsx or .tsx files in React projects.
globs:
  - ".jsx"
  - ".tsx"
---

# React Development Skills

## When to Use This Skill

Use this skill when:
- Writing or refactoring React components (.jsx, .tsx files)
- Building single-page applications (SPAs) or web applications
- Working with React hooks and state management
- Optimizing React performance and rendering
- Integrating with APIs and external libraries

## I. React Fundamentals

- **Functional Components**: Always use functional components over class components.
- **Hooks Only**: Use hooks for state and side effects. No class component patterns.
- **JSX Best Practices**: Keep JSX readable. Extract complex expressions to variables.
- **Component Composition**: Build complex UIs by composing small, reusable components.
- **Props Immutability**: Never mutate props. Treat them as read-only.

## II. Component Architecture

- **Single Responsibility**: Each component should do one thing well.
- **Component Size**: Keep components small (under 200 lines). Extract when larger.
- **File Organization**: One component per file. Name file same as component.
- **Component Hierarchy**: Organize components by feature, not by type.
- **Index Files**: Use index.ts/js to re-export components for cleaner imports.

**Recommended Project Structure:**
```
src/
├── components/        # Reusable components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── features/          # Feature-based modules
│   ├── auth/
│   ├── dashboard/
│   └── ...
├── hooks/             # Custom hooks
├── utils/             # Utility functions
├── contexts/          # React contexts
├── services/          # API services
└── App.tsx
```

## III. React Hooks Best Practices

**useState:**
- Initialize state with proper types
- Use functional updates when new state depends on previous: `setState(prev => prev + 1)`
- Split state into multiple useState calls for unrelated data
- Use objects for related state that changes together

**useEffect:**
- Specify all dependencies in dependency array
- One effect per concern (don't combine unrelated side effects)
- Return cleanup functions for subscriptions and timers
- Use empty dependency array `[]` only for mount-only effects
- Avoid objects/arrays in dependencies (use useMemo/useCallback)

**useCallback & useMemo:**
- Use useCallback for functions passed to child components
- Use useMemo for expensive computations only
- Don't over-optimize - measure first
- Include all dependencies

**useRef:**
- Use for DOM references and mutable values that don't trigger re-renders
- Don't use for state that affects rendering
- Access ref.current in effects or event handlers, not during render

**Custom Hooks:**
- Prefix with "use" (e.g., useAuth, useFetch)
- Extract reusable logic into custom hooks
- Return arrays for multiple values `[value, setValue]` or objects `{ value, setValue }`
- Keep hooks focused on single responsibility

## IV. Props & TypeScript

**Props Definition (TypeScript):**
```typescript
// Prefer interface for props
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

// Destructure props in function signature
export const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children,
  disabled = false
}) => {
  // Component logic
};
```

- **Type All Props**: Always define prop types (TypeScript interfaces or PropTypes)
- **Destructure Props**: Destructure in function parameters for clarity
- **Default Values**: Use default parameters for optional props
- **Children Type**: Use `React.ReactNode` for children prop
- **Event Handlers**: Type event handlers explicitly (e.g., `React.MouseEvent<HTMLButtonElement>`)

## V. State Management

**Local State:**
- Use useState for component-specific state
- Lift state up only when necessary
- Keep state as close to where it's used as possible

**Context API:**
- Use for global state (theme, auth, user preferences)
- Split contexts by concern (don't create god contexts)
- Memoize context values to prevent unnecessary re-renders
- Use useReducer with Context for complex state logic

**External Libraries:**
- **Zustand**: Lightweight, simple state management
- **Redux Toolkit**: Complex applications with predictable state
- **Jotai/Recoil**: Atomic state management
- **TanStack Query**: Server state and data fetching

## VI. Performance Optimization

- **React.memo**: Wrap components that receive same props often
- **useMemo**: Cache expensive calculations
- **useCallback**: Prevent function recreation on each render
- **Code Splitting**: Use React.lazy() and Suspense for route-based splitting
- **Virtualization**: Use react-window or react-virtualized for long lists
- **Avoid Inline Functions**: In JSX when passing to frequently re-rendering children
- **Key Props**: Use stable, unique keys for list items (never index)

## VII. Event Handling

- **Arrow Functions**: Use arrow functions for inline handlers or bind in constructor
- **Event Delegation**: Let React handle event delegation
- **Prevent Default**: Use `e.preventDefault()` when needed
- **Stop Propagation**: Use `e.stopPropagation()` carefully
- **Synthetic Events**: Understand React's synthetic event system
- **Event Handler Naming**: Prefix with "handle" (handleClick, handleSubmit)

## VIII. Conditional Rendering

- **Ternary for If-Else**: Use ternary operator for if-else rendering
- **&& for If Only**: Use logical AND for conditional rendering without else
- **Early Return**: Return early for simple conditions
- **Avoid Complex JSX Logic**: Extract complex conditions to variables or functions
- **Null Rendering**: Return `null` to render nothing
```jsx
// Good patterns
{isLoading && <Spinner />}
{error ? <Error message={error} /> : <Content />}

// Extract complex logic
const shouldShowAlert = isError && !isDismissed && hasPermission;
return shouldShowAlert && <Alert />;
```

## IX. Forms & Input Handling

- **Controlled Components**: Prefer controlled components for form inputs
- **Form Libraries**: Use React Hook Form or Formik for complex forms
- **Validation**: Use Zod or Yup for schema validation
- **Debouncing**: Debounce input handlers for search/autocomplete
- **Accessibility**: Use proper labels, ARIA attributes, and semantic HTML

## X. Side Effects & Data Fetching

- **useEffect for Side Effects**: API calls, subscriptions, manual DOM manipulation
- **Cleanup**: Always return cleanup function when needed
- **Data Fetching Libraries**: Use TanStack Query, SWR, or Apollo for server state
- **Async in useEffect**: Create async function inside useEffect, don't make useEffect async
- **Race Conditions**: Handle component unmounting during async operations
```jsx
useEffect(() => {
  let cancelled = false;

  const fetchData = async () => {
    const data = await api.getData();
    if (!cancelled) {
      setData(data);
    }
  };

  fetchData();

  return () => {
    cancelled = true;
  };
}, []);
```

## XI. Error Handling

- **Error Boundaries**: Implement error boundaries for component tree errors
- **Try-Catch**: Use try-catch in async functions and event handlers
- **Error States**: Maintain error state for API calls and async operations
- **User Feedback**: Show meaningful error messages to users
- **Fallback UI**: Provide fallback UI in error boundaries

## XII. Testing

- **Testing Library**: Use React Testing Library over Enzyme
- **Test User Behavior**: Test what users see and do, not implementation
- **Queries**: Use getByRole, getByLabelText over getByTestId
- **Async Utils**: Use waitFor, findBy* for async operations
- **Mock API Calls**: Use MSW (Mock Service Worker) for API mocking
- **Component Tests**: Test components in isolation and integration

## XIII. Styling Approaches

**CSS Modules:**
- Scoped styles per component
- Import as object: `import styles from './Button.module.css'`

**Styled Components / Emotion:**
- CSS-in-JS with component scoping
- Dynamic styling based on props
- Theme support built-in

**Tailwind CSS:**
- Utility-first CSS framework
- Rapid UI development
- Use className for styling

**Best Practices:**
- Be consistent across project
- Avoid inline styles for complex styling
- Use CSS variables for theming
- Consider performance implications

## XIV. Accessibility (a11y)

- **Semantic HTML**: Use proper HTML elements (button, nav, article)
- **ARIA Attributes**: Add ARIA labels when semantic HTML isn't enough
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Focus Management**: Manage focus for modals, drawers, and route changes
- **Alt Text**: Provide meaningful alt text for images
- **Color Contrast**: Ensure sufficient color contrast ratios
- **Screen Reader Testing**: Test with screen readers

## XV. Common Patterns

**Good Patterns:**
- Container/Presenter pattern for separating logic and UI
- Compound components for flexible APIs
- Render props for sharing logic
- Higher-order components (HOCs) for cross-cutting concerns
- Custom hooks for reusable logic

**Anti-Patterns to Avoid:**
- Prop drilling (use Context or state management)
- Massive components (split into smaller ones)
- Direct DOM manipulation (use refs sparingly)
- Index as key in lists
- Mutating state directly
- Mixing business logic with rendering logic

## XVI. React 18+ Features

- **Concurrent Features**: Use useTransition for non-urgent updates
- **Suspense**: Use for data fetching and code splitting
- **Automatic Batching**: Understand automatic state update batching
- **useId**: Generate unique IDs for accessibility
- **useDeferredValue**: Defer expensive updates

## XVII. Best Practices Checklist

Before submitting React code, verify:
- [ ] Functional components with hooks only
- [ ] Props typed (TypeScript/PropTypes)
- [ ] All hooks dependencies declared correctly
- [ ] No unnecessary re-renders (use React DevTools Profiler)
- [ ] Keys used properly in lists
- [ ] Accessibility attributes added
- [ ] Error boundaries implemented
- [ ] Components tested
- [ ] No console errors or warnings
- [ ] Code formatted (Prettier/ESLint)
