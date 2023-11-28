import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ActivatedRoute } from '@angular/router';

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

  options: AnimationOptions = {
    path: '/assets/success.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

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

  btnText: string = 'Book Now';

  onSubmit(_paymentForm: NgForm) {}

  loggedInUser = this.storageService.getLoggedInUser();

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

      this.paymentService.postPayment(payment).subscribe({
        next: (_response: any) => {},
        error: (err) => {
          console.log(err);
          let message: string = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => {
          console.log('There are no more action happen.');
        },
      });
    });
  }

  navigateToBooking() {
    this.showLottie = true;
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
