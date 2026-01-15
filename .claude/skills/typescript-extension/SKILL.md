---
name: typescript-development
description: Comprehensive guidelines for writing type-safe, scalable TypeScript applications. Use when working with .ts files, TypeScript projects, or when adding type safety to JavaScript code.
globs: ".ts"
---

# TypeScript Development Skills

## When to Use This Skill

Use this skill when:
- Writing or refactoring TypeScript code (.ts, .tsx files)
- Adding type definitions to existing JavaScript projects
- Building type-safe APIs and applications
- Working with complex data structures requiring type safety
- Configuring TypeScript compiler options

## I. TypeScript Fundamentals

- **Type Everything**: Provide explicit types for function parameters, return values, and complex variables.
- **Avoid Any**: Never use `any` type. Use `unknown` for truly unknown types, then narrow with type guards.
- **Strict Mode**: Always enable strict mode in tsconfig.json for maximum type safety.
- **Type Inference**: Let TypeScript infer types when obvious. Don't over-annotate simple cases.
- **Const Assertions**: Use `as const` for immutable literal types and readonly arrays/objects.

## II. Type System Best Practices

- **Interfaces vs Types**: Use interfaces for object shapes and public APIs. Use type aliases for unions, intersections, and complex types.
- **Discriminated Unions**: Use discriminated unions for type-safe state machines and variants.
- **Generics**: Use generics to create reusable, type-safe functions and components.
- **Type Guards**: Implement custom type guards (is predicates) for runtime type narrowing.
- **Utility Types**: Leverage built-in utility types (Partial, Required, Pick, Omit, Record, etc.).

## III. Advanced Type Patterns

- **Mapped Types**: Create types that transform properties of existing types.
- **Conditional Types**: Use conditional types for type-level logic and inference.
- **Template Literal Types**: Leverage template literal types for string manipulation at type level.
- **Branded Types**: Use branded types (nominal typing) to prevent primitive obsession.
- **Index Signatures**: Use index signatures carefully. Prefer Record<K, V> when possible.

## IV. Configuration (tsconfig.json)

**Essential Compiler Options:**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

- **Strict Checks**: Enable all strict flags (strictNullChecks, strictFunctionTypes, etc.).
- **Module Resolution**: Use "bundler" for modern projects, "node" for traditional Node.js.
- **Path Mapping**: Configure path aliases for cleaner imports.
- **Declaration Files**: Enable declaration generation for library projects.

## V. Type Definitions & Declarations

- **Declaration Files**: Create .d.ts files for ambient declarations and module augmentation.
- **DefinitelyTyped**: Install @types packages for third-party libraries without types.
- **Module Augmentation**: Extend existing module types when necessary using declare module.
- **Global Declarations**: Use declare global sparingly for truly global augmentations.
- **Triple-Slash Directives**: Avoid triple-slash directives except for reference types in declaration files.

## VI. Functions & Generics

- **Generic Constraints**: Use extends to constrain generic types appropriately.
- **Function Overloads**: Provide overloads for functions with multiple call signatures.
- **Return Type Inference**: Let TypeScript infer return types for simple functions.
- **Explicit Returns for APIs**: Explicitly type return values for public API functions.
- **Generic Functions**: Make functions generic when they work with multiple types similarly.

## VII. Classes & OOP

- **Access Modifiers**: Use private, protected, public explicitly for class members.
- **Readonly Properties**: Mark immutable properties as readonly.
- **Abstract Classes**: Use abstract classes for base classes that shouldn't be instantiated.
- **Parameter Properties**: Use parameter properties shorthand in constructors.
- **Implements vs Extends**: Implement interfaces, extend classes. Understand the difference.

## VIII. Error Handling & Validation

- **Type Guards for Runtime**: Implement runtime validation for external data (API responses, user input).
- **Zod/Yup Integration**: Use schema validation libraries for runtime type checking.
- **Custom Error Types**: Create typed error classes for domain-specific errors.
- **Never Type**: Use never for exhaustive checks and unreachable code paths.
- **Result Types**: Consider Result<T, E> pattern for explicit error handling.

## IX. Working with External Data

- **API Response Types**: Define interfaces for all API response shapes.
- **JSON Parsing**: Validate JSON parsing results with type guards or validators.
- **Type Assertion Safety**: Use type assertions (as) sparingly and only when type is guaranteed.
- **Unknown First**: Parse external data as unknown, then validate and narrow.
- **Branded IDs**: Use branded types for IDs to prevent mixing different entity IDs.

## X. React & TypeScript Integration

- **Functional Components**: Use React.FC sparingly. Prefer explicit typing.
- **Props Interfaces**: Define clear interfaces for component props.
- **Event Handlers**: Type event handlers explicitly (React.MouseEvent, React.ChangeEvent).
- **Refs**: Use useRef with proper type parameters.
- **Context**: Provide proper types for Context providers and consumers.

## XI. Common Patterns

**Good Patterns:**
- Discriminated unions for state management
- Readonly<T> for immutable data structures
- Type predicates (is) for type narrowing
- Branded types for domain modeling
- Builder pattern with fluent interfaces

**Anti-Patterns to Avoid:**
- Using any or @ts-ignore to bypass errors
- Type assertions without validation
- Overly complex generic constraints
- Ignoring strict null checks
- Implicit any in function parameters

## XII. Migration from JavaScript

- **Gradual Migration**: Enable allowJs and incrementally convert files.
- **JSDoc First**: Add JSDoc comments before full TypeScript conversion.
- **Type Inference**: Let TypeScript infer types during migration, refine later.
- **External Types**: Install @types packages before converting dependencies.
- **Strictness Gradual**: Enable strict flags incrementally during migration.

## XIII. Best Practices Checklist

Before submitting TypeScript code, verify:
- [ ] Strict mode enabled in tsconfig.json
- [ ] No any types (use unknown and narrow)
- [ ] Public APIs have explicit return types
- [ ] Interfaces used for object shapes
- [ ] Generics constrained appropriately
- [ ] Runtime validation for external data
- [ ] No type assertions without validation
- [ ] Discriminated unions for complex states
- [ ] Utility types used where appropriate
- [ ] No @ts-ignore or @ts-expect-error comments
