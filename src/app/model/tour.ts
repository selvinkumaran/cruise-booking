export interface Tour {
  id?: number;
  cruiseId: number|null;
  cruiseName?: string;
  cruiseCapacity?: number;
  cruiseDescription?: string;
  cruisePhoto?: null;
  price: number|null;
  checkInDate: string;
  checkOutDate: string;
  destination?: string;
  balance?: number;
  cruise?:{
    id:number;
    name:string;
    description:string;
    photo:string;
    capacity:number;
  }
}

