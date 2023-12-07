import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Sets the logged-in user in local storage.
   * @param user - The AppUser object representing the logged-in user.
   */
  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  /**
   * Retrieves the logged-in user from local storage.
   * @returns AppUser representing the logged-in user.
   */
  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  /**
   * Removes the logged-in user from local storage.
   */
  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  /**
   * Sets the current route in local storage.
   * @param route - The current route.
   */
  public setRoute(route: string | null): void {
    if (route !== null) localStorage.setItem('route', route);
  }

  /**
   * Retrieves the current route from local storage.
   * @returns string | null representing the current route.
   */
  public getRoute(): string | null {
    return localStorage.getItem('route');
  }

  /**
   * Removes the current route from local storage.
   */
  public removeRoute(): void {
    localStorage.removeItem('route');
  }

  /**
   * Sets authentication data in local storage.
   * @param authData - The authentication data.
   */
  setAuthData(authData: string) {
    localStorage.setItem('authData', authData);
  }

  /**
   * Retrieves authentication data from local storage.
   * @returns string | null representing the authentication data.
   */
  public getAuthData(): string | null {
    return localStorage.getItem('authData');
  }

  /**
   * Removes authentication data from local storage.
   */
  public removeAuthData(): void {
    localStorage.removeItem('authData');
  }

  /**
   * Sets the payment ID in local storage.
   * @param paymentData - The payment ID.
   */
  setPaymentId(paymentData: string) {
    localStorage.setItem('paymentData', paymentData);
  }

  /**
   * Retrieves the payment ID from local storage.
   * @returns string | null representing the payment ID.
   */
  public getPaymentId(): string | null {
    return localStorage.getItem('paymentData');
  }

  /**
   * Removes the payment ID from local storage.
   */
  public removePaymentId(): void {
    localStorage.removeItem('paymentData');
  }
}
