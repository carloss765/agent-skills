import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';

/**
 * @description Template for Angular service with best practices
 *
 * Features:
 * - ProvidedIn root for singleton pattern
 * - Inject function (Angular 14+)
 * - Typed HTTP methods
 * - Centralized error handling
 * - State management with BehaviorSubject
 */

// Define your interfaces
export interface Entity {
  id: string;
  name: string;
  // Add more properties
}

export interface EntityResponse {
  data: Entity[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/entities`;

  // State management
  private readonly entitiesSubject = new BehaviorSubject<Entity[]>([]);
  public readonly entities$ = this.entitiesSubject.asObservable();

  // Loading state
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  /**
   * Get all entities
   */
  getAll(params?: { page?: number; limit?: number }): Observable<EntityResponse> {
    this.loadingSubject.next(true);

    let httpParams = new HttpParams();
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());

    return this.http.get<EntityResponse>(this.apiUrl, { params: httpParams }).pipe(
      tap(response => {
        this.entitiesSubject.next(response.data);
        this.loadingSubject.next(false);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Get entity by ID
   */
  getById(id: string): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Create new entity
   */
  create(entity: Omit<Entity, 'id'>): Observable<Entity> {
    return this.http.post<Entity>(this.apiUrl, entity).pipe(
      tap(newEntity => {
        const current = this.entitiesSubject.getValue();
        this.entitiesSubject.next([...current, newEntity]);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Update existing entity
   */
  update(id: string, entity: Partial<Entity>): Observable<Entity> {
    return this.http.put<Entity>(`${this.apiUrl}/${id}`, entity).pipe(
      tap(updatedEntity => {
        const current = this.entitiesSubject.getValue();
        const index = current.findIndex(e => e.id === id);
        if (index > -1) {
          current[index] = updatedEntity;
          this.entitiesSubject.next([...current]);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Delete entity
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.entitiesSubject.getValue();
        this.entitiesSubject.next(current.filter(e => e.id !== id));
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Centralized error handling
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.loadingSubject.next(false);

    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}`;
    }

    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
