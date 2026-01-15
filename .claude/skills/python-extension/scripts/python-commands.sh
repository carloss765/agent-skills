#!/bin/bash
# Python Common Commands Reference

# ============================================
# VIRTUAL ENVIRONMENT
# ============================================

# Create virtual environment
python -m venv venv
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate      # Linux/macOS
# venv\Scripts\activate       # Windows

# Deactivate virtual environment
deactivate

# ============================================
# PACKAGE MANAGEMENT (pip)
# ============================================

# Install package
pip install package-name
pip install package-name==1.2.3

# Install from requirements
pip install -r requirements.txt

# Install in development mode
pip install -e .

# Upgrade package
pip install --upgrade package-name

# Uninstall package
pip uninstall package-name

# List installed packages
pip list
pip freeze

# Generate requirements file
pip freeze > requirements.txt

# Show package info
pip show package-name

# Check for outdated packages
pip list --outdated

# ============================================
# UV (Modern Package Manager)
# ============================================

# Install uv
pip install uv

# Create virtual environment
uv venv

# Install dependencies
uv pip install -r requirements.txt
uv pip sync requirements.txt

# Add package
uv pip install package-name

# Compile requirements
uv pip compile requirements.in -o requirements.txt

# ============================================
# POETRY
# ============================================

# Install poetry
curl -sSL https://install.python-poetry.org | python3 -

# Create new project
poetry new my-project

# Initialize in existing directory
poetry init

# Install dependencies
poetry install

# Add dependency
poetry add package-name
poetry add -D package-name  # dev dependency

# Remove dependency
poetry remove package-name

# Update dependencies
poetry update

# Run script
poetry run python script.py

# Activate shell
poetry shell

# Build package
poetry build

# Publish to PyPI
poetry publish

# ============================================
# LINTING & FORMATTING
# ============================================

# Black (formatter)
black .
black --check .

# isort (import sorter)
isort .
isort --check .

# Ruff (fast linter)
ruff check .
ruff check --fix .
ruff format .

# Flake8
flake8 .

# Pylint
pylint src/

# mypy (type checking)
mypy .
mypy src/

# ============================================
# TESTING
# ============================================

# pytest
pytest
pytest -v                    # verbose
pytest -x                    # stop on first failure
pytest --tb=short           # shorter traceback
pytest -k "test_name"       # run specific test
pytest tests/test_file.py   # run specific file
pytest --cov=src            # with coverage
pytest --cov-report=html    # coverage HTML report

# unittest
python -m unittest discover
python -m unittest tests.test_module

# ============================================
# RUNNING PYTHON
# ============================================

# Run script
python script.py
python -m module_name

# Interactive shell
python
python -i script.py  # Interactive after script

# Run module as script
python -m http.server 8000
python -m json.tool < file.json

# ============================================
# DEBUGGING
# ============================================

# Built-in debugger
python -m pdb script.py

# Breakpoint in code
# breakpoint()  # Python 3.7+

# ============================================
# PROFILING
# ============================================

# Profile script
python -m cProfile script.py
python -m cProfile -s cumulative script.py

# Memory profiling
pip install memory-profiler
python -m memory_profiler script.py

# ============================================
# BUILDING & DISTRIBUTION
# ============================================

# Build package
python -m build

# Install build tools
pip install build twine

# Upload to PyPI
twine upload dist/*

# Upload to Test PyPI
twine upload --repository testpypi dist/*

# ============================================
# JUPYTER
# ============================================

# Install Jupyter
pip install jupyter

# Start Jupyter Notebook
jupyter notebook

# Start JupyterLab
pip install jupyterlab
jupyter lab

# Convert notebook
jupyter nbconvert --to python notebook.ipynb

# ============================================
# ENVIRONMENT VARIABLES
# ============================================

# python-dotenv
pip install python-dotenv
# from dotenv import load_dotenv; load_dotenv()

# ============================================
# DOCUMENTATION
# ============================================

# Sphinx
pip install sphinx
sphinx-quickstart docs/
sphinx-build -b html docs/ docs/_build/

# pdoc (simpler)
pip install pdoc
pdoc --html src/
