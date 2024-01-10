import { Component, ElementRef, OnInit } from '@angular/core';
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
    private paymentService: PaymentService,
    private el: ElementRef
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
        console.log(this.bookingDetails,"check");
        
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }
  // Function to trigger the download for a specific booking
  downloadBookingDetails(booking: Booking): void {
    // Create a string with the content you want to download
    const contentToDownload = `
    Destination: ${booking.destination}
    Check In Date: ${booking.checkInDate}
    Check Out Date: ${booking.checkOutDate}
    Cruise Name: ${booking.cruiseName}
    Payment Date: ${booking.paymentDate}
    Amount: ${booking.amount}
    Status: ${booking.bookingStatus}
  `;

    // Create a Blob with the content and set the MIME type
    const blob = new Blob([contentToDownload], { type: 'text/plain' });

    // Create a link element and set its attributes for downloading
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Booking_Details_${booking.id}.txt`;

    // Append the link to the document and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link from the document
    document.body.removeChild(link);
  }

  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }
}
