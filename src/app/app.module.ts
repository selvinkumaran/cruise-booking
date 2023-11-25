import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/user/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CruiseComponent } from './component/user/cruise/cruise.component';
import { TourComponent } from './component/user/tour/tour.component';
import { FeedbackComponent } from './component/user/feedback/feedback.component';
import { BookingComponent } from './component/user/booking/booking.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';

import { AdminHomeComponent } from './component/admin/home/home.component';
import { AdminCruiseComponent } from './component/admin/cruise/cruise.component';
import { AdminTourComponent } from './component/admin/tour/tour.component';
import { AdminFeedbackComponent } from './component/admin/feedback/feedback.component';
import { AdminBookingComponent } from './component/admin/booking/booking.component';
import { AdminPaymentComponent } from './component/admin/payment/payment.component';
import { AdminUsersComponent } from './component/admin/users/users.component';
import { DestinationComponent } from './component/user/destination/destination.component';
import { PaymentComponent } from './component/user/payment/payment.component';
import { CruiseOperationComponent } from './component/admin/cruise/cruise-operation/cruise-operation.component';
import { TourOperationComponent } from './component/admin/tour/tour-operation/tour-operation.component';
import { FeedbackOperationComponent } from './component/user/feedback/feedback-operation/feedback-operation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CruiseComponent,
    TourComponent,
    FeedbackComponent,
    BookingComponent,
    AdminHomeComponent,
    AdminCruiseComponent,
    AdminTourComponent,
    AdminFeedbackComponent,
    AdminBookingComponent,
    AdminPaymentComponent,
    AdminUsersComponent,
    DestinationComponent,
    PaymentComponent,
    CruiseOperationComponent,
    TourOperationComponent,
    FeedbackOperationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule,
    NgbModule,
    NgbRatingModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
