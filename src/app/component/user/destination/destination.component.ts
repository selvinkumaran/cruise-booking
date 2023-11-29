import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cruise } from 'src/app/model/cruise';
import { CruiseService } from 'src/app/service/cruise.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css'],
})
export class DestinationComponent {
  error: string = '';
  cruiseDetails: Cruise[] = [];
  cruiseDetail: Cruise = {
    id: 0,
    name: '',
    description: '',
    capacity: 0,
    photo: '',
  };
  constructor(private cruiseService: CruiseService, private router: Router) {}

  ngOnInit(): void {
    this.cruiseService.getCruiseDetails().subscribe({
      next: (response: any) => {
        let cruiseDetails: Cruise[] = response.data;
        // if (cruiseDetails.userRequestList.length > 0) {
        console.log(cruiseDetails);

        this.cruiseDetails = cruiseDetails;
        this.cruiseDetail = cruiseDetails[0];
        // }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  getCruiseId(id: number | undefined): void {
    this.router.navigate(['/tour'], {
      queryParams: { id: id },
    });
  }
}
