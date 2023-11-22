import {Interviewer} from "../../domain/entity/interviewers";

export interface InterviewSummary {
  id : string
  company: string
  area_of_support : string
  date : Date
  stage : string
  interviwers : Interviewer[]
  result : string;
  estimation : string;
}
