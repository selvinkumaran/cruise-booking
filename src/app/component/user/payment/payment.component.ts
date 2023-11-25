import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';

import lottie from 'lottie-web';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    private paymentService: PaymentService,
    private storageService: StorageService,
    private route: ActivatedRoute,private router:Router
  ) {}
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

  onSubmit(todoForm: NgForm) {}

  loggedInUser = this.storageService.getLoggedInUser();

  book(paymentForm: NgForm) {
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
      console.log(payment.amount,"new amount");
      
      this.paymentService.postpayment(payment).subscribe({
        next: (_response: AppResponse) => {},
        error: (err) => {
          console.log(err);
          let message: string = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => console.log('There are no more action happen.'),
      });
    });
  }
  navigateToBooking() {
    this.router.navigate(['/booking']);
  }
}
