---
name: rust-development
description: Comprehensive guidelines for writing safe, concurrent, and performant Rust code. Use when working with .rs files, building systems software, or high-performance applications.
globs: ".rust"
---

# Rust Development Skills

## When to Use This Skill

Use this skill when:

- Writing or refactoring Rust code (.rs files)
- Building systems software, CLI tools, or web services
- Working on performance-critical applications
- Developing concurrent or parallel systems
- Creating WebAssembly modules or embedded systems

## I. Rust Philosophy & Principles

- **Ownership First**: Embrace ownership, borrowing, and lifetimes - they're Rust's superpowers.
- **Zero-Cost Abstractions**: Use abstractions freely. Rust compiles them away.
- **Fearless Concurrency**: Leverage Rust's thread safety guarantees for concurrent programming.
- **Explicit Over Implicit**: Rust favors explicitness. Embrace it for clarity and safety.
- **The Rust Book**: Follow patterns from The Rust Programming Language (the book).

## II. Code Organization & Structure

- **Cargo Workspace**: Use workspaces for multi-crate projects.
- **Module System**: Organize code into modules (mod) with clear hierarchies.
- **Crate Structure**: Follow standard structure (src/lib.rs, src/main.rs, src/bin/).
- **Feature Flags**: Use Cargo features for conditional compilation.
- **Public API**: Mark public items explicitly with pub. Everything is private by default.

**Standard Project Layout:**
project/
├── src/
│ ├── main.rs # Binary crate entry
│ ├── lib.rs # Library crate entry
│ ├── bin/ # Additional binaries
│ └── modules/ # Module organization
├── tests/ # Integration tests
├── benches/ # Benchmarks
├── examples/ # Example code
├── Cargo.toml # Package manifest
└── Cargo.lock # Dependency lock file

## III. Ownership & Borrowing

- **Ownership Rules**: Each value has one owner. Owner determines lifetime.
- **Borrowing**: Prefer borrowing (&T, &mut T) over ownership transfer.
- **Immutable by Default**: Use immutable borrows (&T) by default. Use &mut T only when mutation is needed.
- **Clone Wisely**: Avoid unnecessary clone(). It has performance cost.
- **Lifetime Elision**: Understand lifetime elision rules. Explicit lifetimes when necessary.
- **Reference Counting**: Use Rc<T> for single-threaded shared ownership, Arc<T> for multi-threaded.

## IV. Error Handling

- **Result Type**: Use Result<T, E> for operations that can fail. Never use panic! for expected errors.
- **Option Type**: Use Option<T> for optional values. Avoid null/undefined issues.
- **? Operator**: Use ? for error propagation. Clean and idiomatic.
- **Custom Errors**: Implement std::error::Error for custom error types.
- **Error Libraries**: Use thiserror for defining errors, anyhow for application error handling.
- **Match vs unwrap**: Use match or if let for control flow. Reserve unwrap() for prototyping.

## V. Types & Traits

- **Strong Typing**: Leverage Rust's type system. Create newtype wrappers for domain types.
- **Trait Bounds**: Use trait bounds to constrain generic types.
- **Trait Objects**: Use dyn Trait for dynamic dispatch when polymorphism is needed.
- **Derive Macros**: Use #[derive(Debug, Clone, PartialEq)] for common traits.
- **Associated Types**: Use associated types in traits for cleaner APIs.
- **Zero-Sized Types**: Use ZSTs for compile-time guarantees without runtime cost.

## VI. Pattern Matching

- **Exhaustiveness**: Let compiler enforce exhaustive matching. No wildcard as first resort.
- **If Let / While Let**: Use if let and while let for single-pattern matches.
- **Match Guards**: Use match guards (if condition) for conditional matching.
- **Destructuring**: Destructure structs and enums in patterns for clarity.
- **@ Binding**: Use @ to bind matched values: match x @ 1..=5.

## VII. Concurrency & Parallelism

- **Thread Safety**: Leverage Send and Sync traits for compile-time thread safety.
- **Channels**: Use mpsc channels for message passing between threads.
- **Mutex & RwLock**: Use Mutex<T> for exclusive access, RwLock<T> for concurrent reads.
- **Arc for Sharing**: Wrap shared data in Arc<Mutex<T>> or Arc<RwLock<T>>.
- **Rayon**: Use Rayon for data parallelism (parallel iterators).
- **Async/Await**: Use async/await with Tokio or async-std for async I/O.

## VIII. Memory & Performance

- **Stack vs Heap**: Prefer stack allocation. Use Box<T> for heap allocation explicitly.
- **Vec vs Array**: Use Vec<T> for dynamic arrays, [T; N] for fixed-size arrays.
- **String vs &str**: Use &str for string slices, String for owned strings.
- **Cow**: Use Cow<'a, T> to avoid cloning when possible (Copy-on-Write).
- **Inline**: Use #[inline] for small, hot functions.
- **Zero-Copy**: Design APIs for zero-copy operations when performance matters.

