/**
 * Vue 3 Composables Template
 * Reusable composition functions following best practices
 */

import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  readonly,
  toRefs,
  type Ref,
  type ComputedRef,
  type UnwrapRef,
} from 'vue';

// ============================================
// USE FETCH COMPOSABLE
// ============================================

interface UseFetchOptions<T> {
  /** Initial data value */
  initialData?: T;
  /** Fetch immediately on composable creation */
  immediate?: boolean;
  /** Transform response data */
  transform?: (data: unknown) => T;
}

interface UseFetchReturn<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;
  execute: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Composable for data fetching with loading and error states.
 *
 * @example
 * ```ts
 * const { data, error, isLoading, refresh } = useFetch<User[]>('/api/users');
 *
 * // In template
 * <div v-if="isLoading">Loading...</div>
 * <div v-else-if="error">{{ error.message }}</div>
 * <ul v-else>
 *   <li v-for="user in data" :key="user.id">{{ user.name }}</li>
 * </ul>
 * ```
 */
export function useFetch<T>(
  url: string | Ref<string>,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> {
  const { initialData = null, immediate = true, transform } = options;

  const data = ref<T | null>(initialData) as Ref<T | null>;
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  async function execute(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const urlValue = typeof url === 'string' ? url : url.value;
      const response = await fetch(urlValue);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      data.value = transform ? transform(result) : result;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error');
    } finally {
      isLoading.value = false;
    }
  }

  // Watch URL changes and refetch
  if (typeof url !== 'string') {
    watch(url, () => {
      execute();
    });
  }

  // Fetch immediately if requested
  if (immediate) {
    onMounted(execute);
  }

  return {
    data: readonly(data) as Ref<T | null>,
    error: readonly(error),
    isLoading: readonly(isLoading),
    execute,
    refresh: execute,
  };
}

// ============================================
// USE LOCAL STORAGE COMPOSABLE
// ============================================

/**
 * Composable for reactive localStorage with automatic serialization.
 *
 * @example
 * ```ts
 * const theme = useLocalStorage('theme', 'light');
 * theme.value = 'dark'; // Automatically persisted
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): Ref<T> {
  const storedValue = ref<T>(defaultValue) as Ref<T>;

  // Initialize from localStorage
  onMounted(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        storedValue.value = JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  });

  // Sync to localStorage on changes
  watch(
    storedValue,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
      }
    },
    { deep: true }
  );

  return storedValue;
}

// ============================================
// USE DEBOUNCE COMPOSABLE
// ============================================

/**
 * Composable for debouncing a ref value.
 *
 * @example
 * ```ts
 * const searchQuery = ref('');
 * const debouncedQuery = useDebounce(searchQuery, 300);
 *
 * watch(debouncedQuery, (query) => {
 *   // API call with debounced value
 * });
 * ```
 */
export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout>;

  watch(value, (newValue) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue as UnwrapRef<T>;
    }, delay);
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);
  });

  return readonly(debouncedValue) as Ref<T>;
}

// ============================================
// USE TOGGLE COMPOSABLE
// ============================================

interface UseToggleReturn {
  value: Ref<boolean>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

/**
 * Composable for boolean toggle state.
 *
 * @example
 * ```ts
 * const { value: isOpen, toggle, setTrue: open, setFalse: close } = useToggle();
 * ```
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const value = ref(initialValue);

  function toggle(): void {
    value.value = !value.value;
  }

  function setTrue(): void {
    value.value = true;
  }

  function setFalse(): void {
    value.value = false;
  }

  return {
    value: readonly(value),
    toggle,
    setTrue,
    setFalse,
  };
}

// ============================================
// USE MEDIA QUERY COMPOSABLE
// ============================================

/**
 * Composable for reactive media queries.
 *
 * @example
 * ```ts
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * ```
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);

  onMounted(() => {
    const mediaQuery = window.matchMedia(query);
    matches.value = mediaQuery.matches;

    const handler = (event: MediaQueryListEvent): void => {
      matches.value = event.matches;
    };

    mediaQuery.addEventListener('change', handler);

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handler);
    });
  });

  return readonly(matches);
}

// ============================================
// USE CLICK OUTSIDE COMPOSABLE
// ============================================

/**
 * Composable to detect clicks outside an element.
 *
 * @example
 * ```ts
 * const dropdownRef = ref<HTMLElement | null>(null);
 * useClickOutside(dropdownRef, () => {
 *   isOpen.value = false;
 * });
 * ```
 */
export function useClickOutside(
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent) => void
): void {
  function listener(event: MouseEvent): void {
    const el = target.value;
    if (!el || el.contains(event.target as Node)) {
      return;
    }
    handler(event);
  }

  onMounted(() => {
    document.addEventListener('mousedown', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener);
  });
}

// ============================================
// USE ASYNC STATE COMPOSABLE
// ============================================

interface UseAsyncStateReturn<T> {
  state: Ref<T>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: (...args: unknown[]) => Promise<void>;
}

/**
 * Composable for async operations with state management.
 *
 * @example
 * ```ts
 * const { state: users, isLoading, execute } = useAsyncState(
 *   async () => {
 *     const response = await fetch('/api/users');
 *     return response.json();
 *   },
 *   [] // Initial value
 * );
 * ```
 */
export function useAsyncState<T>(
  asyncFn: (...args: unknown[]) => Promise<T>,
  initialState: T
): UseAsyncStateReturn<T> {
  const state = ref(initialState) as Ref<T>;
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  async function execute(...args: unknown[]): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      state.value = await asyncFn(...args) as UnwrapRef<T>;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error');
    } finally {
      isLoading.value = false;
    }
  }

  return {
    state: readonly(state) as Ref<T>,
    isLoading: readonly(isLoading),
    error: readonly(error),
    execute,
  };
}

// ============================================
// USE COUNTER COMPOSABLE (Simple Example)
// ============================================

interface UseCounterOptions {
  min?: number;
  max?: number;
}

interface UseCounterReturn {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

/**
 * Simple counter composable with min/max bounds.
 *
 * @example
 * ```ts
 * const { count, increment, decrement, reset } = useCounter(0, { min: 0, max: 10 });
 * ```
 */
export function useCounter(
  initialValue: number = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity } = options;
  const count = ref(initialValue);

  function increment(): void {
    if (count.value < max) {
      count.value++;
    }
  }

  function decrement(): void {
    if (count.value > min) {
      count.value--;
    }
  }

  function reset(): void {
    count.value = initialValue;
  }

  function set(value: number): void {
    count.value = Math.min(Math.max(value, min), max);
  }

  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    set,
  };
}

// ============================================
// USE EVENT LISTENER COMPOSABLE
// ============================================

/**
 * Composable for adding event listeners with automatic cleanup.
 *
 * @example
 * ```ts
 * useEventListener(window, 'resize', handleResize);
 * useEventListener(buttonRef, 'click', handleClick);
 * ```
 */
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | Ref<HTMLElement | null>,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
): void {
  onMounted(() => {
    const el = target instanceof Window ? target : target.value;
    if (!el) return;
    el.addEventListener(event, handler as EventListener, options);
  });

  onUnmounted(() => {
    const el = target instanceof Window ? target : target.value;
    if (!el) return;
    el.removeEventListener(event, handler as EventListener, options);
  });
}

export default {
  useFetch,
  useLocalStorage,
  useDebounce,
  useToggle,
  useMediaQuery,
  useClickOutside,
  useAsyncState,
  useCounter,
  useEventListener,
};
