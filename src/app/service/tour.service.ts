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

  /**
   * Fetches all tour details from the server.
   * @returns Observable<AppResponse> representing the tour details.
   */
  getTourDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/tour/all`);
  }
  
  /**
   * Fetches tour details by ID from the server.
   * @param id - The ID of the tour to fetch.
   * @returns Observable<AppResponse> representing the tour details.
   */
  getTourDetailsByCruiseId(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/tours/cruise/${id}`);
  }

  /**
   * Fetches tour by ID from the server.
   * @param id - The ID of the tour to fetch.
   * @returns Observable<AppResponse> representing the tour.
   */
  getTourById(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/tour/${id}`);
  }

  /**
   * Posts a new tour to the server.
   * @param tour - The Tour object to post.
   * @returns Observable<AppResponse> representing the server response.
   */
  postTour(tour: Tour): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/tour`, tour);
  }

  // For post and put used the same methos postTour 
  // /**
  //  * Updates an existing tour on the server.
  //  * @param tour - The Tour object to update.
  //  * @returns Observable<AppResponse> representing the server response.
  //  */
  // putTour(tour: Tour): Observable<AppResponse> {
  //   return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/tour`, tour);
  // }

  /**
   * Deletes a tour by ID from the server.
   * @param id - The ID of the tour to delete.
   * @returns Observable<AppResponse> representing the server response.
   */
  deleteTour(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/tour/${id}`);
  }
}
