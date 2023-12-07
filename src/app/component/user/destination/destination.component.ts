import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cruise } from 'src/app/model/cruise';
import { CruiseService } from 'src/app/service/cruise.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css'],
})
export class DestinationComponent implements OnInit {
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
    this.fetchCruiseDetails();
  }

  // Fetch cruise details
  private fetchCruiseDetails(): void {
    this.cruiseService.getCruiseDetails().subscribe({
      next: (response: any) => {
        let cruiseDetails: Cruise[] = response.data;
        if (cruiseDetails.length > 0) {
          this.cruiseDetails = cruiseDetails;
        }
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
    });
  }

  // Navigate to the tour page with the selected cruise ID
  getCruiseId(id: number | undefined): void {
    this.router.navigate(['/tour'], {
      queryParams: { id: id },
    });
  }
}