## IX. Iterators & Closures

- **Iterator Chains**: Use iterator methods (map, filter, fold) instead of loops.
- **Lazy Evaluation**: Iterators are lazy. Collect or consume when needed.
- **Closure Traits**: Understand Fn, FnMut, FnOnce for closure types.
- **collect()**: Use collect() with type hints for target collection.
- **Custom Iterators**: Implement Iterator trait for custom types.

## X. Macros

- **Macro Rules**: Use macro_rules! for compile time code generation.
- **Procedural Macros**: Use proc macros for derive, attribute, and function-like macros.
- **Debugging Macros**: Use cargo expand to see macro expansion.
- **Hygiene**: Understand macro hygiene and scope.
- **Documentation**: Document macros thoroughly with examples.

## XI. Testing

- **Unit Tests**: Place unit tests in same file with #[cfg(test)] module.
- **Integration Tests**: Place integration tests in tests/ directory.
- **Test Organization**: Use #[test] attribute. Group related tests with modules.
- **Assert Macros**: Use assert!, assert_eq!, assert_ne! for assertions.
- **Property Testing**: Use proptest or quickcheck for property-based testing.
- **Benchmarks**: Write benchmarks in benches/ with criterion crate.
- **Doc Tests**: Write examples in doc comments. They're tested automatically.

## XII. Common Patterns

- **Good Patterns**:

[] Newtype pattern for type safety
[] Builder pattern with typestate
[] RAII for resource management
[] Error propagation with ?
[] Match for exhaustive handling

- **Anti-Patterns to Avoid**:

- unwrap() in production code
- clone() everywhere (understand borrowing)
- Ignoring compiler warnings
- Fighting the borrow checker (rethink design)
- String everywhere (use &str when possible)

## XIII. Dependencies & Crates

- **Cargo.toml**: Define dependencies with version constraints.
- **Semantic Versioning**: Follow semver strictly for public crates.
- **Feature Flags**: Use features to make dependencies optional.
- **Popular Crates**: Familiarize with serde, tokio, clap, log, anyhow, thiserror.
- **Cargo Commands**: Use cargo check, cargo build, cargo test, cargo clippy.
- **Minimal Dependencies**: Keep dependency tree lean. Audit with cargo tree.

## XIV. Code Quality Tools

- **rustfmt**: Format code with cargo fmt. Configure in rustfmt.toml.
- **Clippy**: Run cargo clippy for lints and suggestions. Fix all warnings.
- **Cargo Check**: Use cargo check for fast compilation checks.
- **Rust Analyzer**: Use rust-analyzer for IDE support and inline diagnostics.
- **Documentation**: Generate docs with cargo doc --open.
- **Audit**: Run cargo audit to check for security vulnerabilities.

## XV. Async Programming

- **Async Runtime**: Choose Tokio or async-std for async runtime.
- **Async Functions**: Use async fn for asynchronous functions.
- **Await**: Use .await to wait for futures.
- **Pin**: Understand Pin<T> for self-referential types.
- **Stream**: Use Stream trait for asynchronous iteration.
- **Join/Select**: Use tokio::join! and tokio::select! for concurrent futures.
- **Blocking Code**: Use spawn_blocking() to run CPU-intensive code in async context.

## XVI. Unsafe Code

- **Minimize Unsafe**: Avoid unsafe unless absolutely necessary.
- **Encapsulate Unsafe**: Wrap unsafe code in safe abstractions.
- **Document Safety**: Document why unsafe code is correct with SAFETY comments.
- **Miri**: Test unsafe code with Miri (Rust's interpreter for detecting UB).
- **Understand UB**: Know what constitutes undefined behavior in Rust.
- **Review Carefully**: Have unsafe code reviewed by experienced Rustaceans.

## XVII. Best Practices Checklist

Before submitting Rust code, verify:

- [ ] Code compiles with no warnings (cargo build)
- [ ] cargo fmt applied for consistent formatting
- [ ] cargo clippy passes without warnings
- [ ] Error handling uses Result/Option, not panic!
- [ ] Ownership and borrowing used correctly
- [ ] Tests written and passing (cargo test)
- [ ] Documentation written for public APIs
- [ ] No unnecessary clone() calls
- [ ] Lifetimes explicitly specified when required
- [ ] cargo check passes quickly

## XVIII. Resources & Learning

- **The Rust Book**: [https://doc.rust-lang.org/book/](https://doc.rust-lang.org/book/)
- **Rust by Example**: [https://doc.rust-lang.org/rust-by-example/](https://doc.rust-lang.org/rust-by-example/)
- **Rustlings**: Interactive exercises for learning Rust
- **Rust API Guidelines**: [https://rust-lang.github.io/api-guidelines/](https://rust-lang.github.io/api-guidelines/)
- **This Week in Rust**: Stay updated with community news
- **docs.rs**: Browse documentation for all published crates
