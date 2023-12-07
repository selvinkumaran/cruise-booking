import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // BehaviorSubject to track the loading state
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}
}
