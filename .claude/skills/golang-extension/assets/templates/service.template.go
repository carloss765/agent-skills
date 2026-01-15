// Package service provides business logic layer template
package service

import (
	"context"
	"errors"
	"fmt"
	"log"
	"sync"
	"time"
)

// Common errors
var (
	ErrNotFound     = errors.New("resource not found")
	ErrInvalidInput = errors.New("invalid input")
	ErrUnauthorized = errors.New("unauthorized")
)

// Entity represents a domain entity
type Entity struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Repository defines the data access interface
// Using interface allows easy mocking in tests
type Repository interface {
	GetByID(ctx context.Context, id string) (*Entity, error)
	GetAll(ctx context.Context, limit, offset int) ([]*Entity, error)
	Create(ctx context.Context, entity *Entity) error
	Update(ctx context.Context, entity *Entity) error
	Delete(ctx context.Context, id string) error
}

// Service handles business logic
type Service struct {
	repo   Repository
	cache  sync.Map // Simple in-memory cache
	logger *log.Logger
}

// NewService creates a new service instance
func NewService(repo Repository, logger *log.Logger) *Service {
	if logger == nil {
		logger = log.Default()
	}
	return &Service{
		repo:   repo,
		logger: logger,
	}
}

// GetByID retrieves an entity by ID
func (s *Service) GetByID(ctx context.Context, id string) (*Entity, error) {
	// Input validation
	if id == "" {
		return nil, fmt.Errorf("%w: id cannot be empty", ErrInvalidInput)
	}

	// Check cache first
	if cached, ok := s.cache.Load(id); ok {
		s.logger.Printf("Cache hit for id: %s", id)
		return cached.(*Entity), nil
	}

	// Fetch from repository
	entity, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get entity by id %s: %w", id, err)
	}

	// Update cache
	s.cache.Store(id, entity)
	return entity, nil
}

// GetAll retrieves all entities with pagination
func (s *Service) GetAll(ctx context.Context, limit, offset int) ([]*Entity, error) {
	// Validate pagination
	if limit <= 0 {
		limit = 10 // Default limit
	}
	if limit > 100 {
		limit = 100 // Max limit
	}
	if offset < 0 {
		offset = 0
	}

	return s.repo.GetAll(ctx, limit, offset)
}

// Create creates a new entity
func (s *Service) Create(ctx context.Context, entity *Entity) error {
	// Validate input
	if entity == nil {
		return fmt.Errorf("%w: entity cannot be nil", ErrInvalidInput)
	}
	if entity.Name == "" {
		return fmt.Errorf("%w: name is required", ErrInvalidInput)
	}

	// Set timestamps
	now := time.Now()
	entity.CreatedAt = now
	entity.UpdatedAt = now

	// Create in repository
	if err := s.repo.Create(ctx, entity); err != nil {
		return fmt.Errorf("failed to create entity: %w", err)
	}

	s.logger.Printf("Created entity with id: %s", entity.ID)
	return nil
}

// Update updates an existing entity
func (s *Service) Update(ctx context.Context, entity *Entity) error {
	if entity == nil || entity.ID == "" {
		return fmt.Errorf("%w: entity and id are required", ErrInvalidInput)
	}

	// Check if exists
	existing, err := s.repo.GetByID(ctx, entity.ID)
	if err != nil {
		return fmt.Errorf("failed to find entity: %w", err)
	}
	if existing == nil {
		return ErrNotFound
	}

	// Update timestamp
	entity.UpdatedAt = time.Now()
	entity.CreatedAt = existing.CreatedAt // Preserve original creation time

	// Update in repository
	if err := s.repo.Update(ctx, entity); err != nil {
		return fmt.Errorf("failed to update entity: %w", err)
	}

	// Invalidate cache
	s.cache.Delete(entity.ID)

	s.logger.Printf("Updated entity with id: %s", entity.ID)
	return nil
}

// Delete removes an entity
func (s *Service) Delete(ctx context.Context, id string) error {
	if id == "" {
		return fmt.Errorf("%w: id cannot be empty", ErrInvalidInput)
	}

	if err := s.repo.Delete(ctx, id); err != nil {
		return fmt.Errorf("failed to delete entity: %w", err)
	}

	// Invalidate cache
	s.cache.Delete(id)

	s.logger.Printf("Deleted entity with id: %s", id)
	return nil
}
