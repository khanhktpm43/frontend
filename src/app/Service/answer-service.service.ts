import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from '../Model/response-object';
import { AuthService } from './auth-service.service';
import { Answer } from '../Model/answer';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private REST_API_SERVER = 'http://localhost:8080/api/answer';
  

  constructor(private http: HttpClient, private auth: AuthService) {
    let token = auth.getTokenCookie()
  
   }
  

getAll(): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/`);
}

getById(id: number): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}

create(answer: Answer): Observable<ResponseObject> {
  return this.http.post<ResponseObject>(`${this.REST_API_SERVER}/`, answer);
}

update(id: number, answer:  Answer): Observable<ResponseObject> {
  return this.http.put<ResponseObject>(`${this.REST_API_SERVER}/` + id, answer);
}

delete(id: number): Observable<ResponseObject> {
  return this.http.delete<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}
}
