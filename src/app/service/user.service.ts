import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches user details from the server.
   * @returns Observable<AppResponse> representing the user details.
   */
  getUserDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/users/all`);
  }

  /**
   * Fetches the total count of users from the server.
   * @returns Observable<number> representing the total user count.
   */
  getTotalUserCount(): Observable<number> {
    return this.http.get<number>(`${urlEndpoint.baseUrl}/admin/users/total-count`);
  }
}
