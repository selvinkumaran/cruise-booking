import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/model/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';
import { StorageService } from 'src/app/service/storage.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-feedback-operation',
  templateUrl: './feedback-operation.component.html',
  styleUrls: ['./feedback-operation.component.css'],
})
export class FeedbackOperationComponent {
  feedbackDetails: Feedback[] = [];
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
    this.loadLoggedInUserId();
    this.getFeedback();
  }

  // Load user ID from the storage service
  private loadLoggedInUserId(): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    this.userId = loggedInUser.id;
  }

  // Fetch feedback details for the logged-in user
  private getFeedback(): void {
    this.feedbackService.getFeedbackDetailsById(this.userId).subscribe({
      next: (response: any) => {
        this.feedbackDetails = response.data;
      },
      error: (err) => {
        this.error = handleApiError(err);
      },
    });
  }

  // Handle feedback deletion
  onDelete(id: number | undefined): void {
    if (id !== undefined) {
      this.feedbackService.deleteFeedbackByUserId(this.userId, id).subscribe({
        next: (response: any) => {
          this.feedbackDetails = response.data;
          this.showSnackBar('Feedback deleted successfully!');
        },
        error: (err) => {
          this.error = handleApiError(err);
        },
      });
    }
  }

  // Navigate to the feedback edit page
  onEdit(id: number): void {
    this.router.navigate(['/feedback'], {
      queryParams: { id: this.userId, feedbackId: id },
    });
  }

  // Display Snack Bar
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
