import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Tour } from '../model/tour';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}

  getTourDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/tour/all`);
  }
  
  getTourDetailsById(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/tours/cruise/${id}`
    );
  }

  getTourById(id: number) {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/tour/${id}`
    );
  }

  postTour(tour: Tour): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/tour`,
      tour
    );
  }

  putTour(tour: Tour): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/tour`,
      tour
    );
  }

  deleteTour(id: number) {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/tour/${id}`
    );
  }
}
