import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * @description Auth Interceptor - Class-based (traditional)
 * Adds authorization header to all HTTP requests
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth_token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}

/**
 * @description Auth Interceptor - Functional (Angular 15+)
 * Modern approach using HttpInterceptorFn
 */
export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

/**
 * @description Error Interceptor - Functional (Angular 15+)
 * Global error handling for HTTP requests
 */
export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized - Please login again';
            // Redirect to login or clear token
            break;
          case 403:
            errorMessage = 'Forbidden - Access denied';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Server error - Please try again later';
            break;
          default:
            errorMessage = `Error: ${error.status} - ${error.message}`;
        }
      }

      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};

/**
 * @description Retry Interceptor - Functional
 * Automatically retries failed requests
 */
export const retryInterceptorFn: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 2,
      delay: 1000,
      resetOnSuccess: true
    })
  );
};

/**
 * @description Loading Interceptor - Functional
 * Shows loading indicator during HTTP requests
 */
// export const loadingInterceptorFn: HttpInterceptorFn = (req, next) => {
//   const loadingService = inject(LoadingService);
//   loadingService.show();
//
//   return next(req).pipe(
//     finalize(() => loadingService.hide())
//   );
// };
