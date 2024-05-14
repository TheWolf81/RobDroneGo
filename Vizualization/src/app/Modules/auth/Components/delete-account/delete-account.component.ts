import { Component } from '@angular/core';
import { AuthServiceManual } from '../../auth.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  email: string = '';
  password: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthServiceManual, private authenticationService: AuthenticationService ) { }

  deleteAccount(): void {
    const accountData = {
      email: this.email,
      password: this.password
    };

    this.authService.deleteAccount(accountData).subscribe(
      (response) => {
        this.successMessage = 'Account deleted successfully!';
        this.errorMessage = null;
        this.resetForm();
      },
      (error) => {
        // Handle error
        console.error('Error deleting account:', error);
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
    this.email = '';
    this.password = '';
  }
}
