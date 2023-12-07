import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Cruise } from 'src/app/model/cruise';
import { CruiseService } from 'src/app/service/cruise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-cruise-operation',
  templateUrl: './cruise-operation.component.html',
  styleUrls: ['./cruise-operation.component.css'],
})
export class CruiseOperationComponent implements OnInit {
  cruiseDetails: Cruise[] = [];
  param: number | null = null;
  btn: string = 'Add';
  error: string = '';
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

  // Fetch cruise details
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

  ngOnInit() {
    this.fetchCruiseDetails();

    // Subscribe to route query parameters
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      if (this.param) {
        this.loadCruiseDetails();
      }
    });
  }

  // Load cruise details for editing
  loadCruiseDetails() {
    this.cruiseService.getCruiseById(this.param!).subscribe({
      next: (response: any) => {
        this.populateCruiseDetails(response.data);
        this.btn = 'Edit';
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
    });
  }

  // Populate cruise details from response
  populateCruiseDetails(data: any) {
    this.cruiseDetail.name = data.name;
    this.cruiseDetail.description = data.description;
    this.cruiseDetail.capacity = data.capacity;
  }

  // Handle form submission
  onSubmit(addForm: NgForm): void {
    if (this.param) {
      this.updateCruise(addForm);
    } else {
      this.addCruise(addForm);
    }
  }

  // Update cruise
  updateCruise(addForm: NgForm): void {
    let formValue: Cruise = addForm.value;
    const formData = this.createFormData(formValue);

    this.cruiseService.putCruise(formData).subscribe({
      next: () => this.handleSuccess('Cruise updated successfully!'),
      error: (err) => this.handleError(err),
    });
  }

  // Add new cruise
  addCruise(addForm: NgForm): void {
    let formValue: Cruise = addForm.value;
    const formData = this.createFormData(formValue);

    this.cruiseService.postCruise(formData).subscribe({
      next: () => this.handleSuccess('Cruise added successfully!'),
      error: (err) => this.handleError(err),
    });
  }

  // Create FormData for the API request
  createFormData(formValue: Cruise): FormData {
    const formData = new FormData();
    if (this.param) {
      formData.append('id', this.param!.toString());
    }
    formData.append('photo', this.file);
    formData.append('capacity', formValue.capacity.toString());
    formData.append('name', formValue.name);
    formData.append('description', formValue.description);

    return formData;
  }

  // Handle file change
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }

  // Display success message using MatSnackBar
  private handleSuccess(message: string): void {
    this.showSnackBar(message);
    setTimeout(() => {
      this.router.navigate(['/admin/cruise']);
    }, 2000);
  }

  // Display error message using MatSnackBar
  private handleError(err: any): void {
    this.error = handleApiError(err);
  }

  // Display snackbar with a message
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}
