import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class AdminBookingComponent implements OnInit {
  error: string = '';
  bookingDetails: Booking[] = [];
  status:string='1';
  bookingDetail: Booking = {
    id: 0,
    name: '',
    username: '',
    bookingStatus: '',
    bookingDate:'',
    cruiseName: '',
    destination: '',
    paymentDate: '',
    amount: 0,
    checkInDate: '',
    checkOutDate: '',
  };
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getbookingDetails().subscribe({
      next: (response: any) => {
        let bookingDetails: Booking[] = response.data;
        // if (bookingDetails.userRequestList.length > 0) {
        console.log(bookingDetails);

        this.bookingDetails = bookingDetails;
        this.bookingDetail = bookingDetails[0];
        // }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
