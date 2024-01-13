
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Service/auth-service.service';

// guard kiểm soát việc người dùng có quyền truy cập vào một route hay không
@Injectable({
  providedIn: 'root',
})

export class authGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      
      alert('Vui lòng đăng nhập!!!');
      // this.router.navigate(['/login']);
      return false;
    }
  }
};