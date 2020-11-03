import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3002/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any> {
    return this.http.get(API_URL + 'documents', { responseType: 'text' });

  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'users', { responseType: 'text' });
  }

  postDocument(document): Observable<any> {
    return this.http.post(API_URL + 'documents', {
      file: document.file, 
      title: document.title
    }, httpOptions)
  }

}