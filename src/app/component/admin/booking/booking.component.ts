import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/service/booking.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class AdminBookingComponent implements OnInit {
  error: string = '';
  bookingDetails: Booking[] = [];
  bookingDetail: Booking = {
    id: 0,
    name: '',
    username: '',
    bookingStatus: '',
    bookingDate: '',
    cruiseName: '',
    destination: '',
    paymentDate: '',
    amount: 0,
    checkInDate: '',
    checkOutDate: '',
  };

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookingDetails();
  }

  // Fetch booking details from the service
  private fetchBookingDetails(): void {
    this.bookingService.getBookingDetails().subscribe({
      next: (response: any) => {
        const fetchedBookingDetails: Booking[] = response.data;
        if (fetchedBookingDetails.length > 0) {
          this.bookingDetails = fetchedBookingDetails;
        }
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
    });
  }
}
