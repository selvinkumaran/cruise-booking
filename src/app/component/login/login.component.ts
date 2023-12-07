// Import necessary modules and components
import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Login } from 'src/app/model/login';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // Lottie animation options
  options: AnimationOptions = {
    path: '/assets/login.json',
  };

  username: String = '';
  password: String = '';
  error: String = '';

  // Inject AuthService for handling login functionality
  constructor(private authService: AuthService) {}

  // Method to handle user login
  login(): void {
    let login: Login = {
      username: this.username,
      password: this.password,
    };

    // Subscribe to the login method of AuthService
    this.authService.login(login).subscribe({
      // Handle successful login
      next: (response: AppResponse) => {
        let user: AppUser = response.data;
        this.authService.setLoggedIn(user);
      },
      // Handle login error
      error: (err) => {
        this.error = handleApiError(err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
}
