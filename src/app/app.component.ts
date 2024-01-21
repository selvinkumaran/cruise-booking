import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Router } from '@angular/router';
import { Tour } from './model/tour';
import { TourService } from './service/tour.service';
import { handleApiError } from './utils/apiError';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  filteredTours: Tour[] = [];
  tours: Tour[] = [];
  searchTerm: string = '';
  error: string = '';
  isSearchVisible: boolean = false;
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
    private router: Router,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.fetchTourDetails();

    // Subscribe to isAdmin observable in AuthService
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    // Subscribe to isLoggedIn observable in AuthService
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    window.onclick = () => this.filterReset();
  }

  // Fetch tour details from the server
  fetchTourDetails() {
    this.tourService.getTourDetails().subscribe(
      (response: any) => {
        this.tours = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

  // Logout user
  logout(): void {
    this.authService.logout();
  }

  // Check if the current route is the home page
  currentRouteIsHome(): boolean {
    return this.router.url === '/';
  }

  // Check if the current route is the home page
  currentRouteIsLoginOrRegister(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  //Filter Tours
  filterTours(): void {
    if (!this.isSearchVisible) {
      this.filteredTours = this.tours.filter((tour) =>
        tour.destination?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      // Optionally, you can focus on the input field when it becomes visible
      setTimeout(() => document.querySelector('.search-container input'));
    }
  }
  //Reset Search
  filterReset(): void {
    this.isSearchVisible = false;
    this.searchTerm = '';
    this.filteredTours = [];
  }

  // Send Tour Id through params
  getTourId(id: number) {
    this.router.navigate(['/particular-tour'], {
      queryParams: { id: id },
    });
  }
}
