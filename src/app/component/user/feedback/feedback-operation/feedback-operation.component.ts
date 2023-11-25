import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/model/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-feedback-operation',
  templateUrl: './feedback-operation.component.html',
  styleUrls: ['./feedback-operation.component.css'],
})
export class FeedbackOperationComponent {
  feedbackDetails: any[] = [];
  userId: number = 0;
  error: string = '';
  feedbackDetail: Feedback = {
    id: 0,
    comments: '',
    rating: 0,
    name: '',
    appUser: {
      id: 0,
      username: '',
      name: '',
    },
  };

  constructor(
    private feedbackService: FeedbackService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    this.userId = userId;
    this.getFeedback();
  }

  getFeedback(): void {
    this.feedbackService.getFeedbackDetailsById(this.userId).subscribe({
      next: (response: any) => {
        let feedbackDetails: Feedback[] = response.data;
        console.log(feedbackDetails);
        this.feedbackDetails = feedbackDetails;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: (response: any) => {
          this.feedbackDetails = response.data;
          console.log('deleted...');
          this.showSnackBar('Feedback deleted successfully!');
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/feedback'], {
      queryParams: { id: this.userId, feedbackId: id },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
