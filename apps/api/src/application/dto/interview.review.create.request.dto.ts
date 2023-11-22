import {Interviewer} from "../../domain/entity/interviewers";
import {QuestionInfo} from "../../domain/entity/questions";

export interface InterviewReviewCreateRequest {
  interview_id : string
  estimation : string
  duration : number
  result? : string
  interviewers: Interviewer[]
  questions : QuestionInfo[]
}
