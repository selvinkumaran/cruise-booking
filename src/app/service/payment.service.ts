import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { Payment } from '../model/payment';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches all payment details from the server.
   * @returns Observable<AppResponse> representing the payment details.
   */
  getPaymentDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/payments/all`
    );
  }

  /**
   * Posts a new payment to the server.
   * @param payment - The Payment object to post.
   * @returns Observable<AppResponse> representing the server response.
   */
  postPayment(payment: Payment): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/payments`,
      payment
    );
  }

  /**
   * Fetches the latest payment details from the server.
   * @returns Observable<AppResponse> representing the latest payment details.
   */
  getLatestPayment(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/payments/latest`);
  }
}
