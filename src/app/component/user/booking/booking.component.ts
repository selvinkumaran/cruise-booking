import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Booking } from 'src/app/model/booking';
import { Payment } from 'src/app/model/payment';
import { BookingService } from 'src/app/service/booking.service';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };

  bookingDetails: Booking[] = [];
  paymentDetails: Payment[] = [];
  error: string = '';
  username: String = '';

  bookingDetail: Booking = {
    id: 0,
    name: '',
    username: '',
    bookingStatus: '',
    cruiseName: '',
    destination: '',
    bookingDate: '',
    paymentDate: '',
    amount: 0,
    checkInDate: '',
    checkOutDate: '',
    tourId: 0,
    paymentId: 0,
    userId: 0,
  };

  param: number | null = null;

  loggedInUser = this.storageService.getLoggedInUser();

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.bookingDetail.tourId = params['tourId'];
    });

    this.fetchLatestPayment();
  }

  // Fetch the latest payment and update booking details
  private fetchLatestPayment(): void {
    this.paymentService.getLatestPayment().subscribe(
      (response: any) => {
        this.paymentDetails = response.data;
        this.bookingDetail.paymentId = response.data.id;
        this.saveDetailsToBooking();
        this.fetchBookingDetails();
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

  // Save details to the Booking table
  private saveDetailsToBooking(): void {
    let bookingDetail: Booking = {
      userId: this.loggedInUser.id,
      tourId: this.bookingDetail.tourId!,
      paymentId: this.bookingDetail.paymentId,
    };

    this.bookingService.saveDetailsToBookingTable(bookingDetail).subscribe({
      next: (_response: any) => {},
      error: (err) => {
        this.error = handleApiError(err);
      },
      complete: () => {
        console.log('There are no more actions happening.');
      },
    });
  }

  // Fetch booking details
  private fetchBookingDetails(): void {
    this.bookingService.getBookingDetailsById(this.loggedInUser.id).subscribe(
      (response: any) => {
        this.bookingDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }
}
