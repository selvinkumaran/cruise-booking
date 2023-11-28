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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'feedback/all', component: FeedbackOperationComponent },
  { path: 'tour', component: TourComponent },
  { path: 'destination', component: DestinationComponent },
  { path: 'cruise', component: CruiseComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'service', component: ServiceComponent },

  { path: 'admin/users', component:AdminUsersComponent },
  { path: 'admin/tour', component:AdminTourComponent },
  { path: 'admin/tour/operation', component:TourOperationComponent },
  { path: 'admin/cruise', component:AdminCruiseComponent },
  { path: 'admin/cruise/operation', component:CruiseOperationComponent },
  { path: 'admin/payment', component:AdminPaymentComponent },
  { path: 'admin/booking', component:AdminBookingComponent },
  { path: 'admin/feedback', component:AdminFeedbackComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
