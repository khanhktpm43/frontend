import { ExamDetail } from "./exam-detail"
import { User } from "./user"

export class ExamInfo {
    id!: number
    date!: Date
    score!: number
    user!: User| null
    examDetailList!: ExamDetail[]
}
