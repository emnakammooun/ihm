import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Clients } from './clients';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {


  /*getAll(): void {
    this.cleService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des clients simulés :', error);
      }
    );
  }

  ajoutclient(client: Clients): Observable<Clients> {
    // Simulez l'ajout de client en ajoutant le client à la liste simulée
    this.clients.push(client);
    return of(client); // Simulez la réponse avec le client ajouté
  }
*/

  REST_API: string = 'http://127.0.0.1:8000/api/clients';
  httpHeaders=new HttpHeaders().set('Content-Type','application/json');
    constructor(private httpClient: HttpClient) { }
  
    getClients(){
      return this.httpClient.get(`${this.REST_API}`);
    }
    
    getClient(id:any): Observable<any> {
        let API_URL = `${this.REST_API}/${id}`;
        return this.httpClient.post(API_URL,{headers:this.httpHeaders})
        .pipe(map((res:any)=>{
          return res || {}
        }),
        catchError(this.handleError));
        }
      
    addClient(data:Clients): Observable<any> {
        let API_URL = `${this.REST_API}`;
        return this.httpClient.post(API_URL,data)
        .pipe(catchError(this.handleError))
      }

      deleteClient(id: any ): Observable<any> {
        let API_URL = `${this.REST_API}/${id}`;
        return this.httpClient.delete(API_URL,  { headers: this.httpHeaders })
          .pipe(catchError(this.handleError))
      }

      handleError(error:HttpErrorResponse){
        let errorMessage="";
        if(error.error instanceof ErrorEvent){
          errorMessage=error.error.message;}
        else{
          errorMessage=`Error Code: ${error.status}\n Message:${error.message}`
        }
        console.log(errorMessage);
        return throwError(errorMessage)}
        
      
        
        updateClient(id:any,data:Clients): Observable<any> {
          let API_URL = `${this.REST_API}/${id}`;
          return this.httpClient.put(API_URL,data, {headers:this.httpHeaders})
          .pipe(
          catchError(this.handleError));
          }

        }
    /*  
   find(_id:object): Observable<any> {
    return this.httpClient.get(this.apiURL + _id)
    }
    update(_id:object, client:Clients): Observable<any> {
    return this.httpClient.put(this.apiURL  + _id, client)
    }
    delete(_id:object){
    return this.httpClient.delete(this.apiURL + _id)
    }*/
    
  