import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { Question } from 'src/app/Model/question';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { AuthService } from 'src/app/Service/auth-service.service';
import { User } from 'src/app/Model/user';
import { RoleName } from 'src/app/Model/role-name';
import { InfoService } from 'src/app/Service/info-service.service';
import { DetailService } from 'src/app/Service/detail.service';
import { ExamInfo } from 'src/app/Model/exam-info';
import { ExamDetail } from 'src/app/Model/exam-detail';
import { Answer } from 'src/app/Model/answer';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnswerService } from 'src/app/Service/answer-service.service';
import { QuestionService } from 'src/app/Service/question-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('targetDiv', { static: false }) targetDiv!: ElementRef;
  public num: number = 0
  public listQuestion: Question[] = []
  public user: User;
  public info: ExamInfo;
  countdown: number = 1200;
  public listDetail: { id: number, question: Question, answerID: number | null, examInfo: ExamInfo }[] = []
  myArray: string[] = ['A', 'B', 'C', 'D'];
  constructor(private categoryService: CategoryServiceService, private questionService: QuestionService, private answerService: AnswerService, private router: Router, private authService: AuthService, private infoService: InfoService, private detailService: DetailService) {
    this.user = {
      id: 0,
      name: "",
      userName: "",
      passWord: "",
      cccd: "",
      phone: "",
      role: RoleName.ROLE_USER,
      examInfo: null
    }

    this.info = {
      id: 0,
      date: new Date,
      score: 0,
      user: this.user,
      examDetailList: []
    }
  }





  // scrollToDiv(id: number) {
  //   const selectedDiv = document.getElementById(id.toString());
  //   if (selectedDiv) {
  //     selectedDiv.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
  scrollToDiv(id: number) {
    const selectedDiv = document.getElementById(id.toString());
    if (selectedDiv) {
      selectedDiv.scrollIntoView({ behavior: 'smooth' });
      selectedDiv.animate([
        { opacity: 0, transform: 'translateY(-10px)' }, // Initial state
        { opacity: 1, transform: 'translateY(0)' } // Final state
      ], {
        duration: 1000, // Animation duration in milliseconds
        easing: 'ease-in-out', // Easing function
        fill: 'both' // Keep the final state after the animation is done
      });
    }
  }
  ngOnInit() {
    this.scrollToDiv(1);

    this.authService.getCurrentUser().subscribe(data => {
      this.user = data
      this.info.user = this.user

      this.infoService.check(this.user).subscribe(check => {
        console.log("aaaaaaaaaaaaaaa", check);

        if (check.data != null && this.checkTimeAndReturn(check.data.date)) {
          console.log("aaaaaaaaaaaaaaa");
          this.info.id = check.data.id
          this.router.navigate(['/info-user'])

        }
        if (check.data != null && this.checkTimeAndReturn(check.data.date) == 0) {
          console.log("aaaaaaaaaaaaaaa");
          this.info.id = check.data.id
          this.countdown = Math.floor((20 * 60 * 1000 - (Date.now() - check.data.date)) / 1000);
          console.log("countdown", this.countdown)
          // this.detailService.getByInfo(this.info.id).subscribe(data => {
          //   console.log("aaaaaaaaaaaaaaa2", data.data);
          //   for (const item of data.data) {
          //     this.questionService.getById(item.questionID).subscribe(question => {
          //       this.listQuestion.push(question.data)
          //       let detail: any = {
          //         id: item.id,
          //         question: question.data,
          //         answerID: item.answerID,
          //         examInfo: this.info
          //       }
          //       this.listDetail.push(detail)
          //       this.setAnsweredQuestionColor()
          //     })

          //     console.log("câu hỏi", this.listQuestion);

          //     // Thực hiện các hành động khác với mỗi item
          //   }
            


          // });
          this.detailService.getByInfo(this.info.id).subscribe(data => {
            console.log("aaaaaaaaaaaaaaa2", data.data);
          
            // Hàm đệ quy để thực hiện các yêu cầu API một cách tuần tự
            const processItem = (index: number) => {
              if (index < data.data.length) {
                const item = data.data[index];
                this.questionService.getById(item.questionID).subscribe(question => {
                  this.listQuestion.push(question.data);
                  let detail: any = {
                    id: item.id,
                    question: question.data,
                    answerID: item.answerID,
                    examInfo: this.info
                  };
                  this.listDetail.push(detail);
                  this.setAnsweredQuestionColor();
          
                  console.log("Câu hỏi đã thêm:", question.data);
          
                  // Gọi đệ quy để xử lý tiếp tục với phần tử tiếp theo
                  processItem(index + 1);
                });
              } else {
                // Khi đã xử lý hết các phần tử trong mảng data.data
                console.log("Hoàn thành xử lý danh sách câu hỏi.");
                // Thực hiện các hành động khác sau khi đã có đầy đủ dữ liệu
              }
            };
          
            // Bắt đầu xử lý từ phần tử đầu tiên của mảng data.data
            processItem(0);
          });
          

        }
        // if (check.data == null) {
        //   console.log("aaaaaaaaabbbbbbbb");
        //   this.categoryService.getData().subscribe(data => {

        //     this.listQuestion = data.data
        //     console.log("lisquestion",this.listQuestion);
            
        //     this.infoService.create(this.info).subscribe(examInfo => {
        //       this.info.id = examInfo.data.id
        //       this.listQuestion.forEach(item => {
        //         let detail: any = {
        //           id: 0,
        //           question: item,
        //           answerID: null,
        //           examInfo: examInfo.data
        //         }
        //         this.detailService.create(detail).subscribe(data => {
        //           detail.id = data.data.id
        //           this.listDetail.push(detail)
        //           console.log(detail);
                  
        //         })
        //       })
        //     })
        //   })
        // }

        if (check.data == null) {
          console.log("aaaaaaaaabbbbbbbb");
          this.categoryService.getData().subscribe(async data => {
            this.listQuestion = data.data;
            console.log("lisquestion", this.listQuestion);
        
            try {
              const examInfo : any = await this.infoService.create(this.info).toPromise();
              this.info.id = examInfo.data.id;
        
              for (const item of this.listQuestion) {
                let detail: any = {
                  id: 0,
                  question: item,
                  answerID: null,
                  examInfo: examInfo.data
                };
        
                const detailData: any = await this.detailService.create(detail).toPromise();
                detail.id = detailData.data.id;
                this.listDetail.push(detail);
                console.log(detail);
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }
          });
        }
      })
    })
    this.startCountdown();
  }
  startCountdown() {
    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.submitAssignment() // Gọi sự kiện khi đếm ngược về 0
        clearInterval(countdownInterval); // Dừng đếm ngược
      }
    }, 1000); // Giảm giá trị của biến đếm sau mỗi 1 giây
  }

  checkTimeAndReturn(givenTime: number): number {
    const currentTime = Date.now();
    const twentyMinutesInMillis = 20 * 60 * 1000;

    if ((currentTime - givenTime) < twentyMinutesInMillis) {
      return 0;
    } else {
      return 1;
    }
  }
  setAnsweredQuestionColor() {
    for (let item of this.listDetail) {
      if (item.answerID != null) {
        let index = this.listQuestion.findIndex(question => question.id === item.question.id)
        const buttons = document.querySelectorAll('.option-button' + item.question.id) as NodeListOf<HTMLButtonElement>;
        console.log("ádasdasd", buttons)
        buttons.forEach(button => {

          if (button.id == item.answerID?.toString()) {
            button.classList.add('active');
          }

        });
        // buttons.classList.add('answered');
        // (event.target as HTMLButtonElement).classList.add('active');
      }
    }
  }
  clearSelection(event: Event, question: Question, answer: Answer) {
    console.log("color", event);

    let index = this.listDetail.findIndex(item => item.question.id === question.id);

    if (index !== -1) {
      // Nếu đã tồn tại A.a1 trong list, cập nhật đối tượng B
      this.listDetail[index].answerID = answer.id;
      this.detailService.update(this.listDetail[index].id, this.listDetail[index]).subscribe(data => {
        console.log(data.data)
        console.log(this.listDetail)


      })
    } else {

      let detail: any = {
        id: 0,
        question: question,
        answerID: answer.id,
        // examInfo: this.info
      }
      // this.detailService.update(item.id,item).subscribe(data => {
      //   item = data.data

      // })
      this.listDetail.push(detail);
    }

    const buttons = document.querySelectorAll('.option-button' + question.id) as NodeListOf<HTMLButtonElement>;
    console.log(buttons)
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    (event.target as HTMLButtonElement).classList.add('active');
  }


  submitAssignment(): void {
    let count = 0;
    //  this.info.examDetailList = this.listDetail;

    // Tạo một mảng chứa các Observable từ các cuộc gọi API
    let observables = this.listDetail.map(item => {
      if (item.answerID != null) {
        return this.answerService.getById(item.answerID).pipe(
          map(answer => {
            console.log(answer.data);
            if (answer.data.check === true) {
              console.log("check", answer.data.check)
              count++;
            }
            return answer;  // Trả về kết quả để tiếp tục chuỗi Observable
          })
        );
      } else {
        return null;
      }
    }).filter(obs => obs !== null);  // Lọc ra các giá trị null

    // Sử dụng forkJoin để đợi tất cả các Observable hoàn thành
    forkJoin(observables).subscribe(() => {
      // let score = (count / this.listQuestion.length) * 10;
      this.info.score = count;
      this.info.user = this.user;
      // this.info.examDetailList = this.listDetail
      console.log("final", this.info);

      this.infoService.update(this.info.id, this.info).subscribe(result => {
        //   this.info = result.data;
        console.log(result.data);
        alert('Bạn đã làm đúng ' + this.info.score + ' câu');
        this.router.navigate(['/info-user']);
        // this.authService.logout().subscribe(data => {
        //   this.authService.removeTokenCookie();
        //   this.router.navigate(['login/']);
        // });
        console.log(this.info);
      });
    }, error => {
      console.error("Error processing assignment", error);
    });
  }

  // submitAssignment(): void {
  //   let count = 0;
  //   this.info.examDetailList= this.listDetail
  //   for (let item of this.listDetail) {
  //     if (item.answerID != null) {
  //       this.answerService.getById(item.answerID).subscribe(answer => {
  //         console.log(answer.data)
  //         if (answer.data.check === true) {
  //           count++
  //         }
  //         // this.detailService.update(item.id,item).subscribe(data => {
  //         //   item = data.data
  //         // })
  //       })
  //     }
  //   }
  //   // let score = (count / this.listQuestion.length) * 10;
  //   this.info.score = count
  //   this.info.user = this.user
  //   console.log("final",this.info)
  //   this.infoService.update(this.info.id, this.info).subscribe(result => {
  //     this.info = result.data
  //     console.log(result.data);
  //     alert('Bạn đã làm đúng' + this.info.score + ' câu');
  //     this.router.navigate(['/info-user'])
  //     // this.authService.logout().subscribe(data => {
  //     //   this.authService.removeTokenCookie()
  //     //   this.router.navigate(['login/'])
  //     // })
  //     console.log(this.info);
  //   })

  // }

  getColor(item: any) {
    return this.listDetail.some(item1 => item1.question.id === item.id && item1.answerID != null) ? 'gray' : '';
  }
  getFontColor(item: any) {
    return this.listDetail.some(item1 => item1.question.id === item.id && item1.answerID != null) ? 'white' : '';
  }

  checkAnswerOfQuestion(question: Question): Answer[] {
    let answerList: Answer[] = [];
    for (let ans of question.answerList) {
      if (ans.answer !== '')
        answerList.push(ans);
    }
    return answerList;
  }
}
