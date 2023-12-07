import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute } from '@angular/router';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  showLottie: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Lottie Animation Options
  options: AnimationOptions = {
    path: '/assets/success.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  // Payment-related variables
  paymentDetails: Payment[] = [];
  error: string = '';
  param: number | null = null;
  paymentLatestId: number = 0;
  paymentDetail: Payment = {
    id: 0,
    nameRef: '',
    numberRef: '',
    addressRef: '',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    userId: 0,
    amount: 0,
  };

  // Button Text for UI
  btnText: string = 'BOOK NOW';

  onSubmit(_paymentForm: NgForm) {
  }

  // Retrieve logged-in user from storage service
  loggedInUser = this.storageService.getLoggedInUser();

  // Book function triggered on payment form submission
  book(_paymentForm: NgForm) {
    this.route.queryParams.subscribe((params) => {
      this.param = params['totalPayment'];
      let payment: Payment = {
        id: 0,
        nameRef: this.paymentDetail.nameRef,
        numberRef: this.paymentDetail.numberRef,
        addressRef: this.paymentDetail.addressRef,
        cardHolderName: this.paymentDetail.cardHolderName,
        cardNumber: this.paymentDetail.cardNumber,
        expiryDate: this.paymentDetail.expiryDate,
        cvc: this.paymentDetail.cvc,
        userId: this.loggedInUser.id,
        amount: this.param!,
      };

      // Post payment to the server
      this.paymentService.postPayment(payment).subscribe({
        next: (_response: any) => {
          // Handle successful response if needed
        },
        error: (err) => {
          // Handle error response
          this.error = handleApiError(err);
        },
        complete: () => {
          // Handle completion logic if needed
          console.log('There are no more actions happening.');
        },
      });
    });
  }

  // Navigate to booking page after successful payment
  navigateToBooking() {
    // Show Lottie animation
    this.showLottie = true;

    // Navigate to booking page after a delay
    setTimeout(() => {
      this.router.navigate(['/booking'], {
        queryParams: {
          tourId: this.route.snapshot.queryParams['tourId'],
          paymentLatestId: this.paymentLatestId,
        },
      });
    }, 3000);
  }
}
