import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';

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
    },
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      this.tourService.getTourDetailsById(this.param!).subscribe({
        next: (response: any) => {
          this.tourDetails = response.data;
          console.log(this.tourDetails);
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    });
  }

  calculateTotalPayment(): number {
    if (this.tourDetails.length > 0) {
      const selectedTour = this.tourDetails[0];
      return this.selectedGuests * selectedTour.price;
    } else {
      return 0;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const totalPayment = this.calculateTotalPayment();
      this.router.navigate(['/payment'], { queryParams: { totalPayment: totalPayment,tourId:this.tourDetails[0].id   } });
    }
  }
}
