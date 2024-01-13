import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/Model/question';
import { QuestionService } from 'src/app/Service/question-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  public listQuestion: Question[]=[]
  public searchText: any
  public p =1
  constructor(private service: QuestionService, private router: Router){

  }
  ngOnInit(){
    this.service.getAll().subscribe(data=>{
      this.listQuestion = data.data

    })
  }
  delete(id: number) {
    this.service.getById(id).subscribe(data=>{
      data.data.check = true
      this.service.update(data.data.id, data.data).subscribe((result) => {
        console.log(result)
        this.ngOnInit()
      })
    })
   
   
  }

  update(id: number) {
    this.router.navigate(['question/detail/', id]);
  }
  create() {
    this.router.navigate(['question/create/']);
  }
}
