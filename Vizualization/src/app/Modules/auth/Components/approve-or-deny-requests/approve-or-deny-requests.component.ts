import { Component } from '@angular/core';
import { AuthServiceManual } from '../../auth.service';

@Component({
  selector: 'app-approve-or-deny-requests',
  templateUrl: './approve-or-deny-requests.component.html',
  styleUrls: ['./approve-or-deny-requests.component.css']
})
export class ApproveOrDenyRequestsComponent {

  userEmail: string = '';
  newStatus: string = '';
  selectedUser: any = null;
  users!: any[];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthServiceManual) { }

  ngOnInit() {
    this.authService.getPendingResgistrationUsers().subscribe(
      (users) => {
        console.log(users);
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = error.error.message || 'User not authorized to view user requests.';
      }
    );
  }

  setUserDetails() {
    this.selectedUser = this.users.find(user => user.email === this.userEmail);
  }

  submit() {

    const data = {
      email: this.userEmail,
      newStatus: this.newStatus
    };

    this.authService.approveOrDenyRequest(data).subscribe(
      (response) => {
        console.log(response);
        this.errorMessage = null;
        this.successMessage = 'Successfully updated user status.';
        this.resetForm();
      },
      (error) => {
        console.error('Error updating user status:', error);
        this.successMessage = null;
        this.errorMessage = error.error.message || 'Could not update user status. Please review the form.';
        this.resetForm();
      }
    );
  }

  resetForm(): void {
    this.userEmail = '';
    this.newStatus = '';
    this.selectedUser = null;
    this.users  = [];
    this.ngOnInit();
  }

}
