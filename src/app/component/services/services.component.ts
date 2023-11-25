import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  fields = {
    cardnumber: '',
    cardholder: '',
    exp: '',
    cvc: '',
  };

  valid = false;

  onSubmit(paymentForm:NgForm):void{}

  formatCardNumber(number: string): string {
    return number.replace(/[^0-9]/gi, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  formatExp(number: string): string {
    return number.replace(/[^0-9]/gi, '').slice(0, 4).replace(/(.{2})/, '$1\/').trim();
  }

  validate(payment:Form): void {
    let valid = true;
    for (const value in this.fields) {
      if (this.fields[value as keyof typeof this.fields].length < 1) {
        valid = false;
      }
    }
    this.valid = valid;
  }
  

  onCardNumberKeyDown(event: KeyboardEvent): void {
    // Your logic for card number key down
  }

  onCardholderKeyDown(event: KeyboardEvent): void {
    // Your logic for cardholder key down
  }

  onExpKeyDown(event: KeyboardEvent): void {
    // Your logic for expiry date key down
  }

  onCvcKeyDown(event: KeyboardEvent): void {
    // Your logic for CVC key down
  }
}