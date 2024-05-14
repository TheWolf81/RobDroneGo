import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, retry } from 'rxjs';
import { map } from 'rxjs';

export interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    nif: string;
    status: string;
    token: string;
}

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

    private userRole: string = "";

    private theUrl = 'http://localhost:3100/api/auth';

    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User | null>(
        JSON.parse(localStorage.getItem('user')!)
        );
        this.user = this.userSubject.asObservable();
    }

    login(email:string, password:string ) {
        return this.http.post<any>(this.theUrl + "/signin", { email, password })
        .pipe(
            map((user: User) => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.startTimer();
                return user;
            }),
            //catchError(this.handleError<User>('login'))
        );
    }
    
    logout() { localStorage.removeItem('user'); }

    downloadData() {
        return this.http.get<any>(this.theUrl + "/requestDataCopy")
        .pipe(
           retry(3)
        );
    }
    
    getToken(): string | null {
        return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).token :null;
    }

    startTimer() {
        // Set a timeout to remove the user from localStorage after 60 minutes
        setTimeout(() => {
            this.logout();
        }, 60*60*1000); // 60 minutes in milliseconds (min*sec*millisec)
    }
    /*private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        this.logout();
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
        };
    }*/

    setUserRole(role: string) {
        this.userRole = role;
      }
    
      getUserRole(): string {
        return this.userRole;
      }

      setAuthenticationStatus(isAuthenticated: boolean): void {
        this.isAuthenticatedSubject.next(isAuthenticated);
      }
}