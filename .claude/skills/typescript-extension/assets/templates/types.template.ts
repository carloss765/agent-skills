/**
 * TypeScript Type Patterns Template
 * Common type patterns and utilities
 */

// ============================================
// BASIC TYPE ALIASES
// ============================================

/** Unique identifier type */
export type ID = string;

/** ISO date string */
export type ISODateString = string;

/** Nullable type helper */
export type Nullable<T> = T | null;

/** Optional type helper */
export type Optional<T> = T | undefined;

/** Maybe type (nullable or undefined) */
export type Maybe<T> = T | null | undefined;

// ============================================
// OBJECT TYPES
// ============================================

/** Base entity with common fields */
export interface BaseEntity {
  id: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** User entity */
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  metadata?: Record<string, unknown>;
}

/** User roles enum */
export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

// ============================================
// DISCRIMINATED UNIONS
// ============================================

/** API response success state */
interface ApiSuccess<T> {
  status: 'success';
  data: T;
}

/** API response error state */
interface ApiError {
  status: 'error';
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/** API response loading state */
interface ApiLoading {
  status: 'loading';
}

/** Discriminated union for API state */
export type ApiState<T> = ApiSuccess<T> | ApiError | ApiLoading;

/** Type guard for success state */
export function isApiSuccess<T>(state: ApiState<T>): state is ApiSuccess<T> {
  return state.status === 'success';
}

/** Type guard for error state */
export function isApiError<T>(state: ApiState<T>): state is ApiError {
  return state.status === 'error';
}

// ============================================
// UTILITY TYPES
// ============================================

/** Make specific properties required */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific properties optional */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make all properties deeply partial */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/** Make all properties deeply required */
export type DeepRequired<T> = T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T;

/** Make all properties deeply readonly */
export type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

/** Extract keys of type from object */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/** Omit by value type */
export type OmitByType<T, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K];
};

/** Pick by value type */
export type PickByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

// ============================================
// BRANDED TYPES (Nominal Typing)
// ============================================

/** Brand for nominal typing */
declare const __brand: unique symbol;

/** Branded type helper */
export type Brand<T, B> = T & { [__brand]: B };

/** User ID (branded string) */
export type UserId = Brand<string, 'UserId'>;

/** Product ID (branded string) */
export type ProductId = Brand<string, 'ProductId'>;

/** Email (branded string) */
export type Email = Brand<string, 'Email'>;

/** Create branded type */
export function createUserId(id: string): UserId {
  return id as UserId;
}

export function createEmail(email: string): Email {
  // Add validation if needed
  return email as Email;
}

// ============================================
// FUNCTION TYPES
// ============================================

/** Generic async function type */
export type AsyncFunction<T = void, Args extends unknown[] = []> = (
  ...args: Args
) => Promise<T>;

/** Event handler type */
export type EventHandler<E = Event> = (event: E) => void;

/** Callback function type */
export type Callback<T = void> = () => T;

/** Predicate function type */
export type Predicate<T> = (value: T) => boolean;

/** Mapper function type */
export type Mapper<T, U> = (value: T) => U;

/** Reducer function type */
export type Reducer<T, U> = (accumulator: U, current: T) => U;

// ============================================
// TUPLE TYPES
// ============================================

/** Key-value pair tuple */
export type KeyValuePair<K = string, V = unknown> = readonly [K, V];

/** Result tuple (value or error) */
export type Result<T, E = Error> = readonly [T, null] | readonly [null, E];

/** Create success result */
export function success<T>(value: T): Result<T, never> {
  return [value, null] as const;
}

/** Create error result */
export function failure<E>(error: E): Result<never, E> {
  return [null, error] as const;
}

// ============================================
// CONDITIONAL TYPES
// ============================================

/** Extract non-nullable type */
export type NonNullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : undefined extends T[K] ? never : K;
}[keyof T];

/** Extract promise value type */
export type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

/** Extract array element type */
export type ArrayElement<T> = T extends readonly (infer E)[] ? E : never;

/** Extract function return type (built-in: ReturnType) */
export type FunctionReturn<T> = T extends (...args: never[]) => infer R ? R : never;

/** Extract function parameters (built-in: Parameters) */
export type FunctionParams<T> = T extends (...args: infer P) => unknown ? P : never;

// ============================================
// MAPPED TYPES WITH MODIFIERS
// ============================================

/** Make all keys mutable */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/** Add prefix to all keys */
export type Prefixed<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};

/** Get setter names */
export type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

/** Get getter names */
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ============================================
// TEMPLATE LITERAL TYPES
// ============================================

/** Event names pattern */
export type EventName = `on${Capitalize<string>}`;

/** HTTP methods */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** API endpoint pattern */
export type ApiEndpoint = `/${string}`;

/** CSS units */
export type CSSUnit = `${number}${'px' | 'rem' | 'em' | '%' | 'vh' | 'vw'}`;

// ============================================
// TYPE ASSERTIONS & GUARDS
// ============================================

/** Assert type is defined */
export function assertDefined<T>(
  value: T | null | undefined,
  message = 'Value is not defined'
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

/** Check if value is object */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Check if value is non-empty string */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

/** Check if value has property */
export function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

// ============================================
// EXAMPLE USAGE
// ============================================

// Example: Using discriminated union
function handleApiState<T>(state: ApiState<T>): void {
  switch (state.status) {
    case 'loading':
      console.log('Loading...');
      break;
    case 'success':
      console.log('Data:', state.data);
      break;
    case 'error':
      console.error('Error:', state.error.message);
      break;
  }
}

// Example: Using branded types prevents mixing IDs
function getUser(id: UserId): User | null {
  // Implementation
  return null;
}

// const userId = createUserId('123');
// const productId = createProductId('456');
// getUser(userId);    // ✅ OK
// getUser(productId); // ❌ Type error - cannot pass ProductId where UserId expected
