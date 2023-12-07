import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  // Retrieve all booking details for admin
  getBookingDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/booking/all`
    );
  }

  // Retrieve booking details by user ID
  getBookingDetailsById(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/bookings/${userId}`
    );
  }

  // Save booking details to the booking table
  saveDetailsToBookingTable(booking: Booking): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/bookings`,
      booking
    );
  }
}
