import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/user/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { FeedbackComponent } from './component/user/feedback/feedback.component';
import { TourComponent } from './component/user/tour/tour.component';
import { CruiseComponent } from './component/user/cruise/cruise.component';
import { BookingComponent } from './component/user/booking/booking.component';
import { AdminUsersComponent } from './component/admin/users/users.component';
import { AdminTourComponent } from './component/admin/tour/tour.component';
import { AdminCruiseComponent } from './component/admin/cruise/cruise.component';
import { AdminBookingComponent } from './component/admin/booking/booking.component';
import { AdminFeedbackComponent } from './component/admin/feedback/feedback.component';
import { DestinationComponent } from './component/user/destination/destination.component';
import { PaymentComponent } from './component/user/payment/payment.component';
import { CruiseOperationComponent } from './component/admin/cruise/cruise-operation/cruise-operation.component';
import { TourOperationComponent } from './component/admin/tour/tour-operation/tour-operation.component';
import { FeedbackOperationComponent } from './component/user/feedback/feedback-operation/feedback-operation.component';
import { AdminPaymentComponent } from './component/admin/payment/payment.component';
import { FooterComponent } from './component/footer/footer.component';
import { ServiceComponent } from './component/user/service/service.component';
import { AllTourComponent } from './component/user/all-tour/all-tour.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [authGuard] },
  {
    path: 'feedback/all',
    component: FeedbackOperationComponent,
    canActivate: [authGuard],
  },
  { path: 'tour', component: TourComponent, canActivate: [authGuard] },
  { path: 'all/tour', component: AllTourComponent, canActivate: [authGuard] },
  {
    path: 'destination',
    component: DestinationComponent,
    canActivate: [authGuard],
  },
  { path: 'cruise', component: CruiseComponent, canActivate: [authGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'service', component: ServiceComponent, canActivate: [authGuard] },

  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/tour',
    component: AdminTourComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/tour/operation',
    component: TourOperationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/cruise',
    component: AdminCruiseComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/cruise/operation',
    component: CruiseOperationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/payment',
    component: AdminPaymentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/booking',
    component: AdminBookingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/feedback',
    component: AdminFeedbackComponent,
    canActivate: [authGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
