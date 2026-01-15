// Package handler provides HTTP handlers template
package handler

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"
)

// Response represents a standard API response
type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
	Meta    *Meta       `json:"meta,omitempty"`
}

// Meta contains pagination information
type Meta struct {
	Page       int `json:"page,omitempty"`
	PerPage    int `json:"per_page,omitempty"`
	Total      int `json:"total,omitempty"`
	TotalPages int `json:"total_pages,omitempty"`
}

// Handler holds dependencies for HTTP handlers
type Handler struct {
	logger *log.Logger
	// Add your services here
	// userService UserService
}

// NewHandler creates a new handler instance
func NewHandler(logger *log.Logger) *Handler {
	return &Handler{
		logger: logger,
	}
}

// RegisterRoutes sets up the HTTP routes
func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	// Health check
	mux.HandleFunc("GET /health", h.handleHealth)

	// API routes (Go 1.22+ pattern matching)
	mux.HandleFunc("GET /api/v1/items", h.withMiddleware(h.handleGetItems))
	mux.HandleFunc("GET /api/v1/items/{id}", h.withMiddleware(h.handleGetItem))
	mux.HandleFunc("POST /api/v1/items", h.withMiddleware(h.handleCreateItem))
	mux.HandleFunc("PUT /api/v1/items/{id}", h.withMiddleware(h.handleUpdateItem))
	mux.HandleFunc("DELETE /api/v1/items/{id}", h.withMiddleware(h.handleDeleteItem))
}

// Middleware wrapper
func (h *Handler) withMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Add request ID to context
		ctx := context.WithValue(r.Context(), "requestID", generateRequestID())
		r = r.WithContext(ctx)

		// Log request
		start := time.Now()
		h.logger.Printf("Started %s %s", r.Method, r.URL.Path)

		// Set common headers
		w.Header().Set("Content-Type", "application/json")

		// Call the handler
		next(w, r)

		// Log completion
		h.logger.Printf("Completed %s %s in %v", r.Method, r.URL.Path, time.Since(start))
	}
}

// Health check handler
func (h *Handler) handleHealth(w http.ResponseWriter, r *http.Request) {
	h.respondJSON(w, http.StatusOK, Response{
		Success: true,
		Data: map[string]string{
			"status": "healthy",
			"time":   time.Now().Format(time.RFC3339),
		},
	})
}

// GET /api/v1/items
func (h *Handler) handleGetItems(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	// page := r.URL.Query().Get("page")
	// limit := r.URL.Query().Get("limit")

	// Get items from service
	items := []map[string]interface{}{
		{"id": "1", "name": "Item 1"},
		{"id": "2", "name": "Item 2"},
	}

	h.respondJSON(w, http.StatusOK, Response{
		Success: true,
		Data:    items,
		Meta: &Meta{
			Page:    1,
			PerPage: 10,
			Total:   2,
		},
	})
}

// GET /api/v1/items/{id}
func (h *Handler) handleGetItem(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id") // Go 1.22+

	if id == "" {
		h.respondError(w, http.StatusBadRequest, "id is required")
		return
	}

	// Get item from service
	item := map[string]interface{}{
		"id":   id,
		"name": "Item " + id,
	}

	h.respondJSON(w, http.StatusOK, Response{
		Success: true,
		Data:    item,
	})
}

// POST /api/v1/items
func (h *Handler) handleCreateItem(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Name string `json:"name"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		h.respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if input.Name == "" {
		h.respondError(w, http.StatusBadRequest, "name is required")
		return
	}

	// Create item using service
	item := map[string]interface{}{
		"id":   "new-id",
		"name": input.Name,
	}

	h.respondJSON(w, http.StatusCreated, Response{
		Success: true,
		Data:    item,
	})
}

// PUT /api/v1/items/{id}
func (h *Handler) handleUpdateItem(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	var input struct {
		Name string `json:"name"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		h.respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	// Update item using service
	item := map[string]interface{}{
		"id":   id,
		"name": input.Name,
	}

	h.respondJSON(w, http.StatusOK, Response{
		Success: true,
		Data:    item,
	})
}

// DELETE /api/v1/items/{id}
func (h *Handler) handleDeleteItem(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	// Delete item using service
	_ = id

	h.respondJSON(w, http.StatusOK, Response{
		Success: true,
		Data:    map[string]string{"message": "deleted successfully"},
	})
}

// Helper: Respond with JSON
func (h *Handler) respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.logger.Printf("Error encoding response: %v", err)
	}
}

// Helper: Respond with error
func (h *Handler) respondError(w http.ResponseWriter, status int, message string) {
	h.respondJSON(w, status, Response{
		Success: false,
		Error:   message,
	})
}

// Helper: Generate request ID
func generateRequestID() string {
	return time.Now().Format("20060102150405.000000")
}

// Example: Error handling with custom errors
var (
	ErrNotFound = errors.New("not found")
	ErrForbidden = errors.New("forbidden")
)

func (h *Handler) handleServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrNotFound):
		h.respondError(w, http.StatusNotFound, "resource not found")
	case errors.Is(err, ErrForbidden):
		h.respondError(w, http.StatusForbidden, "access denied")
	default:
		h.logger.Printf("Internal error: %v", err)
		h.respondError(w, http.StatusInternalServerError, "internal server error")
	}
}
