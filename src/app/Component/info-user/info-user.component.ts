import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent {
  public user: User
  constructor(private userService: AuthService, private router: Router) {
    this.user = {
      id: null,
      name: "",
      cccd: "",
      phone: "",
      userName: "",
      passWord: "",
      role: null,
      examInfo: null
    }
  }
  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data => {

      this.user = data
      console.log(this.user);



    })
  }
  start() {
    this.router.navigate(['/home']);
  }
  logout() {
    this.ngOnInit()
    this.userService.logout().subscribe(data => {
      this.userService.removeTokenCookie()

      this.ngOnInit()
      this.router.navigate(['login'])
    })
    this.ngOnInit()
    // Xử lý logic khi button được click
    console.log('Button Logout');
  }
click(){
  if(this.user.examInfo !=null){
  this.router.navigate(['user/detail/',this.user.examInfo.id]);
}
}
}
