import { Injectable } from '@angular/core';
import { Subject, catchError, retry, throwError } from 'rxjs';
import { mazeData } from './Modules/three-dvisualization/Components/view-floor/default_data';
import { HttpClient } from '@angular/common/http';

export interface writeResponse {
    data: string;
    filePath: string;
}


export class ModelChangeFloor {
    private modelChangedSource = new Subject<void>();
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:3000/api/write';
    errorMessage: string | null = null;
    d: string | null = null;
    f: string | null = null;

    public async setData(responde:writeResponse) {
       console.log(responde.data)
     
      const done= this.http.patch(this.baseUrl + "/write", responde).pipe(
            retry(3),
            catchError(error => {
                console.error("Error ", error);
                return throwError(error);
            }));
            done.subscribe(
                (response: any) => {
                    console.log(response);
                },
                (error: any) => {
                    console.log(error);
                    this.errorMessage = error.error.message;
                  }
            );

        //this.http.post<writeResponse>('http://localhost:3000/write/write', {data, filePath}).subscribe(res => {
        // mazeData.url = filePath;
        //const write = new Write()
        // Abre o arquivo para leitura e escrita
        // let position = 9; // A posição onde você quer escrever
        //write.setData(data,filePath);
        /*
            // Abre o arquivo para leitura e escrita
            let fileDescriptor = fs.openSync(filePath, 'r+');
        
            // Converte os dados para um Buffer
            let buffer = Buffer.from(data);
        
            // Escreve os dados no arquivo na posição especificada
            fs.writeSync(fileDescriptor, buffer, 0, buffer.length, position);
        
            // Fecha o arquivo
            fs.closeSync(fileDescriptor);
        */

    }
    public async getPath(origem:string,destino:string){
     return this.http.get('http://localhost:8080/'+'path?origem='+origem+ '&destino='+destino)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in consultRobots:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );


    }
}

