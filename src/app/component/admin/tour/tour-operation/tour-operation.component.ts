import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';

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
    cruiseId: 0,
    price: 0,
    checkInDate: '',
    checkOutDate:'',
  };
  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  fetchFeedbackDetails() {
    this.tourService.getTourDetails().subscribe(
      (response: any) => {
        this.tourDetails = response.data;
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
        this.tourService.getTourById(this.param).subscribe({
          next: (response: any) => {
            this.tourDetail.destination = response.data.destination;
            this.tourDetail.cruiseId = this.param!;
            this.tourDetail.price = response.data.price;
            this.tourDetail.checkInDate = response.data.checkInDate;
            this.tourDetail.checkOutDate = response.data.checkOutDate;
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
      let tourDetail: Tour = {
        id: this.param,
        destination: this.tourDetail.destination,
        checkInDate: this.tourDetail.checkInDate,
        checkOutDate: this.tourDetail.checkOutDate,
        cruiseId: this.tourDetail.cruiseId,
        price: this.tourDetail.price,
      };
      this.tourService.putTour(tourDetail).subscribe({
        next: () => {
          this.showSnackBar('tour updated successfully!');
          setTimeout(() => {
            this.router.navigate(['/admin/tour']);
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
      let tourDetail: Tour = {
        id: null || undefined,
        destination: this.tourDetail.destination,
        checkInDate: this.tourDetail.checkInDate,
        checkOutDate: this.tourDetail.checkOutDate,
        cruiseId: this.tourDetail.cruiseId,
        price: this.tourDetail.price,
      };
      console.log(tourDetail, 'checkkk adddd');

      this.tourService.postTour(tourDetail).subscribe({
        next: () => {
          this.showSnackBar('tour added successfully!');
          setTimeout(() => {
            this.router.navigate(['/admin/tour']);
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
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}
