import { Component } from '@angular/core';
import { AuthServiceManual, EditAccountRequest } from '../../auth.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  nif: string = '';

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthServiceManual) { }


  editAccount() {
    const accountData: EditAccountRequest = {};
    if(this.firstName === '' && this.lastName === '' && this.username === '' && this.email === '' && this.phoneNumber === '' && this.nif === '') {
      this.successMessage = null;
      this.errorMessage = 'You must fill at least one field!';
      return;
    }
    if(this.firstName !== '') {
      accountData.firstName = this.firstName;
    }
    if(this.lastName !== '') {
      accountData.lastName = this.lastName;
    }
    if(this.username !== '') {
      accountData.username = this.username;
    }
    if(this.email !== '') {
      accountData.email = this.email;
    }
    if(this.phoneNumber !== '') {
      accountData.phoneNumber = this.phoneNumber;
    }
    if(this.nif !== '') {
      accountData.nif = this.nif;
    }
    console.log(accountData);
    this.authService.editAccount(accountData).subscribe(
      (response) => {
        console.log('Account edited:', response);
        this.successMessage = 'Account edited successfully!';
        this.errorMessage = null;
        this.resetForm();
      },
      (error) => {
        console.error('Error editing account:', error);
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
    this.email = '';
    this.phoneNumber = '';
    this.nif = '';
  }
}
