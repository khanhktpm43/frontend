import { Component } from '@angular/core';
import { Category } from 'src/app/Model/category';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  public category: Category
  constructor(private location: Location, private service: CategoryServiceService) {
    this.category = {
      id: 0,
      name: "",
      number: 0,
      questionList: []
    }
  }
  ngOnInit() {
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];
    this.service.getById(parseInt(id)).subscribe((data) => {
      this.category = data.data;
      console.log("category", this.category);

    })
  }
  update(year: any) {
    this.service.update(this.category.id, this.category).subscribe((data) => {
      console.log(data)
      alert('Cập nhật thành công.');
      this.ngOnInit()
    })
  }
  goBack() {
    this.location.back();
  }
}
