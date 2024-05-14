import { Component, Inject } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {
  email: string = '';
  password: string = '';

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }
  
  ngOnInit() {
  }

  
  logIn(): void {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authenticationService.login(data.email, data.password).subscribe(
      (response) => {
        // Handle successful response
        this.errorMessage = null;
        this.successMessage = "Authentication Successful";
        this.router.navigate(['']);

      },
      (error) => {
        // Handle error
        console.error('Error creating account:', error);
        if(error.error.message) {
          this.errorMessage = error.error.message;
        }
        else if(error.error.errors.message) {
          this.errorMessage = error.error.errors.message;
        }
        else {
          this.errorMessage = error.error;
        }
        this.successMessage = null;
      }
    );

  }
  
  resetForm(): void {
    this.email = '';
    this.password = '';
    this.errorMessage = null;
    this.successMessage = null;
  }
}
