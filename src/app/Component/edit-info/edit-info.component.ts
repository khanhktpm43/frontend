import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Service/auth-service.service';
import { User } from 'src/app/Model/user';
@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent {
  user! : any
  id !:number 
  constructor(private location: Location, private authService: AuthService){
    this.user={
     
      name:"",
      
      cccd:"",
      phone:"",
     
    }
  }
  ngOnInit(){
    const path = window.location.pathname;
    const segments = path.split('/');
     this.id = parseInt(segments[segments.length - 1]);
    this.authService.getById(this.id).subscribe(data=>{
      this.user = data.data
    })
  }
  goBack() {
    this.location.back();
  }
update(form:any){
  if (form.valid) {
    this.authService.edit(this.id,this.user).subscribe(data=>{
      
    })
  }
}
}
