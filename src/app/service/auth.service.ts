import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CONSTANT, urlEndpoint } from "../utils/constant";
import { Login } from "../model/login";
import { BehaviorSubject, Observable, map } from "rxjs";
import { AppResponse } from "../model/appResponse";
import { StorageService } from "./storage.service";
import { AppUser } from "../model/appUser";
import { User } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Observables for checking admin status and login status
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    // Check if a user is already logged in on service initialization
    if (storageService.getLoggedInUser().id != null) {
      this.setLoggedIn(storageService.getLoggedInUser());
    }
  }

  // Login function
  login(login: Login): Observable<AppResponse> {
    return this.http
      .post<AppResponse>(`${urlEndpoint.baseUrl}/auth/login`, login)
      .pipe(
        map((user) => {
          // Set authentication data in storage
          this.storageService.setAuthData(
            window.btoa(login.username + ":" + login.password)
          );
          return user;
        })
      );
  }

  // Logout function
  logout() {
    this.storageService.removeAuthData();
    this.isAdminSubject.next(false);
    this.isLoggedInSubject.next(false);
    this.storageService.removeLoggedInUser();
    this.storageService.removeRoute();
    this.router.navigate(["/"], { replaceUrl: true });
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Set user as logged in
  setLoggedIn(user: AppUser): void {
    this.storageService.setLoggedInUser(user);
    this.isLoggedInSubject.next(true);

    let route: string | null = this.storageService.getRoute();
    if (user.role === CONSTANT.USER) {
      if (route === null) route = "";
      this.router.navigate(["/" + route], { replaceUrl: true });
    } else if (user.role === CONSTANT.ADMIN) {
      if (route === null) route = "admin";
      this.isAdminSubject.next(true);
      this.router.navigate(["/" + route], { replaceUrl: true });
    }
  }

  // Register a new user
  register(user: User): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/auth/register`,
      user
    );
  }
}
