import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import lottie from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  showLottie: boolean = false;

  @ViewChild(LottieComponent) lottieComponent!: LottieComponent;

  constructor(
    private paymentService: PaymentService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    loaderService: LoaderService
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

  paymentDetail: Payment = {
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

  onSubmit(paymentForm: NgForm) {}

  loggedInUser = this.storageService.getLoggedInUser();
  book(_paymentForm: NgForm) {
    this.route.queryParams.subscribe((params) => {
      this.param = params['totalPayment'];
      let payment: Payment = {
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

      this.paymentService.postpayment(payment).subscribe({
        next: (_response: AppResponse) => {},
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
      this.router.navigate(['/booking']);
    }, 3000);
  }
}
