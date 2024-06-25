import { Component, OnInit } from '@angular/core';
import { RoleName } from 'src/app/Model/role-name';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/Service/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfoService } from 'src/app/Service/info-service.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user!: User


  constructor(private service: AuthService, private Info: InfoService, private router: Router) {
    this.user = {
      id: 0,
      name: "",
      userName: "",
      cccd: "",
      phone: "",
      passWord: "",
      role: null,
      examInfo: null,
    }
  }

  ngOnInit(): void {

    this.checkLogin()

  }

  checkLogin(): void {
    let isLogin: boolean = false
    console.log("abc", isLogin);
    isLogin = this.service.isUserLoggedIn();

    if (isLogin != false) {

      this.router.navigate(['/info-user']);
      alert('Bạn đã đăng nhập.');
    } else {
      this.router.navigate(['/login']);
    }


  }
  checkTime(givenTime: number): void {
    const currentTime = Date.now();
    const twentyMinutesInMillis = 20 * 60 * 1000;

    if ((currentTime - givenTime) < twentyMinutesInMillis) {
      this.router.navigate(['/home']);
    } else {
      console.log('More than 20 minutes have passed since the given time.');
    }
  }
  Login(form: any) {
    if (form.valid) {
      this.service.login(this.user).subscribe((result: any) => {
        console.log("user", result)
        this.user.role = result.role
        this.user.id = result.id
        console.log("user", this.user)
        if (result.token != null) {
          this.service.setTokenCookie(result.token);
          if (result.role === "ROLE_USER") {
            this.Info.check(this.user).subscribe(data => {
              console.log("login", data);

              if (data.data != null && data.data.score == 0) {
                this.checkTime(data.data.date);
              }
            })
            this.router.navigate(['/info-user']);
          }
          if (result.role === "ROLE_ADMIN") {
            this.router.navigate(['/user']);
          }


        } else {
          alert('Đăng nhập không thành công.');
        }
      });

    }
  }
}
