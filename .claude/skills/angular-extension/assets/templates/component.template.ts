import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

/**
 * @description Template for Angular standalone component with best practices
 *
 * Features:
 * - OnPush change detection for performance
 * - Proper subscription cleanup with takeUntil pattern
 * - Typed inputs and outputs
 * - CommonModule import for standalone component
 */
@Component({
  selector: 'app-feature-name',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feature-container">
      <h2>{{ title }}</h2>
      <ng-content></ng-content>
      <button (click)="onAction()">Action</button>
    </div>
  `,
  styles: [`
    .feature-container {
      padding: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureNameComponent implements OnInit, OnDestroy {
  // Cleanup subject for subscriptions
  private readonly destroy$ = new Subject<void>();

  // Input properties
  @Input() title = 'Default Title';
  @Input() data: unknown[] = [];

  // Output events
  @Output() actionClicked = new EventEmitter<void>();

  ngOnInit(): void {
    // Initialize component
    // Example subscription with proper cleanup:
    // this.someService.getData()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(data => this.handleData(data));
  }

  ngOnDestroy(): void {
    // Clean up all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAction(): void {
    this.actionClicked.emit();
  }
}
