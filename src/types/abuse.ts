import { Answer } from "./answer";

export type Abuse = {
  date: Date
  person_name: string
  message: string
  support_read_status: number
  support_answer_status: number
  answers: Answer[]
}