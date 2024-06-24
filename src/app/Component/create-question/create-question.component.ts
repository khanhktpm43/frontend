import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Answer } from 'src/app/Model/answer';
import { Category } from 'src/app/Model/category';
import { Question } from 'src/app/Model/question';
import { AnswerService } from 'src/app/Service/answer-service.service';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { QuestionService } from 'src/app/Service/question-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  public question: Question
  public listCategory: Category[] = []
  public answer1: Answer
  public answer2: Answer
  public answer3: Answer
  public answer4: Answer
  constructor(private location: Location, private fireStorage: AngularFireStorage, private questionService: QuestionService, private answerService: AnswerService, private categoryService: CategoryServiceService) {
    this.question = {
      id: 0,
      question: "",
      image: "",
      check: false,
      category: this.listCategory[0],
      answerList: [],
      examDetailList: [],
    }
    this.answer1 = {
      id: 0,
      answer: "",
      question: this.question,
      examDetailList: [],
      check: false,
    }
    this.answer2 = {
      id: 0,
      answer: "",
      question: this.question,
      examDetailList: [],
      check: false,
    }
    this.answer3 = {
      id: 0,
      answer: "",
      question: this.question,
      examDetailList: [],
      check: false,
    }
    this.answer4 = {
      id: 0,
      answer: "",
      question: this.question,
      examDetailList: [],
      check: false,
    }
  }
  ngOnInit() {
    this.categoryService.getAll().subscribe(data => this.listCategory = data.data)
  }
  create(form: any) {
    if (form.valid) {
      this.questionService.create(this.question).subscribe(data => {
        this.answer1.question = data.data
        this.answer2.question = data.data
        this.answer3.question = data.data
        this.answer4.question = data.data
        this.answerService.create(this.answer1).subscribe(data1 => data1)
        this.answerService.create(this.answer2).subscribe(data2 => data2)
        this.answerService.create(this.answer3).subscribe(data3 => data3)
        this.answerService.create(this.answer4).subscribe(data4 => data4)
        alert('Thêm thành công.');
        this.ngOnInit()
      })
    }
  }
  async onFileChange(event: any) {
    const file = event?.target?.files?.[0]; // Kiểm tra xem event, target và files có tồn tại trước khi truy cập
    if (file) {
      const randomId = Math.random().toString(36).substring(2); // Tạo chuỗi ngẫu nhiên
      const fileName = `${randomId}_${file.name}`; // Kết hợp chuỗi ngẫu nhiên với tên tệp gốc
      const path = `image/${fileName}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log("url", url);

      this.question.image = url;
    }
  }
  goBack() {
    this.location.back();
  }
}
