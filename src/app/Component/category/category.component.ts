import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Model/category';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
public list : Category[] = []
public category !: Category
constructor(private service: CategoryServiceService, private router: Router){
 this.category={
  id: 0,
  name:"",
  number:0,
  questionList: []
 }
}
ngOnInit(){
  this.service.getAll().subscribe(data=>{
    this.list = data.data
    console.log("aaaa",this.list);
    console.log("aaaa",data.data);
  })
}

delete(i: any) {
  this.service.delete(i).subscribe(data =>
    this.ngOnInit()
  )
}
update(i: any) {
  this.router.navigate(['category/detail/', i]);
}
create(form: any) {
if(form.valid){
  this.service.create(this.category).subscribe(data=> this.ngOnInit())
}
}
}
