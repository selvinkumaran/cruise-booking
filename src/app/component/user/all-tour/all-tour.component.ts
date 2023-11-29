import { Component } from '@angular/core';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-all-tour',
  templateUrl: './all-tour.component.html',
  styleUrls: ['./all-tour.component.css'],
})
export class AllTourComponent {
  constructor(private tourService: TourService) {}
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

  ngOnInit() {
    this.fetchFeedbackDetails();
  }

  fetchFeedbackDetails() {
    this.tourService.getTourDetails().subscribe(
      (response: any) => {
        this.tourDetails = response.data;
        console.log(this.tourDetails);
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
  }
}
