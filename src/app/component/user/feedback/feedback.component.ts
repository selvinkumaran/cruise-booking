import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/model/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbackDetails: any[] = [];
  error: string = '';
  param: number | null = null;
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
            let message: string = err?.error?.error?.message;
            this.error = message.includes(',')
              ? message.split(',')[0]
              : message;
          },
        });
      }
    });
  }

  onSubmit(_addForm: Form): void {
    if (this.param) {
      let feedbackDetail: Feedback = {
        id: this.param,
        userId: this.loggedInUser.id,
        comments: this.feedbackDetail.comments,
        rating: this.feedbackDetail.rating?.value,
      };
      this.feedbackService.putfeedback(feedbackDetail).subscribe({
        next: () => {
          this.showSnackBar('feedback updated successfully!');
          this.resetForm(); // Reset the form after submission
        },
        error: (err) => {
          console.log(err);
          let message: string = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => console.log('There are no more actions happening.'),
      });
    } else {
      let feedbackDetail: Feedback = {
        id: 0,
        userId: this.loggedInUser.id,
        comments: this.feedbackDetail.comments,
        rating: this.feedbackDetail.rating.value,
      };
      this.feedbackService.postfeedback(feedbackDetail).subscribe({
        next: () => {
          this.showSnackBar('feedback added successfully!');
          this.resetForm(); // Reset the form after submission
        },
        error: (err) => {
          console.log(err);
          let message: string = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => console.log('There are no more actions happening.'),
      });
    }
  }

  private resetForm(): void {
    // Reset your form controls here
    this.feedbackDetail.comments = '';
    this.feedbackDetail.rating?.reset();
    this.cdr.detectChanges(); // Detect changes to update the view
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
