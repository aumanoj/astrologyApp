import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const token =  'Bearer ' + JSON.parse(sessionStorage.getItem("accessToken"));
const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json; charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Credentials": "true",
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Authorization': `Bearer ${token}`,
  })
 };

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  headers: HttpHeaders;
  
  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
   }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append("Access-Control-Allow-Credentials", "true");
    headers = headers.append('Access-Control-Allow-Headers', '*');
    //headers = headers.append('Token', 'Bearer ' + sessionStorage.getItem("accessToken"));
    headers = headers.append('Authorization', token);
    
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return headers;
}

  getAll(url): Observable<any> {
    return this.http.post(environment.baseUrl + url, '', { responseType: 'text', headers: this.headers })
  }

  get(url, id): Observable<any> {
    return this.http.get(`${environment.baseUrl + url}${id}`);
  }

  postWithoutAuth(url, data): Observable<any> {
    return this.http.post(environment.baseUrl + url, data);
  }

  post(url, data): Observable<any> {
    debugger
    return this.http.post(environment.baseUrl + url, data,  { responseType: 'text', headers: this.headers });
  }

  update(url, id, data): Observable<any> {
    return this.http.put(`${environment.baseUrl + url}/${id}`, data);
  }

  delete(url, id): Observable<any> {
    return this.http.delete(`${environment.baseUrl + url}/${id}`);
  }

  deleteAll(url): Observable<any> {
    return this.http.delete(environment.baseUrl + url);
  }
}
