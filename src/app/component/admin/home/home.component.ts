import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AnimationOptions } from 'ngx-lottie';
import { TourService } from 'src/app/service/tour.service';
import { CruiseService } from 'src/app/service/cruise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  totalUserCount: number = 0;
  error: string = '';

  options: AnimationOptions = {
    path: '/assets/all-user.json',
  };

  constructor(
    private userService: UserService,
    private tourService: TourService,
    private cruiseService: CruiseService
  ) {}

  totalCruise = this.cruiseService.getCruiseDetails.length;
  totalTour = this.tourService.getTourDetails.length;

  ngOnInit(): void {
    this.userService.getTotalUserCount().subscribe({
      next: (count: number) => {
        this.totalUserCount = count;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
