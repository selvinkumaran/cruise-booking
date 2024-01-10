import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/model/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';
import { StorageService } from 'src/app/service/storage.service';
import { handleApiError } from 'src/app/utils/apiError';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbackDetails: any[] = [];
  error: string = '';
  param: number | null = null;

  // Feedback Detail Object
  feedbackDetail: Feedback = {
    id: 0,
    comments: '',
    rating: new FormControl<number | null>(null, Validators.required),
    name: '',
    userId: 0,
    appUser: {
      id: 0,
      username: '',
      name: '',
    },
  };

  constructor(
    private storageService: StorageService,
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  loggedInUser = this.storageService.getLoggedInUser();

  ngOnInit() {
    // Retrieve feedback details based on route parameters
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      if (this.param) {
        this.feedbackService.getFeedbackDetailsById(this.param).subscribe({
          next: (response: any) => {
            this.param = params['feedbackId'];
            let feedbackId: number = params['feedbackId'];
            const feedback = response.data.find(
              (item: any) => item.id == feedbackId
            );
            if (feedback) {
              this.feedbackDetail.comments = feedback.comments;
              this.feedbackDetail.rating.setValue(feedback.rating);
            }
          },
          error: (err) => {
            this.error = handleApiError(err);
          },
        });
      }
    });
  }

  // Form Submission
  onSubmit(_addForm: Form): void {
    if (this.param) {
      // Update existing feedback
      let feedbackDetail: Feedback = {
        id: this.param,
        userId: this.loggedInUser.id,
        comments: this.feedbackDetail.comments,
        rating: this.feedbackDetail.rating?.value,
      };
      this.feedbackService.putFeedback(feedbackDetail).subscribe({
        next: () => {
          this.showSnackBar('Feedback updated successfully!');
          this.resetForm(); // Reset the form after submission
        },
        error: (err) => {
          this.error = handleApiError(err);
        },
      });
    } else {
      // Add new feedback
      let feedbackDetail: Feedback = {
        id: 0,
        userId: this.loggedInUser.id, 
        comments: this.feedbackDetail.comments,
        rating: this.feedbackDetail.rating.value,
      };
      this.feedbackService.postFeedback(feedbackDetail).subscribe({
        next: () => {
          this.showSnackBar('Feedback added successfully!');
          this.resetForm(); // Reset the form after submission
        },
        error: (err) => {
          this.error = handleApiError(err);
        },
      });
    }
  }

  // Reset Form
  private resetForm(): void {
    this.feedbackDetail.comments = '';
    this.feedbackDetail.rating?.reset();
    this.cdr.detectChanges(); // Detect changes to update the view
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
