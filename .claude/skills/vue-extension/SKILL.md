---
name: vue-development
description: Best practices for building reactive Vue.js applications with Composition API, TypeScript, and modern Vue 3 features. Use when working with .vue files in Vue projects.
globs: ".vue"
---

# Vue Development Skills

## When to Use This Skill

Use this skill when:

- Writing or refactoring Vue components (.vue files)
- Building single-page applications with Vue 3
- Working with Composition API and reactive state
- Implementing Vue Router and Pinia/Vuex
- Developing with TypeScript in Vue

## I. Vue 3 Fundamentals

- **Composition API**: Prefer Composition API over Options API for better TypeScript support and code organization.
- **Script Setup**: Use `<script setup>` for cleaner, more concise component syntax.
- **Reactivity System**: Understand ref, reactive, computed, and watch.
- **Single File Components**: Keep template, script, and style in one .vue file.
- **TypeScript Integration**: Use TypeScript for type safety and better developer experience.

## II. Component Structure

**Single File Component (SFC) with Script Setup:**

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { User } from "@/types";

// Props with TypeScript
interface Props {
  userId: number;
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

// Emits
const emit = defineEmits<{
  (e: "update", user: User): void;
  (e: "delete", id: number): void;
}>();

// Reactive state
const user = ref<User | null>(null);
const isLoading = ref(false);

// Computed
const displayName = computed(() =>
  user.value ? `${user.value.firstName} ${user.value.lastName}` : ""
);

// Lifecycle
onMounted(async () => {
  isLoading.value = true;
  user.value = await fetchUser(props.userId);
  isLoading.value = false;
});
</script>

<template>
  <div :class="variant">
    <p v-if="isLoading">Loading...</p>
    <p v-else>{{ displayName }}</p>
  </div>
</template>

<style scoped lang="scss">
.primary {
  color: blue;
}
</style>
```

## III. Project Structure

**Recommended Vue 3 Structure:**

```
src/
├── components/        # Reusable components
│   ├── base/         # Base UI components
│   ├── layout/       # Layout components
│   └── ...
├── composables/      # Composition functions
├── views/            # Page components (routes)
├── stores/           # Pinia stores
├── router/           # Vue Router configuration
├── services/         # API services
├── types/            # TypeScript types
├── utils/            # Utility functions
├── assets/           # Static assets
├── App.vue
└── main.ts
```

## IV. Reactivity System

**ref vs reactive:**

- **ref**: Use for primitive values, arrays, and when you need .value
- **reactive**: Use for objects when you don't want .value syntax
- **toRefs**: Use to destructure reactive object while maintaining reactivity

```typescript
// ref for primitives
const count = ref(0);
const name = ref("John");

// reactive for objects
const state = reactive({
  user: null,
  isLoading: false,
  error: null,
});

// toRefs for destructuring
const { user, isLoading } = toRefs(state);
```

**Computed Properties:**

- Use for derived state based on reactive data
- Automatically tracks dependencies
- Cached until dependencies change
- Use computed, not methods, for expensive calculations

**Watchers:**

- **watch**: Watch specific reactive sources
- **watchEffect**: Automatically tracks reactive dependencies
- Use for side effects, not derived state
- Clean up side effects with returned function

```typescript
// watch specific source
watch(userId, async (newId) => {
  user.value = await fetchUser(newId);
});

// watchEffect auto-tracks dependencies
watchEffect(() => {
  console.log(`User: ${user.value?.name}`);
});

// Cleanup
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {}, 1000);
  onCleanup(() => clearTimeout(timer));
});
```

## V. Composables (Composition Functions)

- **Reusable Logic**: Extract reusable stateful logic into composables
- **Naming Convention**: Prefix with "use" (e.g., useAuth, useFetch)
- **Return Values**: Return reactive references and functions
- **TypeScript**: Fully type composables for better DX

```typescript
// composables/useUser.ts
export function useUser(userId: Ref<number>) {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchUser = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      user.value = await api.getUser(userId.value);
    } catch (e) {
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  watchEffect(() => {
    if (userId.value) {
      fetchUser();
    }
  });

  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),
    refetch: fetchUser,
  };
}
```

## VI. Props & Events

**Props:**

- Define props with TypeScript interfaces
- Use withDefaults for default values
- Mark required props appropriately
- Use validators for complex validation
- Never mutate props directly

**Emits:**

- Define all emits with TypeScript types
- Use emit for child-to-parent communication
- Name events descriptively (update:modelValue for v-model)

**v-model:**

- Use v-model for two-way binding
- Multiple v-model bindings with different names
- Custom v-model implementation with props and emits

```vue
<script setup lang="ts">
// Custom v-model
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    :value="modelValue"
    @input="updateValue"
  />
