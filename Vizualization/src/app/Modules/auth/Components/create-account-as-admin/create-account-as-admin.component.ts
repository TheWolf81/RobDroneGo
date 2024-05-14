import { Component } from '@angular/core';
import { AuthServiceManual } from '../../auth.service';

@Component({
  selector: 'app-create-account-as-admin',
  templateUrl: './create-account-as-admin.component.html',
  styleUrls: ['./create-account-as-admin.component.css']
})
export class CreateAccountAsAdminComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  role: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  nif: string = '';
  roles!: any[];

  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private authservice: AuthServiceManual) { }

  ngOnInit(): void {
    this.authservice.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  createAccountAdmin(): void {
    const accountData = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      role: this.role,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      nif: this.nif
    };

    this.authservice.createAccountAsAdmin(accountData).subscribe(
      (response) => {
        // Handle successful response
        console.log('New account created:', response); // log the entire response object
        this.successMessage = 'Account created successfully!';
        this.errorMessage = null;
        // Reset form fields
        this.resetForm();
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
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.role = '';
    this.email = '';
    this.password = '';
    this.phoneNumber = '';
    this.nif = '';
  }

}
