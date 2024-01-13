import { Answer } from "./answer";
import { Category } from "./category";
import { ExamDetail } from "./exam-detail";
export class Question {
    id !: number
    question!: string
    image!: string
    check !: boolean
    category!: Category
    answerList !: Answer[]
    examDetailList !: ExamDetail[]
}