</template>
```

## VII. State Management with Pinia

**Store Definition:**

```typescript
// stores/user.ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  // State
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  // Getters (computed)
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ""
  );

  // Actions
  async function login(credentials: Credentials) {
    const response = await api.login(credentials);
    user.value = response.user;
    isAuthenticated.value = true;
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    user,
    isAuthenticated,
    fullName,
    login,
    logout,
  };
});
```

- **Setup Stores**: Use Composition API style stores
- **State**: Declare reactive state with ref/reactive
- **Getters**: Use computed for derived state
- **Actions**: Define async and sync actions
- **Modularity**: One store per feature/domain

## VIII. Vue Router

**Route Configuration:**

```typescript
const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/users/:id",
    component: () => import("@/views/UserDetail.vue"),
    props: true, // Pass route params as props
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return "/login";
  }
});
```

- **Lazy Loading**: Use dynamic imports for route components
- **Named Routes**: Use named routes for type-safe navigation
- **Route Props**: Pass params as props when possible
- **Navigation Guards**: Implement guards for auth and access control
- **Meta Fields**: Use meta for route-level data

## IX. Template Syntax & Directives

**Best Practices:**

- **v-if vs v-show**: Use v-if for conditional rendering, v-show for toggling visibility
- **v-for Key**: Always use unique :key with v-for
- **v-for with v-if**: Avoid using together. Filter data first or use computed
- **Event Modifiers**: Use .prevent, .stop, .once modifiers appropriately
- **Attribute Binding**: Use : shorthand for v-bind
- **Event Binding**: Use @ shorthand for v-on

```vue
<template>
  <!-- Good practices -->
  <div v-if="isVisible">Conditional</div>
  <div v-show="isToggled">Toggle visibility</div>

  <ul>
    <li
      v-for="item in items"
      :key="item.id"
      @click.prevent="handleClick(item)"
    >
      {{ item.name }}
    </li>
  </ul>

  <!-- Avoid -->
  <!-- Don't use v-for with v-if on same element -->
  <li
    v-for="item in items"
    v-if="item.active"
  >
    ...
  </li>
</template>
```

## X. Component Communication

**Props Down, Events Up:**

- Use props to pass data to child components
- Use emits to send data to parent components
- Avoid prop drilling with provide/inject or Pinia

**Provide/Inject:**

```typescript
// Parent/ancestor component
provide("theme", readonly(theme));

// Child/descendant component
const theme = inject<Ref<Theme>>("theme");
```

**Event Bus (Avoid):**

- Don't use event bus in Vue 3
- Use Pinia or provide/inject instead

## XI. TypeScript Integration

**Component Typing:**

```typescript
// Define component props interface
interface ButtonProps {
  variant: "primary" | "secondary";
  disabled?: boolean;
}

// Component instance type
import type { ComponentPublicInstance } from "vue";
type ButtonInstance = ComponentPublicInstance<ButtonProps>;

