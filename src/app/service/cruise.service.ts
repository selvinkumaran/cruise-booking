import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class CruiseService {
  constructor(private http: HttpClient) {}

  // Retrieve all cruise details
  getCruiseDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cruises/all`);
  }

  // Retrieve cruise details by ID
  getCruiseById(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises/${id}`
    );
  }

  // Post new cruise
  postCruise(formData: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises`,
      formData
    );
  }

  // Update existing cruise
  putCruise(formValue: FormData): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises`,
      formValue
    );
  }

  // Delete cruise by ID
  deleteCruise(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises/${id}`
    );
  }
}
