import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
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
  public listDetail: { id: number, question: Question, answer: Answer, examInfo: ExamInfo }[] = []
  myArray: string[] = ['A', 'B', 'C', 'D'];
  constructor(private categoryService: CategoryServiceService, private router: Router, private authService: AuthService, private infoService: InfoService, private detailService: DetailService) {
    this.user = {
      id: 0,
      name: "",
      userName: "",
      passWord: "",
      cccd:"",
      phone:"",
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
    this.startCountdown();
    this.authService.getCurrentUser().subscribe(data => {
      this.user = data
      this.info.user = this.user
      this.infoService.check(this.user).subscribe(check => {
        if (check.data != null) {
          
          alert('Bạn đã thi với' + check.data.score + 'điểm');
          this.router.navigate(['/info-user'])
          // this.authService.logout().subscribe(data => {
          //   this.authService.removeTokenCookie()
          //   this.router.navigate(['login/'])
          // })
        } 

      })



    })
    this.categoryService.getData().subscribe(data => this.listQuestion = data.data)
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
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'F5') {
      event.preventDefault();
      // Hiển thị cảnh báo cho người dùng
      console.log('Bạn không thể sử dụng phím F5 để tải lại trang!');
    }
  }

  clearSelection(event: Event, question: Question, answer: Answer) {
    let index = this.listDetail.findIndex(item => item.question.id === question.id);

    if (index !== -1) {
      // Nếu đã tồn tại A.a1 trong list, cập nhật đối tượng B
      this.listDetail[index].answer = answer;
    } else {

      let detail: ExamDetail = {
        id: 0,
        question: question,
        answer: answer,
        examInfo: this.info
      }

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
      this.infoService.create(this.info).subscribe(a => {
        console.log("aaaa",a.data);
        this.info = a.data
        console.log("///////",this.info);
      
      
    
    for (let item of this.listDetail) {
      if (item.answer.check === true) {
        count++
      }
      item.examInfo = this.info
      // item.examInfo.id = this.info.id
      console.log("-------------",item);
      // console.log("-------------",item);
      this.detailService.create(item).subscribe(data => {
        item = data.data
        
      })


    }
 
   // let score = (count / this.listQuestion.length) * 10;
    this.info.score = count
    this.info.user = this.user
    this.infoService.update(this.info.id, this.info).subscribe(result => {
      this.info = result.data
      console.log(result.data);
      alert('Bạn đã làm đúng' + this.info.score + ' câu');
      this.router.navigate(['/info-user'])
      // this.authService.logout().subscribe(data => {
      //   this.authService.removeTokenCookie()
      //   this.router.navigate(['login/'])
      // })
      console.log(this.info);
    })
  })
  }
  
  getColor(item:any) {
    return this.listDetail.some(item1 => item1.question.id === item.id) ? 'gray' : '';
  }
  getFontColor(item:any) {
    return this.listDetail.some(item1 => item1.question.id === item.id) ? 'white' : '';
  }

  checkAnswerOfQuestion(question: Question) : Answer[]{
    let answerList: Answer[] = [];
    for (let ans of question.answerList) {
      if (ans.answer !== '')
        answerList.push(ans);
    }
    return answerList;
  }
}
