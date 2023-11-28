import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AnimationOptions } from 'ngx-lottie';
import { TourService } from 'src/app/service/tour.service';
import { CruiseService } from 'src/app/service/cruise.service';
import { Cruise } from 'src/app/model/cruise';
import { Tour } from 'src/app/model/tour';
import { PaymentService } from 'src/app/service/payment.service';
import { BookingService } from 'src/app/service/booking.service';
import { FeedbackService } from 'src/app/service/feedback.service';
import { Feedback } from 'src/app/model/feedback';
import { Booking } from 'src/app/model/booking';
import { Payment } from 'src/app/model/payment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  totalUserCount: number = 0;
  error: string = '';
  cruiseDetails: Cruise[] = [];
  tourDetails: Tour[] = [];
  paymentDetails: Payment[] = [];
  bookingDetails: Booking[] = [];
  feedbackDetails: Feedback[] = [];

  options: AnimationOptions = {
    path: '/assets/all-user.json',
  };

  constructor(
    private userService: UserService,
    private tourService: TourService,
    private cruiseService: CruiseService,
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private feedbackService: FeedbackService
  ) {}

  totalCruise = this.cruiseService.getCruiseDetails.length;
  totalTour = this.tourService.getTourDetails.length;

  ngOnInit() {
    this.fetchFeedbackDetails();
  }

  fetchFeedbackDetails() {
    this.userService.getTotalUserCount().subscribe({
      next: (count: number) => {
        this.totalUserCount = count;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.cruiseService.getCruiseDetails().subscribe(
      (response: any) => {
        this.cruiseDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
    this.tourService.getTourDetails().subscribe(
      (response: any) => {
        this.tourDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
    this.paymentService.getPaymentDetails().subscribe(
      (response: any) => {
        this.paymentDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
    this.bookingService.getbookingDetails().subscribe(
      (response: any) => {
        this.bookingDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
    this.feedbackService.getFeedbackDetails().subscribe(
      (response: any) => {
        this.feedbackDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
  }
}
