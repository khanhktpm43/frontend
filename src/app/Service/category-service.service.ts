import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from '../Model/response-object';
import { AuthService } from './auth-service.service';
import { Category } from '../Model/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private REST_API_SERVER = 'http://localhost:8181/api/category';
  

  constructor(private http: HttpClient, private auth: AuthService) {
    let token = auth.getTokenCookie()
  
   }
  

getAll(): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/`);
}
getData(): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/exam`);
}
getById(id: number): Observable<ResponseObject> {
  return this.http.get<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}

create(category: Category): Observable<ResponseObject> {
  return this.http.post<ResponseObject>(`${this.REST_API_SERVER}/`, category);
}

update(id: number, category: Category): Observable<ResponseObject> {
  return this.http.put<ResponseObject>(`${this.REST_API_SERVER}/` + id, category);
}

delete(id: number): Observable<ResponseObject> {
  return this.http.delete<ResponseObject>(`${this.REST_API_SERVER}/` + id);
}
}
