import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
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
  userDetail: User = {
    id: 0,
    username: '',
    name: '',
    roles: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch User Details
    this.fetchUserDetails();

    // Fetch Total User Count
    this.fetchTotalUserCount();
  }

  // Function to fetch user details
  private fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: User[] = response.data;
        if (userDetails.length > 0) {
          console.log(userDetails);
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
}
