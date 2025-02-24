import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, delay, finalize, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getUser()?.accessToken || '';
  const busyService = inject(BusyService);

  req = req.clone({
    headers: req.headers.append('Bearer', token),
  });

  busyService.busy();
  return next(req).pipe(
    finalize(() => busyService.idle()),
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
