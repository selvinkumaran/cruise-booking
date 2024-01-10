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
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  totalUserCount: number = 0;
  totalAmount: number = 0;
  error: string = '';
  cruiseDetails: Cruise[] = [];
  tourDetails: Tour[] = [];
  paymentDetails: Payment[] = [];
  bookingDetails: Booking[] = [];
  feedbackDetails: Feedback[] = [];

  // Animation options for Lottie
  options: AnimationOptions = {
    path: '/assets/all-user.json',
  };
  optionsCruise: AnimationOptions = {
    path: '/assets/cruise.json',
  };
  optionsTour: AnimationOptions = {
    path: '/assets/tour.json',
  };
  optionsPayment: AnimationOptions = {
    path: '/assets/payment.json',
  };
  optionsFeedback: AnimationOptions = {
    path: '/assets/feedback.json',
    rendererSettings: {
      className: 'feedback-lottie',
    },
  };
  optionsBooking: AnimationOptions = {
    path: '/assets/booking.json',
  };
  optionsRevenue: AnimationOptions = {
    path: '/assets/revenue.json',
  };

  constructor(
    private userService: UserService,
    private tourService: TourService,
    private cruiseService: CruiseService,
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.fetchAllDetails();
  }

  // Fetch details from different services
  fetchAllDetails() {
    // Fetch total user count
    this.userService.getTotalUserCount().subscribe({
      next: (count: number) => {
        this.totalUserCount = count;
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
    });

    // Fetch cruise details
    this.cruiseService.getCruiseDetails().subscribe(
      (response: any) => {
        this.cruiseDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );

    // Fetch tour details
    this.tourService.getTourDetails().subscribe(
      (response: any) => {
        this.tourDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );

    // Fetch payment details
    this.paymentService.getPaymentDetails().subscribe(
      (response: any) => {
        this.paymentDetails = response.data;
        for (let amount of this.paymentDetails) {
          this.totalAmount += amount.amount;
        }
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );

    // Fetch booking details
    this.bookingService.getBookingDetails().subscribe(
      (response: any) => {
        this.bookingDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );

    // Fetch feedback details
    this.feedbackService.getFeedbackDetails().subscribe(
      (response: any) => {
        this.feedbackDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

}
