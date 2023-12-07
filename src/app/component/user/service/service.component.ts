import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cruise } from 'src/app/model/cruise';
import { CruiseService } from 'src/app/service/cruise.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  // Error message for handling API errors
  error: string = '';

  // Array to store cruise details
  cruiseDetails: Cruise[] = [];

  // Selected cruise detail
  cruiseDetail: Cruise = {
    id: 0,
    name: '',
    description: '',
    capacity: 0,
    photo: '',
  };

  // Injecting CruiseService and Router
  constructor(private cruiseService: CruiseService, private router: Router) {}

  // Lifecycle hook: ngOnInit is called after the component is initialized
  ngOnInit(): void {
    // Fetch cruise details from the service
    this.cruiseService.getCruiseDetails().subscribe({
      next: (response: any) => {
        let cruiseDetails: Cruise[] = response.data;
        // Check if there are cruise details available
        if (cruiseDetails.length > 0) {
          this.cruiseDetails = cruiseDetails;
        }
      },
      error: (err) => {
        // Handle errors from the server
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
