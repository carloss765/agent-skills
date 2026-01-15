/**
 * React Custom Hook Template
 * Reusable hook patterns with TypeScript
 */

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';

// ============================================
// USE FETCH HOOK
// ============================================

interface UseFetchOptions {
  /** Whether to fetch immediately on mount */
  immediate?: boolean;
  /** Dependencies that trigger refetch */
  deps?: unknown[];
}

interface UseFetchReturn<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for data fetching with loading and error states.
 *
 * @example
 * ```tsx
 * const { data, error, isLoading, refetch } = useFetch<User[]>(
 *   '/api/users',
 *   { immediate: true }
 * );
 * ```
 */
export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const { immediate = true, deps = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(immediate);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...deps]);

  return { data, error, isLoading, refetch: fetchData };
}

// ============================================
// USE LOCAL STORAGE HOOK
// ============================================

/**
 * Custom hook for persisting state to localStorage.
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync to localStorage when value changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

// ============================================
// USE DEBOUNCE HOOK
// ============================================

/**
 * Custom hook for debouncing a value.
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 300);
 *
 * useEffect(() => {
 *   // API call with debouncedSearch
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// USE PREVIOUS HOOK
// ============================================

/**
 * Custom hook to get the previous value of a state.
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * // prevCount will be undefined on first render, then previous count
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// ============================================
// USE TOGGLE HOOK
// ============================================

/**
 * Custom hook for boolean toggle state.
 *
 * @example
 * ```tsx
 * const [isOpen, toggle, setIsOpen] = useToggle(false);
 * // <button onClick={toggle}>Toggle</button>
 * // <button onClick={() => setIsOpen(true)}>Open</button>
 * ```
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle, setValue];
}

// ============================================
// USE MEDIA QUERY HOOK
// ============================================

/**
 * Custom hook for responsive media queries.
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

// ============================================
// USE CLICK OUTSIDE HOOK
// ============================================

/**
 * Custom hook to detect clicks outside an element.
 *
 * @example
 * ```tsx
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * useClickOutside(dropdownRef, () => setIsOpen(false));
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// ============================================
// USE INTERSECTION OBSERVER HOOK
// ============================================

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for intersection observer API.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const entry = useIntersectionObserver(ref, { threshold: 0.5 });
 * const isVisible = entry?.isIntersecting;
 * ```
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | null {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef.current;
    if (!node || frozen) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

export default {
  useFetch,
  useLocalStorage,
  useDebounce,
  usePrevious,
  useToggle,
  useMediaQuery,
  useClickOutside,
  useIntersectionObserver,
};
