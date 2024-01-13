import { Component } from '@angular/core';

import { Router,NavigationEnd  } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from './Model/user';
import { RoleName } from './Model/role-name';
import { AuthService } from './Service/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '';
  public user: User;
  public userRole: RoleName = RoleName.ROLE_ADMIN;
  

  constructor(private userService: AuthService , private router: Router){
    this.user={
      id:null,
      name:"",
      cccd:"",
      phone:"",
      userName:"",
      passWord:"",
      role:null,
      examInfo:null
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit()
        // Xử lý sự kiện khi router chuyển đổi component con
        console.log('Router đã chuyển đổi component con');
        // Thực hiện các tác vụ tùy chỉnh ở đây
      }
    });
    
   
  }
  ngOnInit(){
   
    this.userService.getCurrentUser().subscribe(data=> {
      
      this.user = data
    console.log(this.user);
    
      
     
    })
  
  }

  onButtonClick2() {
    this.ngOnInit()
     this.userService.logout().subscribe(data=>{ 
    this.userService.removeTokenCookie()
    
    this.ngOnInit()
    this.router.navigate(['login/'])
    })
    this.ngOnInit()
    // Xử lý logic khi button được click
    console.log('Button Logout');
  }
}
