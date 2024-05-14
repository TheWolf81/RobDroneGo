import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BehaviorSubject, catchError, Observable, of, retry } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {

  userRole: string = "";
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit() {
    this.authSubscription = this.authenticationService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.userRole = this.authenticationService.getUserRole();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logOut(): void { 
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  dowanloadData(): void {
    this.authenticationService.downloadData().subscribe(
      (data) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        saveAs(blob, 'YourRobDroneGoData.json');
        this.errorMessage = null;
        this.successMessage = 'Your data is ready.';
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error.message + ". Unable to download data";
        this.successMessage = null;
      }
    );
  }

  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

}