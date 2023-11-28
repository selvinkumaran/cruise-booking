import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
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
  file = '';
  cruiseDetail: Cruise = {
    id: 0,
    name: '',
    description: '',
    capacity: 0,
    photo: '',
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

  onSubmit(addForm: NgForm): void {
    if (this.param) {
      let formValue: Cruise = addForm.value;
      const formData = new FormData();
      formData.append('id', this.param!.toString());
      formData.append('photo', this.file);
      formData.append('capacity', formValue.capacity.toString());
      formData.append('name', formValue.name);
      formData.append('description', formValue.description);

      this.cruiseService.putcruise(formData).subscribe({
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
      let formValue: Cruise = addForm.value;
      console.log(addForm.value,"new check");
      
      const formData = new FormData();
      formData.append('photo', this.file);
      formData.append('capacity', formValue.capacity.toString());
      formData.append('name', formValue.name);
      formData.append('description', formValue.description);
      console.log(formData,"check");
      
      this.cruiseService.postcruise(formData).subscribe({
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

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }
}
