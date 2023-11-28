import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { Cruise } from '../model/cruise';

@Injectable({
  providedIn: 'root',
})
export class CruiseService {
  constructor(private http: HttpClient) {}

  getCruiseDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cruises/all`);
  }
  getCruiseById(id: number) {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises/${id}`
    );
  }

  postcruise(formData: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises`,
      formData
    );
  }

  putcruise(formValue: FormData): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises`,
      formValue
    );
  }

  deleteCruise(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cruises/${id}`
    );
  }
}
