import { Component } from '@angular/core';
import { Question } from 'src/app/Model/question';
import { QuestionService } from 'src/app/Service/question-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  public question!: Question
  constructor(private location: Location, private service: QuestionService) {

  }
  ngOnInit() {
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];
    this.service.getById(parseInt(id)).subscribe((data) => {

      this.question = data.data
      console.log(this.question)
    })
  }
  goBack() {
    this.location.back();
  }
}
