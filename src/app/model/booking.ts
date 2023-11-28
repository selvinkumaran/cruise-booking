export interface Booking {
  id?: number;
  name?: string;
  username?: string;
  bookingStatus?: string;
  bookingDate?: string;
  cruiseName?: string;
  destination?: string;
  paymentDate?: string;
  amount?: number;
  checkInDate?: string;
  checkOutDate?: string;
  userId?:number;
  paymentId?:number;
  tourId?:number;
}
