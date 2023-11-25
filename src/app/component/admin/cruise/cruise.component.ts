import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cruise } from 'src/app/model/cruise';
import { CruiseService } from 'src/app/service/cruise.service';

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
  };
  constructor(
    private cruiseService: CruiseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchFeedbackDetails();
  }

  fetchFeedbackDetails() {
    this.cruiseService.getCruiseDetails().subscribe(
      (response: any) => {
        this.cruiseDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.cruiseService.deleteCruise(id).subscribe({
        next: (response: any) => {
          this.cruiseDetails = response.data;
          this.showSnackBar('Cruise deleted successfully!');
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/cruise/operation'], {
      queryParams: { id: id },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
 

}
