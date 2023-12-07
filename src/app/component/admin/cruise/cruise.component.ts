import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cruise } from 'src/app/model/cruise';
import { CruiseService } from 'src/app/service/cruise.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-cruise',
  templateUrl: './cruise.component.html',
  styleUrls: ['./cruise.component.css'],
})
export class AdminCruiseComponent implements OnInit {
  error: string = '';
  totalCruise: number = 0;
  cruiseDetails: Cruise[] = [];
  cruiseDetail: Cruise = {
    id: 0,
    name: '',
    description: '',
    capacity: 0,
    photo: '',
  };

  constructor(
    private cruiseService: CruiseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchCruiseDetails();
  }

  // Fetch cruise details from the service
  fetchCruiseDetails() {
    this.cruiseService.getCruiseDetails().subscribe(
      (response: any) => {
        this.cruiseDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

  // Delete a cruise by ID
  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.cruiseService.deleteCruise(id).subscribe({
        next: (response: any) => {
          this.cruiseDetails = response.data;
          this.showSnackBar('Cruise deleted successfully!');
        },
        error: (err) => {
          this.error = handleApiError(err);
        },
      });
    }
  }

  // Navigate to the edit page for a specific cruise
  onEdit(id: number) {
    this.router.navigate(['/admin/cruise/operation'], {
      queryParams: { id: id },
    });
  }

  // Display a snackbar with the given message
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
