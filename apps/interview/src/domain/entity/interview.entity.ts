import { DocumentSnapshot } from "firebase-admin/firestore";
import { Collection } from "fireorm";

@Collection("interviews")
export class InterviewEntity {
  id!: string;
  member_id!: string;
  company_name!: string;
  area_of_support!: string;
  stage!: string;
  interview_date!: Date;
  review_alarm_at!: Date;
  deleted!: boolean;
  version!: number;
}

/**
 * @class Interview
 */
// export class InterviewEntity{
//   private id: string;
//   private member_id: string;
//   private company_name: string;
//   private area_of_support!: string;
//   private stage: string;
//   private interview_date!: Date;
//   private review_alarm_at: Date;
//   private deleted: boolean;
//   private version: number;

//   /**
//    * Interview 생성자
//    * @param member_id 사용자 식별자
//    * @param company_name 지원 회사명
//    * @param area_of_support 지원 직군
//    * @param stage 면접 종류
//    * @param interview_date  면접 예정 시간
//    * @param deleted 삭제 여부
//    * @param version 엔티티 버전
//    */
//   constructor(
//     id : string,
//     member_id: string,
//     company_name: string,
//     area_of_support: string,
//     stage: string,
//     interview_date: Date,
//     review_alarm_at: Date,
//     deleted : boolean,
//     version: number
//   ) {
//     this.id = id;
//     this.member_id = member_id;
//     this.area_of_support = area_of_support;
//     this.company_name = company_name;
//     this.interview_date = interview_date;
//     this.review_alarm_at = review_alarm_at;
//     this.stage = stage;
//     this.deleted = deleted;
//     this.version = version;
//   }

//   set _id(value : string) {
//     this.id = value;
//   }
  
//   get _id() : string {
//     return this.id;
//   }

//   get memberId() : string {
//     return this.member_id;
//   }

//   get companyName() : string {
//     return this.company_name;
//   }

//   get areaOfSupport(): string {
//     return this.area_of_support;
//   }

//   get interviewDate(): Date {
//     return this.interview_date;
//   }

//   updateInterviewDate(value : Date) {
//     this.interview_date = value;
//   }

//   isDeleted() : boolean { 
//     return this.deleted;
//   }

//   delete() {
//     this.deleted = true;
//   }

//   get _reviewAlarmAt() : Date {
//     return this.review_alarm_at;
//   }

//   get _stage() : string {
//     return this.stage;
//   }

//   get _version() : number {
//     return this.version
//   }
// }

export const interviewConverter = {
  toFirestore : function(entity: InterviewEntity) {
    return {
      ...entity 
    }
  },

  fromFirestore : function(snapshot : DocumentSnapshot) {
    const data = snapshot.data()!

    return new InterviewBuilder()
    .id(data.id)
    .member_id(data.member_id)
    .company_name(data.company_name)
    .area_of_support(data.area_of_support)
    .stage(data.stage)
    .deleted(data.deleted)
    .interview_date(data.interview_date)
    .review_alarm_at(data.review_alarm_at)
    .version(data.version)
    .build()
  }
}

/**
 * @class InterviewBuilder
 */
export class InterviewBuilder {
  private _id: string = "";
  private _member_id: string = "";
  private _company_name: string = "";
  private _area_of_support: string = "";
  private _stage: string = ""
  private _interview_date: Date = new Date();
  private _review_alarm_at: Date | null = null;
  private _deleted: boolean = false;
  private _version: number = 1;

  constructor() {

  }

  /**
   * Interview를 생성하여 반환
   * @returns {InterviewEntity}
   */
  build(): InterviewEntity {
    if(this._review_alarm_at == null) {
      this._review_alarm_at = new Date(this._interview_date.getTime() + 1000 * 60 * 30);
    }

    const interview = new InterviewEntity()
    interview.id = this._id,
    interview.member_id = this._member_id,
    interview.company_name = this._company_name,
    interview.area_of_support = this._area_of_support,
    interview.stage = this._stage,
    interview.interview_date = this._interview_date,
    interview.review_alarm_at = this._review_alarm_at!,
    interview.deleted = this._deleted,
    interview.version = this._version
    
    return interview
  }

  id(value: string) : InterviewBuilder {
    this._id = value;
    return this;
  }

  /**
   * member_id setter
   * @param {string} value 사용자 식별자
   * @returns {InterviewBuilder} 
   */
  member_id(value: string) : InterviewBuilder {
    this._member_id = value;
    return this;
  }

  /**
   * company_name setter
   * @param {string} value 회사 명
   * @returns {InterviewBuilder}
   */
  company_name(value: string) : InterviewBuilder {
    this._company_name = value;
    return this;
  }

  /**
   * area_of_support setter
   * @param {string} value 지원 직군
   * @returns {InterviewBuilder}
   */
  area_of_support(value: string) : InterviewBuilder {
    this._area_of_support = value;
    return this;
  }

  /**
   * stage setter
   * @param {string} value 먼접 유형 
   * @returns {InterviewBuilder}
   */
  stage(value: string) : InterviewBuilder {
    this._stage = value;
    return this;
  }

  /**
   * interview_date setter
   * @param {Date} value 면접 예정 일시
   * @returns {InterviewBuilder}
   */
  interview_date(value: Date) : InterviewBuilder {
    this._interview_date = value;
    return this;
  }

  /**
   * review_alarm_at setter
   * @param {Date} value 면접 복기 알람 시각
   * @returns {InterviewBuilder}
   */
  review_alarm_at(value: Date) : InterviewBuilder {
    this._review_alarm_at = value;
    return this;
  }

  /**
   * deleted setter
   * @param {boolean} value 삭제 여부
   * @returns {InterviewBuilder}
   */
  deleted(value : boolean) : InterviewBuilder {
    this._deleted = value;
    return this;
  }

  /**
   * version setter
   * @param {number} value @default 1
   * @returns {InterviewBuilder}
   */
  version(value: number) : InterviewBuilder {
    this._version = value;
    return this;
  }
}
