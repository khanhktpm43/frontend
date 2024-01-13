import { Component, OnInit } from '@angular/core';
import { RoleName } from 'src/app/Model/role-name';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/Service/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user! : User
  
     
  constructor(private service: AuthService, private router: Router){
    this.user={
      id:0,
      name:"",
      userName:"",
      cccd:"",
      phone:"",
      passWord:"",
      role:null,
examInfo:null,
    }
  }
  
  ngOnInit(): void{
   
    this.checkLogin()
    
     }

  checkLogin(): void {
    let isLogin :boolean = false
    console.log("abc",isLogin);
    isLogin = this.service.isUserLoggedIn();
    
    if (isLogin != false) {
      
      this.router.navigate(['/info-user']);
      alert('Bạn đã đăng nhập.');
    }else{
      this.router.navigate(['/login']);
    }
   
    
  }

  Login(form: any) {
    if (form.valid) {
    this.service.login(this.user).subscribe((result: any) => {console.log("user",result)
      this.user.role = result.role

      console.log("user",this.user)
      if(result.token != null){
      this.service.setTokenCookie(result.token);
      if(result.role==="ROLE_USER"){
        this.router.navigate(['/info-user']); 
      }
      if(result.role==="ROLE_ADMIN"){
        this.router.navigate(['/user']); 
      }
      
      
    }else{
      alert('Đăng nhập không thành công.');
      }
    });

    }
  }
}
