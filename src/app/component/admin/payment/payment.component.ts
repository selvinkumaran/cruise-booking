import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class AdminPaymentComponent implements OnInit {
  error: string = '';
  paymentDetails: Payment[] = [];

  // Initialize a payment detail object with default values
  paymentDetail: Payment = {
    id: 0,
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    userId: 0,
    amount: 0,
    paymentDate: '',
  };

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Fetch payment details
    this.fetchPaymentDetails();
  }

  // Fetch payment details from the server
  fetchPaymentDetails() {
    this.paymentService.getPaymentDetails().subscribe(
      (response: any) => {
        this.paymentDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }
}
