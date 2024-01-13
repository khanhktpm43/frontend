import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Inject,Injector  } from '@angular/core';
import{CookieService} from 'ngx-cookie-service'
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public flag: boolean = false
  private REST_API_SERVER = 'http://localhost:8181/api/user';
  private readonly TOKEN_KEY="authorization"



  constructor(private cookieService: CookieService , private httpClient: HttpClient) {
    

  }
  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/`);
  }
  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.REST_API_SERVER}/register`, user);
  }

  login(user: any): Observable<any> {
 
    return this.httpClient.post(`${this.REST_API_SERVER}/login`, user);

  }
  logout(): Observable<any> {
 
    return this.httpClient.post(`${this.REST_API_SERVER}/logout`, null);
  }

  update(request: any): Observable<any> {
    return this.httpClient.post(`${this.REST_API_SERVER}/update`, request);
  }

  getCurrentUser(): Observable<any> {
    
    return this.httpClient.get(`${this.REST_API_SERVER}/test`);
  }
  getTokenCookie(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  setTokenCookie(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token, { expires: 1, path: '/' });
  }

  removeTokenCookie(): void {
    this.cookieService.delete(this.TOKEN_KEY, '/');
  }
  isAuthenticated():boolean{
    const token = this.getTokenCookie();

    return !!token
  }
  async checkRole(): Promise<boolean> {
    const data = await this.getCurrentUser().toPromise();
    const role = data.role;
    if (role === "ROLE_ADMIN") {
      return true;
    } else {
      
      return false;
    }
  }
  
  isUserLoggedIn():boolean{
    return this.isAuthenticated()
  }

}
