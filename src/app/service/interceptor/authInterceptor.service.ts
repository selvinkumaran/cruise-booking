import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../../utils/constant';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  // Intercept method to add authorization header to API requests
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get authentication data from storage
    const authData = this.storageService.getAuthData();

    // Check if the request is not for the authentication API
    const isApiUrl = !request.url.startsWith(urlEndpoint.baseUrl + '/auth');

    // Add authorization header to the request if there is auth data and it's not an auth API request
    if (authData !== null && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${authData}`,
        },
      });
    }

    // Continue with the request
    return next.handle(request);
  }
}
