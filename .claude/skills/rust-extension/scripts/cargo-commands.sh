#!/bin/bash
# Rust/Cargo Common Commands Reference

# ============================================
# PROJECT SETUP
# ============================================

# Create new binary project
cargo new my-project
cargo new my-project --name custom-name

# Create new library project
cargo new my-library --lib

# Initialize in existing directory
cargo init
cargo init --lib

# ============================================
# BUILDING
# ============================================

# Build project (debug mode)
cargo build

# Build release (optimized)
cargo build --release

# Build specific target
cargo build --target x86_64-unknown-linux-gnu

# Build all targets
cargo build --all-targets

# Build specific package in workspace
cargo build -p package-name

# Check without building
cargo check

# ============================================
# RUNNING
# ============================================

# Run project
cargo run

# Run with arguments
cargo run -- arg1 arg2

# Run in release mode
cargo run --release

# Run specific binary
cargo run --bin binary-name

# Run example
cargo run --example example-name

# ============================================
# TESTING
# ============================================

# Run all tests
cargo test

# Run specific test
cargo test test_name

# Run tests in specific module
cargo test module_name::

# Run ignored tests
cargo test -- --ignored

# Run tests with output
cargo test -- --nocapture

# Run doc tests only
cargo test --doc

# Run tests with threads
cargo test -- --test-threads=1

# ============================================
# DOCUMENTATION
# ============================================

# Generate documentation
cargo doc

# Generate and open in browser
cargo doc --open

# Include private items
cargo doc --document-private-items

# Generate docs for all dependencies
cargo doc --all

# ============================================
# DEPENDENCY MANAGEMENT
# ============================================

# Add dependency
cargo add package-name
cargo add package-name@1.0.0

# Add dev dependency
cargo add package-name --dev

# Add build dependency
cargo add package-name --build

# Add with features
cargo add package-name --features feature1,feature2

# Remove dependency
cargo remove package-name

# Update dependencies
cargo update

# Update specific dependency
cargo update package-name

# Show dependency tree
cargo tree

# Show why dependency is included
cargo tree --invert package-name

# ============================================
# CODE QUALITY
# ============================================

# Format code
cargo fmt

# Check formatting
cargo fmt --check

# Lint with Clippy
cargo clippy

# Clippy with all targets
cargo clippy --all-targets --all-features

# Fix Clippy warnings automatically
cargo clippy --fix

# Fix compiler warnings
cargo fix

# ============================================
# BENCHMARKING
# ============================================

# Run benchmarks (nightly required)
cargo bench

# Run specific benchmark
cargo bench bench_name

# ============================================
# PUBLISHING
# ============================================

# Package for publishing
cargo package

# Publish to crates.io
cargo publish

# Publish dry run
cargo publish --dry-run

# Login to crates.io
cargo login

# ============================================
# CLEANING
# ============================================

# Clean build artifacts
cargo clean

# Clean specific package
cargo clean -p package-name

# Clean release artifacts only
cargo clean --release

# ============================================
# WORKSPACE COMMANDS
# ============================================

# Build all workspace members
cargo build --workspace

# Test all workspace members
cargo test --workspace

# Run command for all packages
cargo build --all

# ============================================
# CROSS-COMPILATION
# ============================================

# List available targets
rustup target list

# Add target
rustup target add x86_64-unknown-linux-musl

# Build for specific target
cargo build --target x86_64-unknown-linux-musl

# ============================================
# SECURITY & AUDITING
# ============================================

# Install cargo-audit
cargo install cargo-audit

# Run security audit
cargo audit

# ============================================
# USEFUL CARGO EXTENSIONS
# ============================================

# Install extension
cargo install cargo-watch
cargo install cargo-expand
cargo install cargo-edit
cargo install cargo-outdated
cargo install cargo-bloat

# Watch for changes
cargo watch -x run
cargo watch -x test

# Expand macros
cargo expand

# Check for outdated dependencies
cargo outdated

# Analyze binary size
cargo bloat --release

# ============================================
# ENVIRONMENT
# ============================================

# Show Rust version
rustc --version
cargo --version

# Update Rust toolchain
rustup update

# Switch toolchain
rustup default stable
rustup default nightly

# Show installed toolchains
rustup toolchain list

# Add component
rustup component add clippy
rustup component add rustfmt
