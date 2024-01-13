import { Question } from "./question"
export class Category {
    id!: number
    name !: string
    number!: number
    questionList !: Question[]
}
