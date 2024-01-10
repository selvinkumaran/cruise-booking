import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { User } from 'src/app/model/user';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  error: string = '';
  totalUserCount: number = 0;

  userDetails: User[] = [];
  bookingDetails: Booking[] = [];

  userDetail: User = {
    id: 0,
    username: '',
    name: '',
    roles: '',
  };

  constructor(
    private userService: UserService,
    private bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    // Fetch User Details
    this.fetchUserDetails();

    // Fetch Total User Count
    this.fetchTotalUserCount();

    this.viewUserBookings(1);
  }

  // Function to fetch user details
  private fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: User[] = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
          this.userDetail = userDetails[0];
        }
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
    });
  }

  // Function to fetch total user count
  private fetchTotalUserCount(): void {
    this.userService.getTotalUserCount().subscribe({
      next: (count: number) => {
        this.totalUserCount = count;
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
    });
  }

  // Fetch booking details
  private fetchBookingDetails(userId: number): void {
    this.bookingService.getBookingDetailsById(userId).subscribe(
      (response: any) => {
        this.bookingDetails = response.data;
      },
      (error) => {
        this.error = handleApiError(error);
      }
    );
  }

  setSelectedUser(userDetail: User): void {
    this.userDetail = userDetail;
  }

  // Inside AdminUsersComponent class
  viewUserBookings(userId: number): void {
    // Set the selected user based on the userId
    this.userDetail = this.userDetails.find((user) => user.id === userId)!;

    // Fetch booking details for the selected user
    this.fetchBookingDetails(userId);
  }
}
