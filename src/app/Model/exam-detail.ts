import { Answer } from "./answer"
import { ExamInfo } from "./exam-info"
import { Question } from "./question"

export class ExamDetail {
    id!:number
    question!: Question
    answerID!: number | null
    examInfo!: ExamInfo
}
