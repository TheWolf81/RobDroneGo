import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { CreateAccountAsAdminComponent } from './Components/create-account-as-admin/create-account-as-admin.component';
import { ApproveOrDenyRequestsComponent } from './Components/approve-or-deny-requests/approve-or-deny-requests.component';
import { EditAccountComponent } from './Components/edit-account/edit-account.component';
import { DeleteAccountComponent } from './Components/delete-account/delete-account.component';

const routes: Routes = [
  {path: 'create', component: CreateAccountAsAdminComponent},
  { path: 'register', component: CreateAccountComponent },
  { path: 'approveOrDenyRequests', component: ApproveOrDenyRequestsComponent },
  { path: 'editAccount', component: EditAccountComponent },
  { path: 'deleteAccount', component: DeleteAccountComponent },
  {  path: '', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
