import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, delay, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          this.errorService.errors.set(error.error);
        }
        throw error;
      }),
    );
  }
}
