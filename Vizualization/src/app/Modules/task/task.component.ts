import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BehaviorSubject, catchError, Observable, of, retry } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

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
