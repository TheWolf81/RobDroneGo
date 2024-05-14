import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Data } from '@angular/router';
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class VerifyAuthService implements CanActivate {
    constructor(private authservice: AuthenticationService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean{
    // check If the user is logged in
    if(localStorage.getItem('user')) { 
        const userString = localStorage.getItem('user');

        if (userString) {
            const user = JSON.parse(userString);
            this.authservice.setAuthenticationStatus(true);
            // Access the 'role' property
            const userRole = user.userDTO.role;
            console.log(userRole);
            this.authservice.setUserRole(userRole);
            this.authservice.setAuthenticationStatus(false);
            // Now you can use 'userRole' in your logic or save it to your UserService if needed.
            const allowedRoles = route.data['roles'];
            console.log(allowedRoles);
            if (allowedRoles) {
                if (allowedRoles.includes(userRole)) {
                    return true;
                }
                else if(allowedRoles == undefined) {
                    return true;
                }
                else {
                    this.router.navigate(['/unauthorized']);
                    return false;
                }
            }

            return true;
        }
        return true; }
    //not logged in so redirect to login page
    //return URL = home
    this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
    this.authservice.setUserRole("");
    this.authservice.setAuthenticationStatus(false);
    return false;
    }
}
