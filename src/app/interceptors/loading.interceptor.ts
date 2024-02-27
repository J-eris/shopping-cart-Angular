import { Injectable, inject } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  // Inyectamos nuestro servicio loading.service.ts
  private loadingService = inject(LoadingService);

  // Modificamos el metodo intercept para que muestre y oculte el spinner
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();

    return next.handle(request).pipe(
      catchError((error) => {
        this.loadingService.hide();
        return throwError(error);
      }),
      finalize(() => this.loadingService.hide()));
  }
}
