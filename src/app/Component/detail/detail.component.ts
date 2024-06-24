import { Component } from '@angular/core';
import { Question } from 'src/app/Model/question';
import { AnswerService } from 'src/app/Service/answer-service.service';
import { DetailItemService } from 'src/app/Service/detail-item.service';
import { DetailService } from 'src/app/Service/detail.service';
import { InfoService } from 'src/app/Service/info-service.service';
import { QuestionService } from 'src/app/Service/question-service.service';
import { Location } from '@angular/common';
import { Answer } from 'src/app/Model/answer';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  public Item: any
  myArray: string[] = ['A', 'B', 'C', 'D'];
  public list: { question: number, answer: number }[] = []
  public listResult: { question: Question | null, answer: number |null }[] = []
  constructor(private location: Location, private infoService: InfoService, private detailService: DetailService, private questionService: QuestionService, private answerService: AnswerService) {

  }
  // ngOnInit() {
  //   const path = window.location.pathname;
  //   const segments = path.split('/');
  //   const id = segments[segments.length - 1];
  //   this.infoService.getById(parseInt(id)).subscribe(examInfo => {
  //     this.Item = examInfo.data;

  //     console.log("bbbbbbbbb", this.Item);

  //     for (let item of this.Item.examDetailList) {
  //       let object: { question: number, answer: number | null } = { question: 0, answer: null };
  //       this.detailService.getById(item.id).subscribe(data => {

  //         object.question = data.data.questionId
  //         object.answer = data.data.answerId
  //         this.questionService.getById(object.question).subscribe(data1 => {
  //           let object1: { question: Question | null, answer: number | null } = { question: null, answer: object.answer };
  //           object1.question = data1.data
  //           this.listResult.push(object1)

  //         })
  //       })

  //     }
  //     console.log("aaaaaaaaaaaaaaaa", this.listResult);
  //   })
  // }
  async ngOnInit() {
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];
  
    try {
      const examInfo = await this.infoService.getById(parseInt(id)).toPromise();
      if (examInfo && examInfo.data) {
        this.Item = examInfo.data;
        console.log("bbbbbbbbb", this.Item);
  
        for (let item of this.Item.examDetailList) {
          let object: { question: number, answer: number | null } = { question: 0, answer: null };
  
          const detailData = await this.detailService.getById(item.id).toPromise();
          if (detailData && detailData.data) {
            object.question = detailData.data.questionId;
            object.answer = detailData.data.answerId;
  
            const questionData = await this.questionService.getById(object.question).toPromise();
            if (questionData && questionData.data) {
              let object1: { question: Question | null, answer: number | null } = { question: null, answer: object.answer };
              object1.question = questionData.data;
              this.listResult.push(object1);
            }
          }
        }
  
        console.log("aaaaaaaaaaaaaaaa", this.listResult);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  
  
  goBack() {
    this.location.back();
  }

  checkAnswerOfQuestion(question: Question | null): Answer[] {
    let answerList: Answer[] = [];
    if (question)
      for (let ans of question.answerList) {
        if (ans.answer !== '' )
          answerList.push(ans);
      }
    return answerList;
  }
}
