/**
 * JavaScript Module Template
 * Modern ES6+ module pattern with best practices
 */

// ============================================
// IMPORTS
// ============================================
// import { someFunction } from './other-module.js';
// import * as utils from './utils.js';

// ============================================
// CONSTANTS
// ============================================
const DEFAULT_CONFIG = {
  timeout: 5000,
  retries: 3,
  baseUrl: '/api',
};

// ============================================
// PRIVATE FUNCTIONS (not exported)
// ============================================

/**
 * Validates the configuration object
 * @param {Object} config - Configuration to validate
 * @returns {boolean} - Whether config is valid
 */
const validateConfig = (config) => {
  if (!config || typeof config !== 'object') {
    return false;
  }
  return true;
};

/**
 * Delays execution for specified milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// PUBLIC FUNCTIONS (exported)
// ============================================

/**
 * Creates a new instance with the given configuration
 * @param {Object} userConfig - User configuration
 * @returns {Object} - Module instance
 */
export const createInstance = (userConfig = {}) => {
  const config = { ...DEFAULT_CONFIG, ...userConfig };

  if (!validateConfig(config)) {
    throw new Error('Invalid configuration provided');
  }

  return {
    config,
    // Add instance methods here
  };
};

/**
 * Fetches data from the API with retry logic
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - Response data
 */
export const fetchWithRetry = async (endpoint, options = {}) => {
  const { retries = DEFAULT_CONFIG.retries, timeout = DEFAULT_CONFIG.timeout } = options;

  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(endpoint, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt + 1} failed:`, error.message);

      if (attempt < retries - 1) {
        await delay(1000 * (attempt + 1)); // Exponential backoff
      }
    }
  }

  throw new Error(`Failed after ${retries} attempts: ${lastError?.message}`);
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;

  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep clones an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
  );
};

/**
 * Formats a date to a readable string
 * @param {Date|string|number} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

// ============================================
// DEFAULT EXPORT (optional)
// ============================================
export default {
  createInstance,
  fetchWithRetry,
  debounce,
  throttle,
  deepClone,
  formatDate,
};
