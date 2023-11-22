import {Collection} from "fireorm";
import {QuestionInfo} from "./questions";
import {Interviewer} from "./interviewers";

@Collection("InterviewReview")
export class InterviewReviewEntity {
  id! : string;
  member_id! : string;
  interview_id! : string;
  interview_date! : Date;
  company_name! : string;
  area_of_support! : string;
  stage! : string;
  estimation! : string;
  interviewers! : Interviewer[];
  duration!: number;
  questions! : QuestionInfo[]; 
  result! : string;
  created_at! : Date;
  updated_at! : Date;
  deleted! : boolean;
  version! : number;
}

export class InterviewReviewBuilder {
  private _id! : string;
  private _member_id! : string;
  private _interview_id! : string;
  private _company_name! : string;
  private _area_of_support! : string;
  private _interview_date! : Date;
  private _stage! : string;
  private _estimation : string = "NORMAL";
  private _interviewers : Interviewer[] = [];
  private _duration : number = 30;
  private _questions : QuestionInfo[] = [];
  private _result : string = "대기중";
  private _created_at! : Date;
  private _updated_at! : Date;
  private _deleted : boolean = false;
  private _version : number = 1;

  id(value : string) : InterviewReviewBuilder {
    this._id= value;
    return this;
  }


  member_id(value : string) : InterviewReviewBuilder {
    this._member_id= value;
    return this;
  }


  interview_id(value : string) : InterviewReviewBuilder {
    this._interview_id= value;
    return this;
  }

  company_name(value : string) : InterviewReviewBuilder {
    this._company_name= value;
    return this;
  }

  area_of_support(value : string) : InterviewReviewBuilder {
    this._area_of_support= value;
    return this;
  }

  interview_date(value : Date) : InterviewReviewBuilder {
    this._interview_date = value;
    return this;
  }

  stage(value : string) : InterviewReviewBuilder {
    this._stage= value;
    return this;
  }
   
  estimation(value : string) : InterviewReviewBuilder {
    this._estimation = value;
    return this;
  }

  interviewers(value : Interviewer[]) : InterviewReviewBuilder {
    this._interviewers = value;
    return this;
  }

  duration(value : number | null) : InterviewReviewBuilder {
    if(value == null) {
      this._duration = 30
    } else {
      this._duration = value;
    }
    return this;
  }

  questions(value : QuestionInfo[]) : InterviewReviewBuilder {
    this._questions = value;
    return this;
  }

  result(value : string | null | undefined) : InterviewReviewBuilder {
    if(value === undefined || value === null) {
      this._result = "대기중"
    } else {
      this._result = value;
    }

    return this;
  }

  created_at(value : Date) : InterviewReviewBuilder {
    this._created_at = value;
    return this;
  }

  updated_at(value : Date) : InterviewReviewBuilder {
    this._updated_at = value;
    return this;
  }

  deleted(value : boolean) : InterviewReviewBuilder {
    this._deleted = value;
    return this;
  }

  version(value : number) : InterviewReviewBuilder {
    this._version = value; 
    return this;
  }

  build() : InterviewReviewEntity {
    const review = new InterviewReviewEntity()
    review.id = this._id;
    review.member_id = this._member_id;
    review.interview_id = this._interview_id;
    review.company_name = this._company_name;
    review.area_of_support = this._area_of_support;
    review.interview_date = this._interview_date;
    review.stage = this._stage;
    review.estimation = this._estimation;
    review.interviewers = this._interviewers;
    review.duration = this._duration;
    review.questions = this._questions;
    review.result = this._result;
    review.created_at = this._created_at;
    review.updated_at = this._updated_at;
    review.deleted = this._deleted;
    review.version = this._version;
    
    return review;
  }
}