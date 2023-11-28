import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { Payment } from 'src/app/model/payment';
import { BookingService } from 'src/app/service/booking.service';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private paymentService: PaymentService
  ) {}

  bookingDetails: Booking[] = [];
  paymentDetails: Payment[] = [];
  error: string = '';

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
    paymentId: 0, // Assuming you want to set this to 0 initially
    userId: 0,
  };

  param: number | null = null;

  loggedInUser = this.storageService.getLoggedInUser();

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.bookingDetail.tourId = params['tourId'];
    });

    this.paymentService.getLatestPayment().subscribe(
      (response: any) => {
        this.paymentDetails = response.data;
        console.log(this.paymentDetails, 'booking Latest');

        if (this.paymentDetails.length > 0) {
          // Set paymentId based on the latest payment details
          this.bookingDetail.paymentId = this.paymentDetails[0].id!;
        }
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );

    this.saveDetailsToBooking();
    this.fetchFeedbackDetails();
  }

  saveDetailsToBooking() {
    let bookingDetail: Booking = {
      userId: this.loggedInUser.id,
      tourId: this.bookingDetail.tourId!,
      paymentId: this.bookingDetail.paymentId,
    };

    this.bookingService.saveDetailsToBookingTable(bookingDetail).subscribe({
      next: (_response: any) => {},
      error: (err) => {
        console.log(err);
        let message: string = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => {
        console.log('There are no more actions happening.');
      },
    });
  }

  fetchFeedbackDetails() {
    this.bookingService.getbookingDetailsById(this.loggedInUser.id).subscribe(
      (response: any) => {
        this.bookingDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
  }
}
