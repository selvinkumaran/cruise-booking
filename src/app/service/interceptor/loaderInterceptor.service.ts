import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  // Intercept method to show/hide loader
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show loader
    this.loaderService.isLoading.next(true);

    // Continue with the request and hide loader when done
    return next
      .handle(req)
      .pipe(finalize(() => this.loaderService.isLoading.next(false)));
  }
}
