"""
Module Template - Python Best Practices

This module demonstrates Python conventions and patterns including:
- Type hints (PEP 484)
- Docstrings (Google style)
- Error handling
- Dataclasses
- Context managers
"""

from __future__ import annotations

import logging
from contextlib import contextmanager
from dataclasses import dataclass, field
from enum import Enum, auto
from typing import TYPE_CHECKING, Any, Generator, TypeVar

if TYPE_CHECKING:
    from collections.abc import Callable

# ============================================
# CONSTANTS
# ============================================

DEFAULT_TIMEOUT = 30
MAX_RETRIES = 3

# ============================================
# LOGGING
# ============================================

logger = logging.getLogger(__name__)

# ============================================
# ENUMS
# ============================================


class Status(Enum):
    """Enumeration of possible statuses."""

    PENDING = auto()
    ACTIVE = auto()
    COMPLETED = auto()
    FAILED = auto()


# ============================================
# EXCEPTIONS
# ============================================


class ModuleError(Exception):
    """Base exception for this module."""

    pass


class ValidationError(ModuleError):
    """Raised when validation fails."""

    def __init__(self, message: str, field: str | None = None) -> None:
        self.field = field
        super().__init__(message)


class NotFoundError(ModuleError):
    """Raised when a resource is not found."""

    pass


# ============================================
# DATACLASSES
# ============================================


@dataclass
class Config:
    """Configuration settings for the service.

    Attributes:
        timeout: Request timeout in seconds.
        retries: Number of retry attempts.
        debug: Enable debug mode.
    """

    timeout: int = DEFAULT_TIMEOUT
    retries: int = MAX_RETRIES
    debug: bool = False

    def __post_init__(self) -> None:
        """Validate configuration after initialization."""
        if self.timeout <= 0:
            raise ValidationError("Timeout must be positive", field="timeout")
        if self.retries < 0:
            raise ValidationError("Retries cannot be negative", field="retries")


@dataclass
class Entity:
    """Represents a domain entity.

    Attributes:
        id: Unique identifier.
        name: Entity name.
        status: Current status.
        metadata: Additional metadata.
    """

    id: str
    name: str
    status: Status = Status.PENDING
    metadata: dict[str, Any] = field(default_factory=dict)


# ============================================
# TYPE VARIABLES
# ============================================

T = TypeVar("T")


# ============================================
# FUNCTIONS
# ============================================


def validate_input(value: str, min_length: int = 1) -> str:
    """Validate input string.

    Args:
        value: The string to validate.
        min_length: Minimum required length.

    Returns:
        The validated string.

    Raises:
        ValidationError: If validation fails.

    Examples:
        >>> validate_input("hello")
        'hello'
        >>> validate_input("")
        Traceback (most recent call last):
            ...
        ValidationError: Value cannot be empty
    """
    if not value or len(value) < min_length:
        raise ValidationError(f"Value must be at least {min_length} characters")
    return value.strip()


def process_items(
    items: list[T],
    processor: Callable[[T], T],
    *,
    skip_errors: bool = False,
) -> list[T]:
    """Process a list of items with the given processor function.

    Args:
        items: List of items to process.
        processor: Function to apply to each item.
        skip_errors: If True, continue processing on errors.

    Returns:
        List of processed items.

    Raises:
        ModuleError: If processing fails and skip_errors is False.
    """
    results: list[T] = []

    for item in items:
        try:
            processed = processor(item)
            results.append(processed)
        except Exception as e:
            logger.error(f"Error processing item: {e}")
            if not skip_errors:
                raise ModuleError(f"Processing failed: {e}") from e

    return results


# ============================================
# CONTEXT MANAGERS
# ============================================


@contextmanager
def managed_resource(name: str) -> Generator[dict[str, Any], None, None]:
    """Context manager for managing a resource.

    Args:
        name: Name of the resource.

    Yields:
        Resource dictionary.

    Examples:
        >>> with managed_resource("test") as resource:
        ...     resource["data"] = "value"
    """
    logger.debug(f"Acquiring resource: {name}")
    resource: dict[str, Any] = {"name": name, "active": True}

    try:
        yield resource
    finally:
        resource["active"] = False
        logger.debug(f"Releasing resource: {name}")


# ============================================
# CLASSES
# ============================================


class Service:
    """Service class demonstrating Python OOP patterns.

    Attributes:
        config: Service configuration.

    Examples:
        >>> service = Service()
        >>> entity = service.create("test", "Test Entity")
        >>> entity.name
        'Test Entity'
    """

    def __init__(self, config: Config | None = None) -> None:
        """Initialize the service.

        Args:
            config: Optional configuration. Uses defaults if not provided.
        """
        self.config = config or Config()
        self._entities: dict[str, Entity] = {}
        logger.info("Service initialized")

    def create(self, id: str, name: str, **metadata: Any) -> Entity:
        """Create a new entity.

        Args:
            id: Unique identifier for the entity.
            name: Name of the entity.
            **metadata: Additional metadata key-value pairs.

        Returns:
            The created entity.

        Raises:
            ValidationError: If id or name is invalid.
        """
        validated_id = validate_input(id)
        validated_name = validate_input(name)

        entity = Entity(
            id=validated_id,
            name=validated_name,
            metadata=metadata,
        )
        self._entities[validated_id] = entity
        logger.info(f"Created entity: {validated_id}")
        return entity

    def get(self, id: str) -> Entity:
        """Get an entity by ID.

        Args:
            id: Entity identifier.

        Returns:
            The requested entity.

        Raises:
            NotFoundError: If entity does not exist.
        """
        if id not in self._entities:
            raise NotFoundError(f"Entity not found: {id}")
        return self._entities[id]

    def update_status(self, id: str, status: Status) -> Entity:
        """Update entity status.

        Args:
            id: Entity identifier.
            status: New status.

        Returns:
            The updated entity.
        """
        entity = self.get(id)
        entity.status = status
        logger.info(f"Updated entity {id} status to {status.name}")
        return entity

    def delete(self, id: str) -> None:
        """Delete an entity.

        Args:
            id: Entity identifier.

        Raises:
            NotFoundError: If entity does not exist.
        """
        if id not in self._entities:
            raise NotFoundError(f"Entity not found: {id}")
        del self._entities[id]
        logger.info(f"Deleted entity: {id}")

    def list_all(self, status: Status | None = None) -> list[Entity]:
        """List all entities, optionally filtered by status.

        Args:
            status: Optional status filter.

        Returns:
            List of entities.
        """
        entities = list(self._entities.values())
        if status is not None:
            entities = [e for e in entities if e.status == status]
        return entities


# ============================================
# MAIN BLOCK (for testing/examples)
# ============================================

if __name__ == "__main__":
    # Configure logging for development
    logging.basicConfig(level=logging.DEBUG)

    # Example usage
    service = Service(Config(timeout=60, debug=True))
    entity = service.create("1", "Test Entity", key="value")
    print(f"Created: {entity}")

    service.update_status("1", Status.ACTIVE)
    print(f"Updated: {service.get('1')}")
