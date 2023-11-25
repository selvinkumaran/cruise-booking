export interface Feedback {
  id: number;
  comments: string;
  rating: any;
  name?:string;
  userId?:number;
  appUser?: {
    id: number;
    username: string;
    name: string;
  };
}
