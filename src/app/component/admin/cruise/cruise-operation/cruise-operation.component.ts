import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cruise } from 'src/app/model/cruise';
import { CruiseService } from 'src/app/service/cruise.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cruise-operation',
  templateUrl: './cruise-operation.component.html',
  styleUrls: ['./cruise-operation.component.css'],
})
export class CruiseOperationComponent {
  cruiseDetails: Cruise[] = [];
  param: number | null = null;
  btn: string = 'Add';
  error = '';
  cruiseDetail: Cruise = {
    id: 0,
    name: '',
    description: '',
    capacity: 0,
  };
  constructor(
    private cruiseService: CruiseService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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

  ngOnInit() {
    this.fetchFeedbackDetails();
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      if (this.param) {
        this.cruiseService.getCruiseById(this.param).subscribe({
          next: (response: any) => {
            console.log(response);

            this.cruiseDetail.name = response.data.name;
            this.cruiseDetail.description = response.data.description;
            this.cruiseDetail.capacity = response.data.capacity;
            this.btn = 'Edit';
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(',')
              ? message.split(',')[0]
              : message;
          },
        });
      }
    });
  }

  onSubmit(_addForm: Form): void {
    if (this.param) {
      let cruiseDetail: Cruise = {
        id: this.param,
        name: this.cruiseDetail.name,
        description: this.cruiseDetail.description,
        capacity: this.cruiseDetail.capacity,
      };
      this.cruiseService.putcruise(cruiseDetail).subscribe({
        next: () => {
          this.showSnackBar('Cruise updated successfully!');
          setTimeout(() => {
            this.router.navigate(['/admin/cruise']);
          }, 2000);
        },
        error: (err) => {
          console.log(err);
          let message: string = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => console.log('There are no more actions happening.'),
      });
    } else {
      let cruiseDetail: Cruise = {
        id: null || undefined,
        name: this.cruiseDetail.name,
        description: this.cruiseDetail.description,
        capacity: this.cruiseDetail.capacity,
      };
      this.cruiseService.postcruise(cruiseDetail).subscribe({
        next: () => {
          this.showSnackBar('Cruise added successfully!');
          setTimeout(() => {
            this.router.navigate(['/admin/cruise']);
          }, 2000);
        },
        error: (err) => {
          console.log(err);
          let message: string = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => console.log('There are no more actions happening.'),
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}
