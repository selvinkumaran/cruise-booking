import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class AdminPaymentComponent implements OnInit {
  constructor(private paymentService: PaymentService) {}

  paymentDetails: Payment[] = [];
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

  ngOnInit() {
    this.fetchPaymentDetails();
  }

  fetchPaymentDetails() {
    this.paymentService.getPaymentDetails().subscribe(
      (response: any) => {
        console.log('Payment details response:', response);
        this.paymentDetails = response.data;
        console.log(this.paymentDetails);
        
      },
      (error) => {
        console.error('Error fetching payment details:', error);
      }
    );
  }
}
