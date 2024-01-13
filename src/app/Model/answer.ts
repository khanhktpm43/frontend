import { ExamDetail } from "./exam-detail"
import { Question } from "./question"

export class Answer {
    id!: number
    answer!: string
    check!: boolean
    question!:Question
    examDetailList!: ExamDetail[]
}
