import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
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

  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };
  
  bookingDetails: Booking[] = [];
  paymentDetails: Payment[] = [];
  error: string = '';
  username:String='';

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
  

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.bookingDetail.tourId = params['tourId'];
    });

    this.paymentService.getLatestPayment().subscribe(
      (response: any) => {
        this.paymentDetails = response.data;
        this.bookingDetail.paymentId = response.data.id;
        this.saveDetailsToBooking();
        this.fetchFeedbackDetails();
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
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