// Template ref
const buttonRef = ref<ButtonInstance | null>(null);
```

- **Strict Mode**: Enable TypeScript strict mode
- **Generic Components**: Use generics for reusable components
- **Type Props**: Always type props and emits
- **Type Composables**: Fully type composable return values
- **Volar**: Use Volar extension for best TypeScript experience

## XII. Performance Optimization

- **v-once**: Use for static content that never changes
- **v-memo**: Memoize template sub-trees (Vue 3.2+)
- **Lazy Loading**: Lazy load components and routes
- **defineAsyncComponent**: Use for async component loading
- **KeepAlive**: Cache component instances when switching
- **Virtual Scrolling**: Use virtual scrolling for large lists
- **Computed Caching**: Leverage computed property caching
- **Shallow Reactivity**: Use shallowRef/shallowReactive for large objects

**Example:**

```vue
<script setup>
import { defineAsyncComponent } from "vue";

const HeavyComponent = defineAsyncComponent(() =>
  import("./HeavyComponent.vue")
);
</script>

<template>
  <KeepAlive>
    <component :is="currentView" />
  </KeepAlive>

  <Suspense>
    <HeavyComponent />
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>
```

## XIII. Testing

**Component Testing:**

```typescript
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders properly", () => {
    const wrapper = mount(Button, {
      props: { variant: "primary" },
    });
    expect(wrapper.text()).toContain("Click me");
  });

  it("emits click event", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("computes displayName correctly", () => {
    const wrapper = mount(UserCard, {
      props: {
        user: { firstName: "John", lastName: "Doe" },
      },
    });
    expect(wrapper.vm.displayName).toBe("John Doe");
  });
});
```

**Testing Tools:**

- **Vitest**: Use Vitest for unit and component testing
- **Vue Test Utils**: Official testing library for Vue components
- **Cypress/Playwright**: Use for E2E testing
- **Testing Library**: Alternative to Vue Test Utils for user-centric testing

**Testing Principles:**

- **Test Behavior**: Test user-facing behavior, not implementation details
- **No Implementation Testing**: Don't test internal component state directly
- **Accessibility**: Test with screen readers and keyboard navigation
- **Async Testing**: Use async/await for async operations
- **Mock External Dependencies**: Mock API calls and external services

## XIV. Best Practices Checklist

Before submitting Vue code, verify:

- [ ] Using `<script setup>` with TypeScript
- [ ] Props and emits typed properly with interfaces
- [ ] Reactive state uses ref/reactive correctly
- [ ] Computed used for derived state, not methods
- [ ] Watchers used for side effects only
- [ ] Composables for reusable logic
- [ ] No prop mutations (props are readonly)
- [ ] Unique :key in v-for loops
- [ ] Route components lazy loaded
- [ ] Tests written and passing
- [ ] No v-if with v-for on same element
- [ ] Event modifiers used appropriately
- [ ] TypeScript strict mode enabled
- [ ] Volar extension installed and working
- [ ] No memory leaks (cleanup in watchers)

## XV. Common Patterns

**Good Patterns:**

- [ ] Composition API with script setup
- [ ] Composables for reusable logic
- [ ] Pinia for state management
- [ ] Lazy loading for routes and heavy components
- [ ] TypeScript for type safety
- [ ] Props validation with TypeScript interfaces
- [ ] Custom v-model implementations
- [ ] Provide/inject for deep prop passing
- [ ] Template refs with proper typing

**Anti-Patterns to Avoid:**

- Mutating props directly
- Using Options API in new projects
- Mixing reactive and non-reactive data
- Overusing watchers (use computed when possible)
- Event bus pattern (use Pinia instead)
- Deep prop drilling (use provide/inject or Pinia)
- Not cleaning up watchers and effects
- Using v-if with v-for on same element
- Ignoring TypeScript errors
- Large components (split into composables)

## XVI. Resources & Learning

- **Vue 3 Docs**: [https://vuejs.org/](https://vuejs.org/)
- **Vue Mastery**: Premium video courses for Vue
- **Vue School**: Interactive Vue.js tutorials
- **Pinia Docs**: [https://pinia.vuejs.org/](https://pinia.vuejs.org/)
- **Vue Router Docs**: [https://router.vuejs.org/](https://router.vuejs.org/)
- **Volar**: Official VSCode extension for Vue
- **Awesome Vue**: Curated list of Vue resources
- **Vue.js Developers**: Community and newsletter
