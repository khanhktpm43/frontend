import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from '../Model/response-object';
import { AuthService } from './auth-service.service';
import { ExamInfo } from '../Model/exam-info';
import { ExamDetail } from '../Model/exam-detail';
@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private REST_API_SERVER = 'http://localhost:8080/api/exam-detail';
  

  constructor(private http: HttpClient, private auth: AuthService) {
    let token = auth.getTokenCookie()
  
   }
  

getAll(): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/`);
}

getById(id: number): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}
getByInfo(id: number): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/exam-info/` + id);
}
create(detail: ExamDetail): Observable<ResponseObject> {
  return this.http.post<ResponseObject>(`${this.REST_API_SERVER}/`, detail);
}

update(id: number, detail: ExamDetail): Observable<ResponseObject> {
  return this.http.put<ResponseObject>(`${this.REST_API_SERVER}/` + id, detail);
}

delete(id: number): Observable<ResponseObject> {
  return this.http.delete<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}
}
