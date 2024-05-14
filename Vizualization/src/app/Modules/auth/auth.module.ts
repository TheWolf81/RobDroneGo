import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import  { FormsModule } from '@angular/forms';
import { AuthServiceManual } from './auth.service';
import { CreateAccountAsAdminComponent } from './Components/create-account-as-admin/create-account-as-admin.component';
import { ApproveOrDenyRequestsComponent } from './Components/approve-or-deny-requests/approve-or-deny-requests.component';
import { EditAccountComponent } from './Components/edit-account/edit-account.component';
import { DeleteAccountComponent } from './Components/delete-account/delete-account.component';

@NgModule({
  declarations: [
    AuthComponent,
    CreateAccountComponent,
    CreateAccountAsAdminComponent,
    ApproveOrDenyRequestsComponent,
    EditAccountComponent,
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  providers: [
    AuthServiceManual
  ]
})

export class AuthModule { }