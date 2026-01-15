---
name: angular-development
description: Best practices for building scalable Angular applications with TypeScript, RxJS, and modern Angular features. Use when working with Angular projects (.ts, .html, .scss files).
globs:
  - ".component.ts"
  - ".service.ts"
---

# Angular Development Skills

## When to Use This Skill

Use this skill when:
- Writing or refactoring Angular components and services
- Building enterprise applications with Angular framework
- Working with Angular CLI, modules, and dependency injection
- Managing reactive state with RxJS observables
- Implementing Angular routing and forms

## I. Angular Fundamentals

- **TypeScript First**: Angular is built with TypeScript. Embrace strong typing.
- **Modularity**: Organize code into feature modules and shared modules.
- **Dependency Injection**: Leverage Angular's DI system for loosely coupled code.
- **Reactive Programming**: Use RxJS observables for async operations and state management.
- **Angular CLI**: Use Angular CLI for generation, building, and testing.

## II. Project Structure

**Recommended Angular Structure:**
```
src/
├── app/
│   ├── core/              # Singleton services, guards, interceptors
│   │   ├── services/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── core.module.ts
│   ├── shared/            # Shared components, directives, pipes
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── shared.module.ts
│   ├── features/          # Feature modules
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── ...
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
├── environments/
└── styles/
```

- **Core Module**: Import once in AppModule for singleton services
- **Shared Module**: Import in feature modules for reusable components
- **Feature Modules**: Lazy load for better performance
- **One Component Per File**: Keep component, template, and styles separate or together based on size

## III. Components Best Practices

**Component Decorator:**
```typescript
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Prefer OnPush
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // Component logic
}
```

- **ChangeDetection**: Use OnPush strategy for better performance
- **Lifecycle Hooks**: Implement only needed interfaces (OnInit, OnDestroy, etc.)
- **Smart vs Dumb**: Create smart (container) and dumb (presentational) components
- **Input/Output**: Use @Input() for data down, @Output() EventEmitter for events up
- **Unsubscribe**: Always unsubscribe from observables in ngOnDestroy
- **ViewChild/ContentChild**: Use for accessing child components and DOM elements

## IV. Services & Dependency Injection

**Service Pattern:**
```typescript
@Injectable({
  providedIn: 'root' // Singleton service
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
```

- **ProvidedIn Root**: Use for singleton services
- **Injectable Decorator**: Always add @Injectable() to services
- **Single Responsibility**: One service, one purpose
- **Facade Pattern**: Create facade services for complex feature state
- **HttpClient**: Use HttpClient for all HTTP operations
- **Error Handling**: Handle errors in services with catchError operator

## V. RxJS & Observables

**Observable Best Practices:**
- **Async Pipe**: Use async pipe in templates to auto-subscribe/unsubscribe
- **Operators**: Learn common operators (map, filter, switchMap, mergeMap, catchError)
- **Unsubscribe**: Use takeUntil, take, first, or async pipe to prevent memory leaks
- **Subject Types**: Use BehaviorSubject for state, ReplaySubject for caching
- **Hot vs Cold**: Understand hot and cold observables
- **Share Operators**: Use shareReplay for expensive operations
```typescript
// Good pattern for unsubscribing
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// Better: Use async pipe
data$ = this.service.getData();
// In template: {{ data$ | async }}
```

## VI. Forms

**Template-Driven Forms:**
- Use for simple forms
- Two-way binding with [(ngModel)]
- Validation with directives

**Reactive Forms (Recommended):**
- Use for complex forms
- Programmatic control with FormGroup and FormControl
- Type-safe with typed forms (Angular 14+)
- Custom validators for business logic
- Dynamic forms generation
```typescript
// Reactive form example
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.min(18), Validators.max(100)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission
    }
  }
}
```

## VII. Routing

