import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Form, NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { AppResponse } from 'src/app/model/appResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  options: AnimationOptions = {
    path: '/assets/register.json',
  };
  confirmPassword: string = '';
  error: string = '';
  user: User = {
    name: '',
    username: '',
    password: '',
  };

  register(): void {
    let user: User = {
      name: this.user.name,
      password: this.user.password,
      username: this.user.username,
    };

    this.authService.register(user).subscribe({
      next: (_response: AppResponse) => {},
      error: (err) => {
        console.log(err);
        let message: string = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => {
        console.log('There are no more action happen.');
        this.router.navigate(['/login']);
      },
    });
  }
}
