import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  // Retrieve all feedback details
  getFeedbackDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/feedback/all`
    );
  }

  // Retrieve feedback details by user ID
  getFeedbackDetailsById(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/feedback/${userId}`
    );
  }

  // Post new feedback
  postFeedback(feedback: Feedback): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/feedback`,
      feedback
    );
  }

  // Update existing feedback
  putFeedback(feedback: Feedback): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/feedback`,
      feedback
    );
  }

  // Delete feedback by ID
  deleteFeedback(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/feedback/${id}`
    );
  }
  // Delete feedback by ID with UserId
  deleteFeedbackByUserId(userId:number,id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/feedback/${userId}/${id}`
    );
  }
}
