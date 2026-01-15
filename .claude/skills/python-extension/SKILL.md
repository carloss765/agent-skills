---
name: python-development
description: Best practices for writing clean, Pythonic, and maintainable Python code. Use when working with .py files, Python applications, data science projects, or backend services.
globs: ".py"
---

# Python Development Skills

## When to Use This Skill

Use this skill when:
- Writing or refactoring Python code (.py files)
- Developing backend services, APIs, or web applications
- Working on data science, machine learning, or automation projects
- Creating Python packages or libraries
- Debugging or optimizing Python code

## I. Pythonic Principles (PEP 8 & Beyond)

- **PEP 8 Compliance**: Follow PEP 8 style guide strictly (indentation, naming, line length).
- **Zen of Python**: Embrace "import this" principles - explicit is better than implicit, simple is better than complex.
- **Type Hints**: Use type hints (PEP 484) for function signatures and complex variables.
- **Snake Case**: Use snake_case for functions and variables, PascalCase for classes, UPPER_CASE for constants.
- **Docstrings**: Write docstrings for all public modules, functions, classes, and methods (PEP 257).

## II. Code Structure & Organization

- **Module Organization**: Structure projects with clear separation (src/, tests/, docs/).
- **Package Structure**: Use __init__.py for package initialization and public API exposure.
- **Import Order**: Group imports (standard library, third-party, local) with blank lines between.
- **Absolute Imports**: Prefer absolute imports over relative except within packages.
- **Single Responsibility**: Each function, class, and module should have one clear purpose.

## III. Functions & Methods

- **Function Length**: Keep functions focused and concise (ideally under 25 lines).
- **Default Arguments**: Use immutable defaults. Never use mutable defaults ([], {}).
- **Keyword Arguments**: Use keyword arguments for clarity, especially with multiple parameters.
- ***args and **kwargs**: Use sparingly and document their purpose.
- **Return Early**: Use guard clauses to reduce nesting and improve readability.
- **Pure Functions**: Prefer pure functions without side effects when possible.

## IV. Data Structures & Collections

- **List Comprehensions**: Use comprehensions for simple transformations. Avoid complex nested comprehensions.
- **Generator Expressions**: Use generators for large datasets to save memory.
- **Dictionary Operations**: Use dict.get() for safe key access. Use defaultdict or setdefault when appropriate.
- **Sets for Membership**: Use sets for fast membership testing and removing duplicates.
- **Unpacking**: Use tuple/list unpacking for multiple assignments and function returns.
- **Enums**: Use Enum for related constants instead of magic strings or numbers.

## V. Object-Oriented Programming

- **Data Classes**: Use @dataclass (Python 3.7+) for simple data containers.
- **Properties**: Use @property for getters, @setter for setters instead of direct attribute access.
- **Dunder Methods**: Implement __str__, __repr__, __eq__ for custom classes.
- **Inheritance**: Favor composition over inheritance. Use ABC for abstract base classes.
- **Class vs Instance Attributes**: Understand the difference. Be careful with mutable class attributes.
- **Method Types**: Use @staticmethod for utility methods, @classmethod for alternate constructors.

## VI. Error Handling

- **Specific Exceptions**: Catch specific exceptions, not bare except.
- **Custom Exceptions**: Create custom exception classes for domain-specific errors.
- **EAFP Principle**: Use "Easier to Ask Forgiveness than Permission" - try/except over if checks.
- **Context Managers**: Use with statements for resource management (files, locks, connections).
- **Finally Blocks**: Use finally for cleanup that must run regardless of exceptions.
- **Error Messages**: Provide clear, actionable error messages.

## VII. Type Hints & Static Analysis

- **Gradual Typing**: Add type hints incrementally, focusing on public APIs first.
- **Common Types**: Use List, Dict, Tuple, Optional, Union from typing module.
- **Generics**: Use TypeVar for generic functions and classes.
- **Protocol**: Use Protocol for structural subtyping (duck typing with types).
- **Type Checkers**: Run mypy or pyright for static type checking.
- **Runtime Validation**: Use pydantic or similar for runtime validation of complex types.

## VIII. Asynchronous Programming

- **Async/Await**: Use async/await for I/O-bound concurrent operations.
- **Event Loop**: Understand asyncio event loop and avoid blocking operations.
- **Async Context Managers**: Use async with for asynchronous resource management.
- **Gather vs Wait**: Use asyncio.gather() for concurrent tasks, wait() for conditional waiting.
- **Sync vs Async**: Don't mix synchronous and asynchronous code carelessly.

## IX. Performance & Optimization

- **Profile First**: Use cProfile or line_profiler before optimizing.
- **List vs Generator**: Use generators for large datasets or streaming data.
- **Local Variables**: Access local variables is faster than global or attribute access.
- **String Concatenation**: Use join() for concatenating many strings, not +.
- **Caching**: Use @lru_cache for expensive pure function calls.
- **NumPy**: Use NumPy for numerical operations instead of loops when possible.

## X. Testing

- **pytest Over unittest**: Prefer pytest for its simplicity and powerful features.
- **Test Organization**: Mirror source structure in tests/ directory.
- **Fixtures**: Use pytest fixtures for setup and teardown.
- **Parametrize**: Use @pytest.mark.parametrize for testing multiple inputs.
- **Coverage**: Aim for high test coverage but focus on critical paths.
- **Mocking**: Use unittest.mock for isolating units under test.

## XI. Dependencies & Environment

- **Virtual Environments**: Always use venv or virtualenv for project isolation.
- **Requirements Files**: Maintain requirements.txt or use pyproject.toml (PEP 518).
- **Pinned Versions**: Pin exact versions for reproducible builds (requirements-lock.txt).
- **Poetry/Pipenv**: Consider modern dependency managers for complex projects.
- **Python Version**: Specify minimum Python version in setup.py or pyproject.toml.

## XII. Common Patterns

**Good Patterns:**
- Context managers for resource management
- Decorators for cross-cutting concerns
- Generators for lazy evaluation
- Factory functions for object creation
- Strategy pattern with callable objects

**Anti-Patterns to Avoid:**
- Mutable default arguments
- Catching Exception or BaseException
- Using global variables
- Star imports (from module import *)
- Bare except clauses
- Not closing file handles

## XIII. Documentation

- **Module Docstrings**: Document module purpose at the top of each file.
- **Function Docstrings**: Use Google or NumPy style for consistency.
- **Type Information**: Include parameter and return types in docstrings if not using type hints.
- **Examples**: Provide usage examples in docstrings for complex functions.
- **README**: Maintain comprehensive README.md with usage examples.

## XIV. Best Practices Checklist

Before submitting Python code, verify:
- [ ] PEP 8 compliant (use black or autopep8)
- [ ] Type hints on public functions
- [ ] Docstrings on all public APIs
- [ ] No mutable default arguments
- [ ] Specific exception handling
- [ ] Context managers for resources
- [ ] List comprehensions are readable
- [ ] No unused imports or variables
- [ ] Tests written and passing
- [ ] Virtual environment used
