export interface Payment {
  id:number;
  nameRef?: string;
  numberRef?: string;
  addressRef?: string;
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  userId?:number;
  amount:number;
  paymentDate?:string;
}