- **Lazy Loading**: Load feature modules on demand
- **Route Guards**: Use CanActivate, CanDeactivate for navigation control
- **Resolvers**: Pre-fetch data before route activation
- **Route Parameters**: Use ActivatedRoute for reading route params
- **Router Events**: Subscribe to router events for loading indicators
- **Preloading Strategy**: Implement custom preloading for critical routes
```typescript
// Lazy loading
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  }
];
```

## VIII. State Management

**Component State:**
- Use component properties for local state
- Use services for shared state between components

**State Management Libraries:**
- **NgRx**: Redux pattern for complex applications
- **Akita**: Simpler alternative to NgRx
- **NGXS**: Decorator-based state management
- **RxAngular**: Reactive state management

**When to Use:**
- Small apps: Component state + services
- Medium apps: Services with BehaviorSubject
- Large/complex apps: NgRx or similar library

## IX. Modules

- **Feature Modules**: Group related components, services, and routes
- **Shared Modules**: Export commonly used directives, pipes, components
- **Core Module**: Singleton services, app-wide components (import once)
- **Lazy Loading**: Load feature modules on demand
- **Standalone Components**: Consider standalone components (Angular 14+) to reduce module boilerplate

## X. Directives & Pipes

**Custom Directives:**
- **Structural Directives**: Change DOM structure (*ngIf, *ngFor style)
- **Attribute Directives**: Change appearance or behavior
- **Host Binding**: Bind to host element properties
- **Host Listener**: Listen to host element events

**Custom Pipes:**
- **Pure Pipes**: Default, for performance (called only when inputs change)
- **Impure Pipes**: Called on every change detection cycle (use sparingly)
- **Async Pipe**: Built-in for handling observables
- **Transform Logic**: Keep transformation logic simple and focused

## XI. HTTP & API Communication

- **HttpClient Module**: Import HttpClientModule in AppModule
- **Interceptors**: Use for auth tokens, error handling, logging
- **Typed Responses**: Define interfaces for API responses
- **Error Handling**: Implement global error handling with interceptors
- **Loading States**: Manage loading states consistently
- **Retry Logic**: Use retry operators for transient failures
```typescript
// HTTP Interceptor example
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${this.getToken()}` }
    });
    return next.handle(authReq);
  }
}
```

## XII. Change Detection

- **OnPush Strategy**: Use for better performance
- **ChangeDetectorRef**: Manually trigger change detection when needed
- **Immutability**: Use immutable data patterns with OnPush
- **Zone.js**: Understand how Zone.js triggers change detection
- **Detach/Reattach**: Detach change detector for performance-critical components

## XIII. Testing

**Unit Testing:**
- **TestBed**: Configure testing module
- **Component Testing**: Test component logic and template
- **Service Testing**: Test services in isolation
- **Mocking**: Mock dependencies with jasmine spies
- **Async Testing**: Use fakeAsync, tick, flush for async operations

**E2E Testing:**
- **Protractor/Cypress**: End-to-end testing tools
- **Page Objects**: Use page object pattern for maintainability
```typescript
// Component test example
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## XIV. Performance Optimization

- **OnPush Change Detection**: Reduce change detection cycles
- **Track By**: Use trackBy with *ngFor for list rendering
- **Lazy Loading**: Load modules on demand
- **Pure Pipes**: Use pure pipes for better performance
- **Virtual Scrolling**: Use CDK virtual scrolling for large lists
- **Bundle Optimization**: Analyze bundle size with webpack-bundle-analyzer
- **AOT Compilation**: Use Ahead-of-Time compilation for production

## XV. Best Practices Checklist

Before submitting Angular code, verify:
- [ ] TypeScript strict mode enabled
- [ ] OnPush change detection used where possible
- [ ] All observables unsubscribed (or using async pipe)
- [ ] Forms use reactive forms for complexity
- [ ] Feature modules lazy loaded
- [ ] Services provided in root or feature modules
- [ ] No logic in templates (move to component)
- [ ] Error handling implemented
- [ ] Tests written and passing
- [ ] No console warnings or errors
