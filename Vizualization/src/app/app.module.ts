import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './authentication_interceptor';
import { UnauthorizedComponent } from './Components/unauthorized/unauthorized.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavBarComponent,
    HomeComponent,
    AuthenticationComponent,
    UnauthorizedComponent,
    ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-irnogjrtnf4tbveq.us.auth0.com',
      clientId: '3MFdXoaeCok9DyeaHF9GgCfTW5kJsYL9',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
