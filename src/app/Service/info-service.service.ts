import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from '../Model/response-object';
import { AuthService } from './auth-service.service';
import { ExamInfo } from '../Model/exam-info';
import { User } from '../Model/user';
@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private REST_API_SERVER = 'http://localhost:8181/api/exam-info';
  

  constructor(private http: HttpClient, private auth: AuthService) {
    let token = auth.getTokenCookie()
  
   }
  

getAll(): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/`);
}

getById(id: number): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}

create(ExamInfo: ExamInfo): Observable<ResponseObject> {
  return this.http.post<ResponseObject>(`${this.REST_API_SERVER}/`, ExamInfo);
}
check(user: User): Observable<ResponseObject> {
  return this.http.post<ResponseObject>(`${this.REST_API_SERVER}/check`, user);
}

update(id: number, ExamInfo: ExamInfo): Observable<ResponseObject> {
  return this.http.put<ResponseObject>(`${this.REST_API_SERVER}/` + id, ExamInfo);
}

delete(id: number): Observable<ResponseObject> {
  return this.http.delete<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}
}
