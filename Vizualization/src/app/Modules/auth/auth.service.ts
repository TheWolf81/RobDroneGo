import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, config, retry, throwError } from 'rxjs';


export interface CreateAccountResponse {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    nif: string;
    phoneNumber: string;
}

export interface CreateAccountResponse2 {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    nif: string;
    phoneNumber: string;
    role: string;
}

export interface EditAccountRequest {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    nif?: string;
}

export interface RolesResponse{
    id: string;
    name: string;
}

export interface ApproveOrDenyRequestResponse {
    email: string;
    newStatus: string;
}

export interface EmailPasswordCombination {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthServiceManual {
    
    private baseUrl = 'http://localhost:3100/api';

    constructor(private http: HttpClient) {}

    createAccount(account: CreateAccountResponse): Observable<CreateAccountResponse> {
        console.log(account);
        return this.http.post<CreateAccountResponse>(this.baseUrl + '/auth/signupClient', account)
            .pipe(
                retry(3)
            );
    }

    createAccountAsAdmin(account: CreateAccountResponse): Observable<CreateAccountResponse> {
        return this.http.post<CreateAccountResponse>(this.baseUrl + '/auth/signupAdmin', account)
            .pipe(
                retry(3)
            );
    }

    getRoles(): Observable<RolesResponse[]> {
        return this.http.get<RolesResponse[]>(this.baseUrl + '/roles')
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in getRoles:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }

    getPendingResgistrationUsers(): Observable<CreateAccountResponse2[]> {
        return this.http.get<CreateAccountResponse2[]>(this.baseUrl + '/auth/pendingRegistrationUsers')
            .pipe(
                retry(3)
            );
    }

    approveOrDenyRequest(response: ApproveOrDenyRequestResponse): Observable<any> {
        return this.http.put<any>(this.baseUrl + '/auth/approveOrDenyUserRegistration', response)
            .pipe(
                retry(3)
            );
    }

    editAccount(account: EditAccountRequest): Observable<any> {
        return this.http.patch<EditAccountRequest>(this.baseUrl + '/auth/editAccount', account)
            .pipe(
                retry(3)
            );
    }   

    deleteAccount(account: EmailPasswordCombination): Observable<any> {
        return this.http.delete<EmailPasswordCombination>(this.baseUrl + '/auth/deleteAccount', { body: account })
            .pipe(
                retry(3)
            );
    }


}