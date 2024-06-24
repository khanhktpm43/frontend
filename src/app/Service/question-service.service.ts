import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from '../Model/response-object';
import { AuthService } from './auth-service.service';
import { Question } from '../Model/question';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private REST_API_SERVER = 'http://localhost:8080/api/question';
  

  constructor(private http: HttpClient, private auth: AuthService) {
    let token = auth.getTokenCookie()
  
   }
  

getAll(): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/`);
}

getById(id: number): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}

create(question: Question): Observable<ResponseObject> {
  return this.http.post<ResponseObject>(`${this.REST_API_SERVER}/`, question);
}

update(id: number, question: Question): Observable<ResponseObject> {
  return this.http.put<ResponseObject>(`${this.REST_API_SERVER}/` + id, question);
}

delete(id: number): Observable<ResponseObject> {
  return this.http.delete<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}
}
