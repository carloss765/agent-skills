/**
 * JavaScript Class Template
 * Modern ES6+ class pattern with best practices
 */

// ============================================
// CUSTOM ERROR CLASS
// ============================================

/**
 * Custom error for domain-specific errors
 */
export class ServiceError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.details = details;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }
  }
}

// ============================================
// MAIN CLASS
// ============================================

/**
 * Example service class with modern JavaScript patterns
 */
export class DataService {
  // Private class fields (ES2022+)
  #config;
  #cache = new Map();
  #isInitialized = false;

  // Static properties
  static DEFAULT_OPTIONS = {
    cacheEnabled: true,
    cacheTTL: 60000, // 1 minute
    baseUrl: '/api',
  };

  /**
   * Creates a new DataService instance
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.#config = { ...DataService.DEFAULT_OPTIONS, ...options };
  }

  // ============================================
  // PUBLIC METHODS
  // ============================================

  /**
   * Initializes the service
   * @returns {Promise<void>}
   */
  async initialize() {
    if (this.#isInitialized) {
      console.warn('Service already initialized');
      return;
    }

    // Perform initialization logic
    await this.#validateConnection();
    this.#isInitialized = true;
    console.log('Service initialized successfully');
  }

  /**
   * Fetches data by ID
   * @param {string} id - Resource ID
   * @returns {Promise<Object>} - Fetched data
   */
  async getById(id) {
    this.#ensureInitialized();

    // Check cache first
    if (this.#config.cacheEnabled) {
      const cached = this.#getFromCache(id);
      if (cached) {
        return cached;
      }
    }

    // Fetch from API
    const data = await this.#fetch(`/items/${id}`);

    // Store in cache
    if (this.#config.cacheEnabled) {
      this.#setCache(id, data);
    }

    return data;
  }

  /**
   * Fetches all data with optional filters
   * @param {Object} filters - Query filters
   * @returns {Promise<Array>} - Array of items
   */
  async getAll(filters = {}) {
    this.#ensureInitialized();

    const queryString = new URLSearchParams(filters).toString();
    const endpoint = queryString ? `/items?${queryString}` : '/items';

    return this.#fetch(endpoint);
  }

  /**
   * Creates a new item
   * @param {Object} data - Item data
   * @returns {Promise<Object>} - Created item
   */
  async create(data) {
    this.#ensureInitialized();
    this.#validateData(data);

    const result = await this.#fetch('/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Invalidate related cache
    this.clearCache();

    return result;
  }

  /**
   * Updates an existing item
   * @param {string} id - Item ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} - Updated item
   */
  async update(id, data) {
    this.#ensureInitialized();
    this.#validateData(data);

    const result = await this.#fetch(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    // Update cache
    if (this.#config.cacheEnabled) {
      this.#setCache(id, result);
    }

    return result;
  }

  /**
   * Deletes an item
   * @param {string} id - Item ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    this.#ensureInitialized();

    await this.#fetch(`/items/${id}`, {
      method: 'DELETE',
    });

    // Remove from cache
    this.#cache.delete(id);
  }

  /**
   * Clears the cache
   */
  clearCache() {
    this.#cache.clear();
    console.log('Cache cleared');
  }

  // ============================================
  // GETTERS & SETTERS
  // ============================================

  /**
   * Gets the current configuration
   * @returns {Object} - Configuration object
   */
  get config() {
    return { ...this.#config }; // Return a copy to prevent mutation
  }

  /**
   * Checks if the service is initialized
   * @returns {boolean}
   */
  get isInitialized() {
    return this.#isInitialized;
  }

  /**
   * Gets the cache size
   * @returns {number}
   */
  get cacheSize() {
    return this.#cache.size;
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Ensures the service is initialized before operations
   * @private
   */
  #ensureInitialized() {
    if (!this.#isInitialized) {
      throw new ServiceError(
        'Service not initialized. Call initialize() first.',
        'NOT_INITIALIZED'
      );
    }
  }

  /**
   * Validates data before create/update
   * @param {Object} data - Data to validate
   * @private
   */
  #validateData(data) {
    if (!data || typeof data !== 'object') {
      throw new ServiceError('Invalid data provided', 'INVALID_DATA');
    }

    // Add more validation as needed
  }

  /**
   * Validates API connection
   * @private
   */
  async #validateConnection() {
    try {
      await this.#fetch('/health');
    } catch (error) {
      throw new ServiceError(
        'Failed to connect to API',
        'CONNECTION_ERROR',
        { originalError: error.message }
      );
    }
  }

  /**
   * Performs HTTP fetch with common configuration
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} - Response data
   * @private
   */
  async #fetch(endpoint, options = {}) {
    const url = `${this.#config.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ServiceError(
        `API request failed: ${response.statusText}`,
        'API_ERROR',
        { status: response.status, endpoint }
      );
    }

    // Handle empty responses (e.g., DELETE)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  /**
   * Gets an item from cache if not expired
   * @param {string} key - Cache key
   * @returns {Object|null} - Cached data or null
   * @private
   */
  #getFromCache(key) {
    const cached = this.#cache.get(key);

    if (!cached) {
      return null;
    }

    if (Date.now() - cached.timestamp > this.#config.cacheTTL) {
      this.#cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Sets an item in cache with timestamp
   * @param {string} key - Cache key
   * @param {Object} data - Data to cache
   * @private
   */
  #setCache(key, data) {
    this.#cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  // ============================================
  // STATIC METHODS
  // ============================================

  /**
   * Factory method to create and initialize a service
   * @param {Object} options - Configuration options
   * @returns {Promise<DataService>} - Initialized service instance
   */
  static async create(options = {}) {
    const service = new DataService(options);
    await service.initialize();
    return service;
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================
/*
// Using the class
const service = await DataService.create({
  baseUrl: 'https://api.example.com',
  cacheEnabled: true,
});

const items = await service.getAll({ status: 'active' });
const item = await service.getById('123');
const newItem = await service.create({ name: 'New Item' });
*/

export default DataService;
