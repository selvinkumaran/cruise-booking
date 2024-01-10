import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  error: string = '';
  param: number | null = null;
  selectedGuests: number = 1;

  // Lottie animation options
  sad: AnimationOptions = {
    path: '/assets/sad.json',
  };

  tourDetails: Tour[] = [];
  tourDetail: Tour = {
    id: 0,
    destination: '',
    cruiseId: 0,
    price: 0,
    checkInDate: '',
    checkOutDate: '',
    cruiseName: '',
    cruiseCapacity: 0,
    cruiseDescription: '',
    cruise: {
      id: 0,
      name: '',
      description: '',
      photo: '',
      capacity: 0,
    },
  };

  ngOnInit(): void {
    // Retrieve tour details based on cruise ID from query parameters
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      this.fetchTourDetails();
    });
  }

  // Fetch tour details based on cruise ID
  private fetchTourDetails(): void {
    this.tourService.getTourDetailsByCruiseId(this.param!).subscribe({
      next: (response: any) => {
        this.tourDetails = response.data;
      },
      error: (err) => {
        // Handle errors from the server
        this.error = handleApiError(err);
      },
    });
  }

  // Calculate total payment based on selected guests and tour price
  calculateTotalPayment(): number {
    if (this.tourDetails.length > 0) {
      const selectedTour = this.tourDetails[0];
      return this.selectedGuests * selectedTour.price!;
    } else {
      return 0;
    }
  }

  // Handle form submission
  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Calculate total payment and navigate to the payment page
      const totalPayment = this.calculateTotalPayment();
      this.router.navigate(['/payment'], {
        queryParams: {
          totalPayment: totalPayment,
          tourId: this.tourDetails[0].id,
        },
      });
    }
  }

  checkInDateExpired(checkInDate: string): boolean {
    const currentDate = new Date();
    const checkInDateObj = new Date(checkInDate);

    // Compare the current date with the check-in date
    return currentDate > checkInDateObj;
  }
}
