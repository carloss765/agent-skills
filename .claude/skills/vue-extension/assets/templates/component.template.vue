<script setup lang="ts">
/**
 * Vue 3 Component Template
 * Using Composition API with script setup and TypeScript
 */

import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  toRefs,
  type PropType,
} from 'vue';

// ============================================
// TYPES
// ============================================

interface Item {
  id: string;
  name: string;
  description?: string;
}

type Variant = 'primary' | 'secondary' | 'outline';

// ============================================
// PROPS
// ============================================

interface Props {
  /** Main title */
  title: string;
  /** List of items */
  items?: Item[];
  /** Component variant */
  variant?: Variant;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: 'primary',
  loading: false,
  disabled: false,
});

// ============================================
// EMITS
// ============================================

interface Emits {
  (e: 'select', item: Item): void;
  (e: 'delete', id: string): void;
  (e: 'update:modelValue', value: string): void;
}

const emit = defineEmits<Emits>();

// ============================================
// REACTIVE STATE
// ============================================

// Single values with ref
const searchQuery = ref('');
const selectedId = ref<string | null>(null);
const isExpanded = ref(false);

// Complex state with reactive
const state = reactive({
  filter: '',
  sortOrder: 'asc' as 'asc' | 'desc',
  page: 1,
});

// ============================================
// COMPUTED PROPERTIES
// ============================================

const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return props.items;
  }
  const query = searchQuery.value.toLowerCase();
  return props.items.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
  );
});

const hasItems = computed(() => filteredItems.value.length > 0);

const variantClasses = computed(() => {
  const classes: Record<Variant, string> = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border-2 border-gray-300 hover:border-gray-400',
  };
  return classes[props.variant];
});

// ============================================
// WATCHERS
// ============================================

// Watch specific ref
watch(searchQuery, (newValue, oldValue) => {
  console.log(`Search changed from "${oldValue}" to "${newValue}"`);
});

// Watch with options
watch(
  () => props.items,
  (newItems) => {
    console.log('Items updated:', newItems.length);
  },
  { deep: true, immediate: true }
);

// Watch multiple sources
watch([searchQuery, () => state.sortOrder], ([query, order]) => {
  console.log(`Query: ${query}, Order: ${order}`);
});

// WatchEffect - auto-tracks dependencies
watchEffect((onCleanup) => {
  if (selectedId.value) {
    console.log('Selected item:', selectedId.value);
  }

  // Cleanup function
  onCleanup(() => {
    // Cleanup logic here
  });
});

// ============================================
// METHODS
// ============================================

function handleSelect(item: Item): void {
  if (props.disabled) return;
  selectedId.value = item.id;
  emit('select', item);
}

function handleDelete(id: string): void {
  if (props.disabled) return;
  emit('delete', id);
}

function toggleExpanded(): void {
  isExpanded.value = !isExpanded.value;
}

function clearSearch(): void {
  searchQuery.value = '';
}

// ============================================
// LIFECYCLE HOOKS
// ============================================

onMounted(() => {
  console.log('Component mounted');
  // Initialize data, add event listeners, etc.
});

onUnmounted(() => {
  console.log('Component will unmount');
  // Cleanup: remove event listeners, cancel requests, etc.
});

// ============================================
// EXPOSE (for parent component access)
// ============================================

defineExpose({
  clearSearch,
  toggleExpanded,
});
</script>

<template>
  <div
    class="component-wrapper"
    :class="[variantClasses, { 'opacity-50': disabled }]"
  >
    <!-- Header -->
    <header class="component-header">
      <h2 class="title">{{ title }}</h2>
      <button
        type="button"
        class="toggle-btn"
        :aria-expanded="isExpanded"
        @click="toggleExpanded"
      >
        {{ isExpanded ? '▼' : '▶' }}
      </button>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <span class="spinner" />
      Loading...
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Search Input -->
      <div class="search-wrapper">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search items..."
          class="search-input"
          :disabled="disabled"
        >
        <button
          v-if="searchQuery"
          type="button"
          class="clear-btn"
          @click="clearSearch"
        >
          ✕
        </button>
      </div>

      <!-- Items List -->
      <Transition name="fade">
        <ul v-if="hasItems && isExpanded" class="items-list">
          <li
            v-for="item in filteredItems"
            :key="item.id"
            class="item"
            :class="{ selected: selectedId === item.id }"
            @click="handleSelect(item)"
          >
            <span class="item-name">{{ item.name }}</span>
            <span v-if="item.description" class="item-description">
              {{ item.description }}
            </span>
            <button
              type="button"
              class="delete-btn"
              @click.stop="handleDelete(item.id)"
            >
              Delete
            </button>
          </li>
        </ul>
      </Transition>

      <!-- Empty State -->
      <div v-if="!hasItems && isExpanded" class="empty-state">
        <slot name="empty">
          <p>No items found</p>
        </slot>
      </div>
    </template>

    <!-- Footer Slot -->
    <footer v-if="$slots.footer" class="component-footer">
      <slot name="footer" :item-count="filteredItems.length" />
    </footer>
  </div>
</template>

<style scoped lang="scss">
.component-wrapper {
  padding: 1rem;
  border-radius: 0.5rem;
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
}

.search-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;

  &:hover {
    color: #6b7280;
  }
}

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  &.selected {
    background-color: #eff6ff;
  }
}

.item-name {
  font-weight: 500;
  flex: 1;
}

.item-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #fecaca;
  }
}

.loading-state,
.empty-state {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
