import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Booking } from 'src/app/model/booking';
import { Email } from 'src/app/model/email';
import { Payment } from 'src/app/model/payment';
import { BookingService } from 'src/app/service/booking.service';
import { EmailService } from 'src/app/service/email.service';
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
  loggedInUserEmail = this.storageService.getLoggedInUser();

  param: number | null = null;

  loggedInUser = this.storageService.getLoggedInUser();

  // Retrieve the emailSent flag from sessionStorage or default to false
  emailSent: boolean = sessionStorage.getItem('emailSent') === 'true';

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private paymentService: PaymentService,
    private el: ElementRef,
    private emailService: EmailService
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
        console.log(this.bookingDetails, 'check');
        // Check if the email has been sent before sending it again
        if (!this.emailSent) {
          this.sendEmail();
          // Set the flag to true after sending the email
          this.emailSent = true;
          // Store the emailSent flag in sessionStorage
          sessionStorage.setItem('emailSent', 'true');
        }
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

  //send email to user

  sendEmail(): void {
    // Check if there are bookings
    if (this.bookingDetails.length > 0) {
      // Get the last booking from the array
      const lastBooking = this.bookingDetails[this.bookingDetails.length - 1];

      // Construct the email object
      let email: Email = {
        email: this.loggedInUserEmail.username,
        bookingDetails: {
          bookingStatus: lastBooking.bookingStatus,
          bookingDate: lastBooking.bookingDate,
          cruiseName: lastBooking.cruiseName,
          destination: lastBooking.destination,
          paymentDate: lastBooking.paymentDate,
          amount: lastBooking.amount,
          checkInDate: lastBooking.checkInDate,
          checkOutDate: lastBooking.checkOutDate,
        },
      };

      // Send the email
      this.emailService.sendEmail(email).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
        complete: () => {},
      });
    } else {
      console.log('No bookings to send email for.'); // Handle the case where there are no bookings
    }
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
