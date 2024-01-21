import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { AppResponse } from 'src/app/model/appResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

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
    // Extract user details for registration
    const userToRegister: User = {
      name: this.user.name,
      password: this.user.password,
      username: this.user.username,
    };

    this.authService.register(userToRegister).subscribe({
      next: (_response: AppResponse) => {},
      error: (err) => {
        this.error = handleApiError(err);
      },
      complete: () => {
        console.log('Registration completed.');
        this.navigateToLogin();
      },
    });
  }

  // Navigate to the login page
  private navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
