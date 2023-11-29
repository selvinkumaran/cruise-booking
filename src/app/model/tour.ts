export interface Tour {
  id?: number;
  cruiseId: number;
  cruiseName?: string;
  cruiseCapacity?: number;
  cruiseDescription?: string;
  cruisePhoto?: null;
  price: number;
  checkInDate: string;
  checkOutDate: string;
  destination?: string;
  balance?: number;
  cruise?:{
    id:number;
    name:string;
    description:string;
    photo:string;
  }
}

