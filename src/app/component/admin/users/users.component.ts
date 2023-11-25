import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

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
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: User[] = response.data;
        // if (userDetails.userRequestList.length > 0) {
        console.log(userDetails);

        this.userDetails = userDetails;
        this.userDetail = userDetails[0];
        // }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
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

  setSelectedUser(userDetail: User): void {
    this.userDetail = userDetail;
  }
}
