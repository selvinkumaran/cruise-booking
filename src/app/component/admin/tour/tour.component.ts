import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class AdminTourComponent implements OnInit {
  error: string = '';
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

  constructor(
    private tourService: TourService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchTourDetails();
  }

  // Fetch tour details from the server
  fetchTourDetails() {
    this.tourService.getTourDetails().subscribe(
      (response: any) => {
        this.tourDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

  // Delete tour by ID
  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.tourService.deleteTour(id).subscribe({
        next: (response: any) => {
          this.tourDetails = response.data;
          this.showSnackBar('Tour deleted successfully!');
        },
        error: (err) => {
          this.error = handleApiError(err);
        },
      });
    }
  }

  // Edit tour by ID
  onEdit(id: number) {
    this.router.navigate(['/admin/tour/operation'], {
      queryParams: { id: id },
    });
  }

  // Display snack bar with a message
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
