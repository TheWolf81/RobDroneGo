import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from "../../authentication.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  userRole: string = "";

  constructor(private authservice: AuthenticationService) { }

  ngOnInit(): void {
    this.authSubscription = this.authservice.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.userRole = this.authservice.getUserRole();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
