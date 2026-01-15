// Package main - Application entry point template
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// Version can be set at build time using ldflags
// go build -ldflags "-X main.version=1.0.0"
var version = "dev"

func main() {
	// Setup logging
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Printf("Starting application version %s", version)

	// Create context with cancellation for graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Setup signal handling
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	// Start the application
	errChan := make(chan error, 1)
	go func() {
		if err := run(ctx); err != nil {
			errChan <- err
		}
	}()

	// Wait for shutdown signal or error
	select {
	case sig := <-sigChan:
		log.Printf("Received signal: %v, initiating graceful shutdown", sig)
		cancel()
	case err := <-errChan:
		log.Printf("Application error: %v", err)
		cancel()
	}

	// Allow time for graceful shutdown
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	if err := shutdown(shutdownCtx); err != nil {
		log.Printf("Shutdown error: %v", err)
		os.Exit(1)
	}

	log.Println("Application stopped gracefully")
}

// run contains the main application logic
func run(ctx context.Context) error {
	// Initialize your application here
	// - Load configuration
	// - Connect to databases
	// - Start HTTP server
	// - etc.

	log.Println("Application running...")

	// Example: Keep running until context is cancelled
	<-ctx.Done()
	return ctx.Err()
}

// shutdown performs cleanup operations
func shutdown(ctx context.Context) error {
	// Close database connections
	// Stop HTTP servers
	// Flush logs
	// etc.

	log.Println("Performing cleanup...")
	return nil
}

// Example function with error handling
func processItem(ctx context.Context, id string) error {
	if id == "" {
		return fmt.Errorf("invalid id: cannot be empty")
	}

	// Check context cancellation
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
	}

	// Process the item
	log.Printf("Processing item: %s", id)
	return nil
}
