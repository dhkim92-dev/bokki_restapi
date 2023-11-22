import {
  InterviewReviewEntity
} from "../../domain/entity/interview.review.entity";
import {QuestionInfo} from "../../domain/entity/questions";
import {InterviewSummary} from "./interview.summary.dto";

export interface StoredInterviewReview {
  id : string;
  member_id : string;
  interview_info : InterviewSummary
  questions : QuestionInfo[];
  created_at : Date;
};

export interface StoredInterviewReviewSummary {
  id : string;
  member_id : string;
  interview_info : InterviewSummary;
  created_at : Date;
};

export function convertEntityToStoredInterviewReview(entity : InterviewReviewEntity) : StoredInterviewReview {
  return {
    id : entity.id,
    member_id : entity.member_id,
    interview_info : {
      id: entity.interview_id,
      company: entity.company_name,
      area_of_support: entity.area_of_support,
      stage: entity.stage,
      interviwers: entity.interviewers,
      date: entity.interview_date,
      result: entity.result,
      estimation: entity.estimation,
    },
    questions: entity.questions,
    created_at: entity.created_at,
  }
}

export function convertEntityToStoredInterviewReviewSummary(entity : InterviewReviewEntity) : StoredInterviewReviewSummary {
  return {
    id : entity.id,
    member_id : entity.member_id,
    interview_info : {
      id: entity.interview_id,
      company: entity.company_name,
      area_of_support: entity.area_of_support,
      stage: entity.stage,
      interviwers: entity.interviewers,
      date: entity.interview_date,
      result: entity.result,
      estimation: entity.estimation,
    },
    created_at: entity.created_at,
  }
}