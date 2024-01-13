
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Service/auth-service.service';

// guard kiểm soát việc người dùng có quyền truy cập vào một route hay không
@Injectable({
  providedIn: 'root',
})

export class userGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  Promise<boolean> {
    
    return this.checkUser();
  }

  async checkUser() {
    const isAdmin = await this.authService.checkRole();
    if (isAdmin) {
      alert('Không có quyền truy cập!!!');
      this.authService.logout().subscribe(data=>{ 
        this.authService.removeTokenCookie()
        
        
        this.router.navigate(['login/'])
        })
      return false;
    } else {
      
      return true;
    }
  }
  
};