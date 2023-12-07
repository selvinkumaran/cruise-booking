import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Loading animation options
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  // Flags to track user authentication state
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to isAdmin observable in AuthService
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    // Subscribe to isLoggedIn observable in AuthService
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  // Logout user
  logout(): void {
    this.authService.logout();
  }

  // Check if the current route is the home page
  currentRouteIsHome(): boolean {
    return this.router.url === '/';
  }
}
