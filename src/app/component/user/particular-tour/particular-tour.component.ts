import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-particular-tour',
  templateUrl: './particular-tour.component.html',
  styleUrls: ['./particular-tour.component.css'],
})
export class ParticularTourComponent {
  error: string = '';
  selectedGuests: number = 1;

  param: number | null = null;
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Handle form submission
  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Calculate total payment and navigate to the payment page
      const totalPayment = this.calculateTotalPayment();
      this.router.navigate(['/payment'], {
        queryParams: {
          totalPayment: totalPayment,
          tourId: this.tourDetail.id,
        },
      });
    }
  }

  // Calculate total payment based on selected guests and tour price
  calculateTotalPayment(): number {
    if (this.tourDetail.price! > 0) {
      return this.selectedGuests * this.tourDetail.price!;
    } else {
      return 0;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      if (this.param) {
        // If ID exists, fetch tour details for editing
        this.tourService.getTourById(this.param).subscribe({
          next: (response: any) => {
            this.tourDetail = response.data;
          },
          error: (err) => {
            this.error = handleApiError(err);
          },
        });
      }
    });
  }
}
