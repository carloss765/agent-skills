/**
 * React Functional Component Template
 * Modern React with TypeScript, hooks, and best practices
 */

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type ForwardedRef,
} from 'react';

// ============================================
// TYPES & INTERFACES
// ============================================

interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  /** Main content label */
  title: string;
  /** Optional description text */
  description?: string;
  /** Variant style */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Child elements */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Custom class names */
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

/**
 * Example React functional component with best practices.
 *
 * @example
 * ```tsx
 * <Component
 *   title="Hello"
 *   description="World"
 *   variant="primary"
 *   onClick={() => console.log('clicked')}
 * >
 *   Content here
 * </Component>
 * ```
 */
export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  function Component(
    {
      title,
      description,
      variant = 'primary',
      isLoading = false,
      disabled = false,
      children,
      onClick,
      className,
      ...rest
    }: ComponentProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    // ============================================
    // STATE
    // ============================================
    const [isExpanded, setIsExpanded] = useState(false);

    // ============================================
    // EFFECTS
    // ============================================
    useEffect(() => {
      // Effect runs on mount and when dependencies change
      console.log('Component mounted or title changed:', title);

      // Cleanup function
      return () => {
        console.log('Component will unmount or title will change');
      };
    }, [title]);

    // ============================================
    // MEMOIZED VALUES
    // ============================================
    const variantClasses = useMemo(() => {
      const classes: Record<typeof variant, string> = {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        outline: 'border border-gray-300 text-gray-700',
      };
      return classes[variant];
    }, [variant]);

    // ============================================
    // CALLBACKS
    // ============================================
    const handleClick = useCallback(() => {
      if (disabled || isLoading) return;
      setIsExpanded((prev) => !prev);
      onClick?.();
    }, [disabled, isLoading, onClick]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      },
      [handleClick]
    );

    // ============================================
    // EARLY RETURNS
    // ============================================
    if (isLoading) {
      return (
        <div className="animate-pulse bg-gray-200 rounded p-4">
          Loading...
        </div>
      );
    }

    // ============================================
    // RENDER
    // ============================================
    return (
      <div
        ref={ref}
        className={`
          p-4 rounded-lg transition-all duration-200
          ${variantClasses}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className ?? ''}
        `.trim()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isExpanded}
        aria-disabled={disabled}
        {...rest}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {isExpanded && (
            <span className="text-sm">▼</span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-2 text-sm opacity-80">{description}</p>
        )}

        {/* Expandable Content */}
        {isExpanded && children && (
          <div className="mt-4 pt-4 border-t border-current border-opacity-20">
            {children}
          </div>
        )}
      </div>
    );
  }
);

// Set display name for DevTools
Component.displayName = 'Component';

// ============================================
// DEFAULT EXPORT
// ============================================
export default Component;
