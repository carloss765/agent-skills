#!/bin/bash
# Go Common Commands Reference

# ============================================
# MODULE MANAGEMENT
# ============================================

# Initialize new module
go mod init github.com/username/project

# Download dependencies
go mod download

# Add missing and remove unused modules
go mod tidy

# Verify dependencies
go mod verify

# Create vendor directory
go mod vendor

# Show dependency graph
go mod graph

# ============================================
# BUILDING & RUNNING
# ============================================

# Build the project
go build

# Build with output name
go build -o bin/myapp

# Build for specific OS/Arch
GOOS=linux GOARCH=amd64 go build -o bin/myapp-linux
GOOS=darwin GOARCH=arm64 go build -o bin/myapp-mac
GOOS=windows GOARCH=amd64 go build -o bin/myapp.exe

# Build with ldflags (embed version)
go build -ldflags "-X main.version=1.0.0" -o bin/myapp

# Run directly
go run main.go
go run .

# Run with arguments
go run . --config=config.yaml

# ============================================
# TESTING
# ============================================

# Run all tests
go test ./...

# Run tests with verbose output
go test -v ./...

# Run specific test
go test -run TestFunctionName ./...

# Run tests with coverage
go test -cover ./...

# Generate coverage report
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Run benchmarks
go test -bench=. ./...

# Run benchmarks with memory allocation stats
go test -bench=. -benchmem ./...

# Race condition detection
go test -race ./...

# ============================================
# CODE QUALITY
# ============================================

# Format code
go fmt ./...
gofmt -s -w .

# Vet (find suspicious constructs)
go vet ./...

# Static analysis with staticcheck
staticcheck ./...

# Lint with golangci-lint
golangci-lint run

# ============================================
# DEPENDENCIES
# ============================================

# Get a specific package
go get github.com/package/name

# Get specific version
go get github.com/package/name@v1.2.3
go get github.com/package/name@latest

# Update all dependencies
go get -u ./...

# Show why a dependency is needed
go mod why github.com/package/name

# List all dependencies
go list -m all

# ============================================
# TOOLS & CODE GENERATION
# ============================================

# Install a tool
go install github.com/tool/name@latest

# Generate code (runs //go:generate comments)
go generate ./...

# Build documentation server
godoc -http=:6060

# ============================================
# PROFILING & DEBUGGING
# ============================================

# CPU profiling
go test -cpuprofile=cpu.out -bench=.
go tool pprof cpu.out

# Memory profiling
go test -memprofile=mem.out -bench=.
go tool pprof mem.out

# Trace
go test -trace=trace.out
go tool trace trace.out

# ============================================
# ENVIRONMENT
# ============================================

# Show Go environment
go env

# Set Go environment variable
go env -w GOPROXY=https://proxy.golang.org,direct

# Show installed Go version
go version

# Clean build cache
go clean -cache

# Clean test cache
go clean -testcache

# Clean module cache
go clean -modcache
