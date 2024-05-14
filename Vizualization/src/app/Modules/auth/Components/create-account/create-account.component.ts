import { Component, Inject } from '@angular/core';
import { AuthServiceManual, CreateAccountResponse } from 'src/app/Modules/auth/auth.service';
import { AuthService } from '@auth0/auth0-angular';
import { distinctUntilChanged, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  username: string = '';
  nif: string = '';
  phoneNumber: string = '';
  agree: boolean = false;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(@Inject(DOCUMENT) public document: Document, private authService: AuthServiceManual, public auth:AuthService) {
  auth.isAuthenticated$.subscribe((isAuthenticated) => {
    console.log('Is Authenticated with Auth0:', isAuthenticated);
  });
  this.resetForm();
}
  ngOnInit() {
  }

  createAccount(): void {
    const userData = {
      email: this.email,
      password: this.password,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      nif: this.nif,
      phoneNumber: this.phoneNumber
    };

    console.log(userData);
    

    if(!this.agree) {
      this.errorMessage = 'You must agree with the privacy policy and terms of use.';
      this.successMessage = null;
      console.log(this.agree);
      return;
    }

    this.authService.createAccount(userData).subscribe(
      (response: CreateAccountResponse) => {
        
        this.successMessage = 'Request registered successfully!';
        this.errorMessage = null;
      },
      (error) => {
        // Handle error
        console.error('Error creating account:', error);
        if(error.error.message) {
          this.errorMessage = error.error.message;
        }
        else {
          this.errorMessage = error.error;
        }
        this.successMessage = null;
      }
    );
    this.resetForm();

  }

  createAccountAuth0(): void {
    this.auth.loginWithPopup().subscribe((response) => {
      this.auth.user$.subscribe((user) => {
        console.log(user);
        this.firstName = user?.given_name || '';
        this.lastName = user?.family_name || '';
        if(user?.nickname?.includes('@')) {
          this.username = user?.nickname?.split('@')[0] || '';
        }
        else {
          this.username = user?.nickname || '';
        }
        this.email = user?.email || '';
      });
    });
  }

  resetForm(): void {
    this.email = '';
    this.password = '';
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.nif = '';
    this.phoneNumber = '';
    this.agree = false;
    this.errorMessage = null;
    this.successMessage = null;
  }

}
