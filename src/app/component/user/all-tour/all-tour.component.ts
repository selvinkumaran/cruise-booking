import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-all-tour',
  templateUrl: './all-tour.component.html',
  styleUrls: ['./all-tour.component.css'],
})
export class AllTourComponent implements OnInit {
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

  constructor(private tourService: TourService, private router: Router) {}

  ngOnInit() {
    this.fetchTourDetails();
  }

  // Fetch tour details from the service
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

  // Send Tour Id through params
  getTourId(id: number) {
    this.router.navigate(['/particular-tour'], {
      queryParams: { id: id },
    });
  }
}
