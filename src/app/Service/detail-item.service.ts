import { Injectable } from '@angular/core';
import { ExamInfo } from '../Model/exam-info';

@Injectable({
  providedIn: 'root'
})
export class DetailItemService {
item:ExamInfo;
  constructor() {
    this.item={
      id:0,
      date:new Date(),
      score:0,
      user: null,
      examDetailList:[]
    }
   }
}
