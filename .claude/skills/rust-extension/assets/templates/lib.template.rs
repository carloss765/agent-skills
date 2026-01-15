//! # My Package
//!
//! `my_package` provides functionality for doing something useful.
//!
//! ## Quick Start
//!
//! ```rust
//! use my_package::{Config, Service};
//!
//! let config = Config::default();
//! let service = Service::new(config);
//! ```

// ============================================
// MODULES
// ============================================

pub mod error;
mod internal;

// Re-export commonly used types
pub use error::{Error, Result};

// ============================================
// IMPORTS
// ============================================

use std::collections::HashMap;
use std::sync::Arc;

use serde::{Deserialize, Serialize};
use thiserror::Error;

// ============================================
// CONSTANTS
// ============================================

/// Default timeout in seconds
pub const DEFAULT_TIMEOUT: u64 = 30;

/// Maximum retry attempts
pub const MAX_RETRIES: u32 = 3;

// ============================================
// ERROR TYPES
// ============================================

/// Error types for this crate
#[derive(Error, Debug)]
pub enum MyError {
    /// Configuration error
    #[error("configuration error: {0}")]
    Config(String),

    /// I/O error
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),

    /// Validation error
    #[error("validation error: {message}")]
    Validation {
        message: String,
        field: Option<String>,
    },

    /// Not found error
    #[error("resource not found: {0}")]
    NotFound(String),

    /// Internal error
    #[error("internal error")]
    Internal(#[source] Box<dyn std::error::Error + Send + Sync>),
}

/// Convenient Result type alias
pub type MyResult<T> = std::result::Result<T, MyError>;

// ============================================
// CONFIGURATION
// ============================================

/// Configuration for the service
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Config {
    /// Timeout in seconds
    pub timeout: u64,
    /// Number of retry attempts
    pub retries: u32,
    /// Enable debug mode
    #[serde(default)]
    pub debug: bool,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            timeout: DEFAULT_TIMEOUT,
            retries: MAX_RETRIES,
            debug: false,
        }
    }
}

impl Config {
    /// Create a new config with custom values
    pub fn new(timeout: u64, retries: u32) -> Self {
        Self {
            timeout,
            retries,
            debug: false,
        }
    }

    /// Enable debug mode
    #[must_use]
    pub fn with_debug(mut self, debug: bool) -> Self {
        self.debug = debug;
        self
    }

    /// Validate the configuration
    pub fn validate(&self) -> MyResult<()> {
        if self.timeout == 0 {
            return Err(MyError::Validation {
                message: "timeout must be greater than 0".into(),
                field: Some("timeout".into()),
            });
        }
        Ok(())
    }
}

// ============================================
// ENTITIES
// ============================================

/// Represents a domain entity
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Entity {
    /// Unique identifier
    pub id: String,
    /// Entity name
    pub name: String,
    /// Optional description
    pub description: Option<String>,
    /// Additional metadata
    #[serde(default)]
    pub metadata: HashMap<String, String>,
}

impl Entity {
    /// Create a new entity
    pub fn new(id: impl Into<String>, name: impl Into<String>) -> Self {
        Self {
            id: id.into(),
            name: name.into(),
            description: None,
            metadata: HashMap::new(),
        }
    }

    /// Set description using builder pattern
    #[must_use]
    pub fn with_description(mut self, description: impl Into<String>) -> Self {
        self.description = Some(description.into());
        self
    }

    /// Add metadata entry
    #[must_use]
    pub fn with_metadata(mut self, key: impl Into<String>, value: impl Into<String>) -> Self {
        self.metadata.insert(key.into(), value.into());
        self
    }
}

// ============================================
// TRAITS
// ============================================

/// Repository trait for data access abstraction
pub trait Repository: Send + Sync {
    /// Get entity by ID
    fn get(&self, id: &str) -> MyResult<Option<Entity>>;

    /// Save entity
    fn save(&self, entity: &Entity) -> MyResult<()>;

    /// Delete entity by ID
    fn delete(&self, id: &str) -> MyResult<bool>;

    /// List all entities
    fn list(&self) -> MyResult<Vec<Entity>>;
}

// ============================================
// SERVICE
// ============================================

/// Main service providing business logic
pub struct Service<R: Repository> {
    config: Config,
    repository: Arc<R>,
}

impl<R: Repository> Service<R> {
    /// Create a new service instance
    pub fn new(config: Config, repository: R) -> MyResult<Self> {
        config.validate()?;
        Ok(Self {
            config,
            repository: Arc::new(repository),
        })
    }

    /// Get the current configuration
    pub fn config(&self) -> &Config {
        &self.config
    }

    /// Create a new entity
    pub fn create(&self, id: &str, name: &str) -> MyResult<Entity> {
        if id.is_empty() {
            return Err(MyError::Validation {
                message: "id cannot be empty".into(),
                field: Some("id".into()),
            });
        }

        let entity = Entity::new(id, name);
        self.repository.save(&entity)?;

        if self.config.debug {
            tracing::debug!(?entity, "Created entity");
        }

        Ok(entity)
    }

    /// Get an entity by ID
    pub fn get(&self, id: &str) -> MyResult<Entity> {
        self.repository
            .get(id)?
            .ok_or_else(|| MyError::NotFound(id.to_string()))
    }

    /// Delete an entity by ID
    pub fn delete(&self, id: &str) -> MyResult<bool> {
        self.repository.delete(id)
    }

    /// List all entities
    pub fn list(&self) -> MyResult<Vec<Entity>> {
        self.repository.list()
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/// Parse a configuration from JSON string
///
/// # Errors
///
/// Returns an error if the JSON is invalid or doesn't match the Config structure.
pub fn parse_config(json: &str) -> MyResult<Config> {
    serde_json::from_str(json).map_err(|e| MyError::Config(e.to_string()))
}

// ============================================
// TESTS
// ============================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_config_default() {
        let config = Config::default();
        assert_eq!(config.timeout, DEFAULT_TIMEOUT);
        assert_eq!(config.retries, MAX_RETRIES);
        assert!(!config.debug);
    }

    #[test]
    fn test_config_validation() {
        let config = Config::new(0, 3);
        assert!(config.validate().is_err());

        let config = Config::new(30, 3);
        assert!(config.validate().is_ok());
    }

    #[test]
    fn test_entity_builder() {
        let entity = Entity::new("1", "Test")
            .with_description("A test entity")
            .with_metadata("key", "value");

        assert_eq!(entity.id, "1");
        assert_eq!(entity.name, "Test");
        assert_eq!(entity.description, Some("A test entity".to_string()));
        assert_eq!(entity.metadata.get("key"), Some(&"value".to_string()));
    }
}
