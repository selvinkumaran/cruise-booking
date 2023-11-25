import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/model/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class AdminFeedbackComponent implements OnInit {
  error: string = '';
  feedbackDetails: Feedback[] = [];
  feedbackDetail: Feedback = {
    id: 0,
    comments: '',
    name: '',
    rating: 0,
    appUser: {
      id: 0,
      username: '',
      name: '',
    },
  };

  constructor(
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchFeedbackDetails();
  }

  fetchFeedbackDetails() {
    this.feedbackService.getFeedbackDetails().subscribe(
      (response: any) => {
        this.feedbackDetails = response.data;
      },
      (error) => {
        console.error('Error fetching feedback details', error);
      }
    );
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: (response: any) => {
          this.feedbackDetails = response.data;
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
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}
