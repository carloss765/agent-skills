---
name: go-development
description: Guidelines for writing idiomatic, efficient, and concurrent Go code. Use when working with .go files, building Go services, APIs, or CLI tools.
globs: ".go"
---

# Go Development Skills

## When to Use This Skill

Use this skill when:
- Writing or refactoring Go code (.go files)
- Building microservices, APIs, or backend systems
- Creating CLI tools or system utilities
- Working with concurrent programming and goroutines
- Developing cloud-native applications

## I. Go Philosophy & Principles

- **Simplicity First**: Embrace Go's philosophy of simplicity and clarity over cleverness.
- **Composition Over Inheritance**: Use struct embedding and interfaces, not class hierarchies.
- **Explicit Error Handling**: Handle errors explicitly. Don't ignore returned errors.
- **Standard Library First**: Use standard library before adding dependencies.
- **Effective Go**: Follow patterns and practices from Effective Go documentation.

## II. Code Organization & Structure

- **Package Organization**: Organize by functionality, not by type (models, controllers, etc.).
- **Package Names**: Use short, lowercase, single-word package names.
- **Internal Packages**: Use internal/ directory for private packages.
- **Main Package**: Keep main.go minimal. Move logic to packages.
- **Flat Structure**: Avoid deep nesting. Prefer flat package hierarchies.
- **Go Modules**: Use go.mod for dependency management (Go 1.11+).

## III. Naming Conventions

- **Exported Names**: Capitalize first letter for exported identifiers.
- **CamelCase**: Use MixedCaps or mixedCaps, not underscores.
- **Short Names**: Use short variable names in small scopes (i, err, ctx).
- **Descriptive Names**: Use descriptive names for package-level declarations.
- **Getters**: Don't use Get prefix for getters (use Value() not GetValue()).
- **Interfaces**: Name interfaces with -er suffix (Reader, Writer, Closer).

## IV. Functions & Methods

- **Function Length**: Keep functions focused and concise.
- **Multiple Return Values**: Use multiple returns for value and error.
- **Named Return Values**: Use named returns for documentation, not for early return tricks.
- **Receiver Names**: Use short, consistent receiver names (1-2 letters).
- **Pointer vs Value Receivers**: Use pointer receivers for mutation or large structs.
- **Function Options**: Use functional options pattern for configuration.

## V. Error Handling

- **Check All Errors**: Never ignore errors. Always check returned error values.
- **Error Messages**: Don't capitalize error messages or end with punctuation.
- **Error Wrapping**: Use fmt.Errorf with %w verb to wrap errors (Go 1.13+).
- **Custom Errors**: Create custom error types for domain-specific errors.
- **Sentinel Errors**: Use errors.Is and errors.As for error comparison.
- **Error Context**: Add context to errors as they propagate up the call stack.

## VI. Interfaces & Types

- **Small Interfaces**: Keep interfaces small and focused (1-3 methods ideal).
- **Accept Interfaces**: Accept interfaces as parameters, return concrete types.
- **Empty Interface**: Use interface{} (or any in Go 1.18+) sparingly.
- **Type Assertions**: Check type assertions with comma-ok idiom.
- **Struct Tags**: Use struct tags for encoding/decoding (json, xml, yaml).
- **Zero Values**: Design types so their zero value is useful.

## VII. Concurrency

- **Goroutines**: Launch goroutines for concurrent tasks, but manage their lifecycle.
- **Channels**: Use channels to communicate between goroutines, not shared memory.
- **Select Statement**: Use select for multiplexing channel operations.
- **Context Package**: Use context.Context for cancellation and deadlines.
- **WaitGroups**: Use sync.WaitGroup to wait for goroutines to complete.
- **Mutexes**: Use sync.Mutex when shared memory is unavoidable.
- **Buffered Channels**: Use buffered channels carefully to avoid deadlocks.

## VIII. Memory Management

- **Pointers vs Values**: Pass large structs by pointer. Pass small values by value.
- **Slice Capacity**: Pre-allocate slices with make() when size is known.
- **String Builder**: Use strings.Builder for efficient string concatenation.
- **Defer**: Use defer for cleanup, but be aware of performance in loops.
- **Memory Leaks**: Close channels and cancel contexts to prevent goroutine leaks.

## IX. Testing

- **Test Files**: Name test files *_test.go in the same package.
- **Table-Driven Tests**: Use table-driven tests for multiple test cases.
- **Subtests**: Use t.Run() for subtests and parallel execution.
- **Test Helpers**: Create test helper functions with t.Helper().
- **Benchmarks**: Write benchmarks for performance-critical code.
- **Coverage**: Use go test -cover to measure test coverage.
- **Mocking**: Use interfaces for dependency injection and testing.

## X. Project Structure

**Standard Go Project Layout:**
```
project/
├── cmd/              # Main applications
├── internal/         # Private application code
├── pkg/              # Public library code
├── api/              # API definitions (proto, OpenAPI)
├── configs/          # Configuration files
├── scripts/          # Build and automation scripts
├── test/             # Integration tests
├── go.mod            # Module definition
└── README.md
```

## XI. Common Patterns

**Good Patterns:**
- Functional options for configuration
- Singleton with sync.Once
- Worker pools with goroutines and channels
- Pipeline pattern with channels
- Context for cancellation propagation

**Anti-Patterns to Avoid:**
- Ignoring errors with _ = err
- Using panic for normal error handling
- Not closing channels (unless infinite)
- Goroutine leaks (no cleanup mechanism)
- Premature optimization

## XII. Standard Library Usage

- **HTTP**: Use net/http for HTTP servers and clients.
- **JSON**: Use encoding/json for JSON marshaling.
- **Time**: Use time.Time, never store time as strings or integers.
- **Context**: Use context.Context in all I/O operations.
- **Formatting**: Use fmt.Sprintf for string formatting, not string concatenation.
- **Logging**: Use log or slog (Go 1.21+) for structured logging.

## XIII. Dependencies & Modules

- **Go Modules**: Use go mod init, go mod tidy for module management.
- **Semantic Versioning**: Follow semver for module versions.
- **Minimal Dependencies**: Add dependencies judiciously. Prefer standard library.
- **Replace Directive**: Use replace in go.mod for local development only.
- **Vendor Directory**: Use go mod vendor for reproducible builds.

## XIV. Performance & Optimization

- **Profiling**: Use pprof for CPU and memory profiling.
- **Benchmarking**: Write benchmarks before optimizing.
- **String Operations**: Use strings.Builder or bytes.Buffer for concatenation.
- **Reflection**: Avoid reflection in hot paths. It's slow.
- **Allocations**: Minimize heap allocations in performance-critical code.
- **sync.Pool**: Use sync.Pool for object reuse in high-throughput scenarios.

## XV. Best Practices Checklist

Before submitting Go code, verify:
- [ ] All errors are checked and handled
- [ ] Code formatted with gofmt or goimports
- [ ] No goroutine leaks (proper cleanup)
- [ ] Interfaces are small and focused
- [ ] Tests written and passing
- [ ] Error messages are lowercase, unwrapped
- [ ] Context used for cancellation
- [ ] No global mutable state
- [ ] Receiver names are consistent
- [ ] go mod tidy run before commit
