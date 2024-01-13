import { Component } from '@angular/core';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/Service/auth-service.service';
import { RoleName } from 'src/app/Model/role-name';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
public user: User
public listRole: Object[]=[]
constructor(private userService: AuthService,private location:Location){
  this.user={
    id:0,
    name:"",
    userName:"",
    passWord:"",
    cccd:"",
    phone:"",
    role: RoleName.ROLE_USER,
    examInfo:null,
  }
}
ngOnInit(){
  this.listRole = Object.values(RoleName)
}
create(form: any){
  if(form.valid){
    this.userService.register(this.user).subscribe(data=>{
      alert('Thêm thành công.');
      this.ngOnInit()
    })
  }
}
goBack() {
  this.location.back();
}
}
