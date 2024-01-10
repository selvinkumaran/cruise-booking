import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-tour-operation',
  templateUrl: './tour-operation.component.html',
  styleUrls: ['./tour-operation.component.css'],
})
export class TourOperationComponent implements OnInit {
  tourDetails: Tour[] = [];
  param: number | null = null;
  btn: string = 'Add';
  error = '';
  tourDetail: Tour = {
    id: 0,
    destination: '',
    cruiseId: null,
    price: null,
    checkInDate: '',
    checkOutDate: '',
  };

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Fetch Tour Details from the service
  fetchFeedbackDetails() {
    this.tourService.getTourDetails().subscribe(
      (response: any) => {
        this.tourDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

  ngOnInit() {
    // Initialize component and fetch tour details
    this.fetchFeedbackDetails();
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      if (this.param) {
        // If ID exists, fetch tour details for editing
        this.tourService.getTourById(this.param).subscribe({
          next: (response: any) => {
            // Set values for editing
            this.tourDetail.destination = response.data.destination;
            this.tourDetail.cruiseId = response.data.cruise.id;
            this.tourDetail.price = response.data.price;
            this.tourDetail.checkInDate = response.data.checkInDate;
            this.tourDetail.checkOutDate = response.data.checkOutDate;
            this.btn = 'Edit';
          },
          error: (err) => {
            this.error = handleApiError(err);
          },
        });
      }
    });
  }

  // Handle form submission for adding/editing a tour
  onSubmit(addForm: Form): void {
    if (this.param) {
      // If ID exists, update tour
      let tourDetail: Tour = {
        id: this.param,
        destination: this.tourDetail.destination,
        checkInDate: this.tourDetail.checkInDate,
        checkOutDate: this.tourDetail.checkOutDate,
        cruiseId: this.tourDetail.cruiseId,
        price: this.tourDetail.price,
      };
      this.handleTourRequest(tourDetail, 'tour updated successfully!');
    } else {
      // If ID doesn't exist, add a new tour
      let tourDetail: Tour = {
        id: null || undefined,
        destination: this.tourDetail.destination,
        checkInDate: this.tourDetail.checkInDate,
        checkOutDate: this.tourDetail.checkOutDate,
        cruiseId: this.tourDetail.cruiseId,
        price: this.tourDetail.price,
      };
      this.handleTourRequest(tourDetail, 'tour added successfully!');
    }
  }

  // Perform the actual request to add/update a tour
  private handleTourRequest(tourDetail: Tour, successMessage: string): void {
    this.tourService.postTour(tourDetail).subscribe({
      next: () => {
        this.showSnackBar(successMessage);
        setTimeout(() => {
          this.router.navigate(['/admin/tour']);
        }, 2000);
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }

  // Display a snackbar message
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

  getSelectedCheckInDate(): string {
    const selectedDate = new Date(this.tourDetail.checkInDate);
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    return `${selectedDate.getFullYear()}-${month}-${day}`;
  }
}
