import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class TaskService {
    baseUrl = 'http://localhost:8080/';
    baseUrl2 = 'http://localhost:5232/api/Task';

    constructor(private http: HttpClient) {}

    viewPath(room1Id: string, room2Id: string): Observable<string> {
      room1Id = room1Id.toLowerCase();
      room2Id = room2Id.toLowerCase();
      return this.http.get<string>(this.baseUrl + 'path?origem=' + room1Id + '&destino=' + room2Id)
        .pipe(
          retry(1),
          catchError((error) => {
            return throwError(error);
          })
        );
    }

    requestTask(task: any): Observable<any> {
      return this.http.post<any>(this.baseUrl2, task)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }

    getRequestedTasks(): Observable<any> {
      return this.http.get<any>(this.baseUrl2 + "/GetByStatus/requested")
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }

    approveTask(id: string): Observable<any> {
      return this.http.patch<any>(this.baseUrl2 + "/Approve/" + id, null)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }

    denyTask(id: string): Observable<any> {
      return this.http.patch<any>(this.baseUrl2 + "/Deny/" + id, null)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }

    getTasksByStatus(status: string): Observable<any> {
      return this.http.get<any>(this.baseUrl2 + "/GetByStatus/" + status)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }

    getTasksByUser(email: string): Observable<any> {
      return this.http.get<any>(this.baseUrl2 + "/GetByEmail/" + email)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }

    getTasksByTypeOfDevice(typeOfDevice: string): Observable<any> {
      return this.http.get<any>(this.baseUrl2 + "/GetByTypeOfDevice/" + typeOfDevice)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }
    getListOfTasksEx(){
      return this.http.get<string>(this.baseUrl + "task/melhor_sequencia")
        .pipe(
          retry(3),
          catchError((error) => {
            return throwError(error);
          })
        );
    }
    getListOfTasksAG(NG:string,DP:string,P1:string,P2:string){
      return this.http.get<string>(this.baseUrl + "task/genetico?ng="+NG+"&dp="+DP+"&p1="+P1+"&p2="+P2)
        .pipe(
          retry(3),
          catchError((error) => {
            return throwError(error);
          })
        );
    }
  }
