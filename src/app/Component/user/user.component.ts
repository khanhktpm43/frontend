import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/Service/auth-service.service';
import { DetailItemService } from 'src/app/Service/detail-item.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public listUser: User[] = []
  public searchText: any
  public p = 1
  constructor(private itemService: DetailItemService, private service: AuthService, private router: Router) {

  }
  ngOnInit() {
    this.service.getAll().subscribe(data => {
      this.listUser = data.data
      console.log(this.listUser);


    })
  }
  create() {
    this.router.navigate(['user/create/']);
  }
  detail(item: any) {

    this.router.navigate(['user/detail/', item.examInfo.id]);
  }
  edit(id: number) {

    this.router.navigate(['user/edit-info/', id]);
  }
}
