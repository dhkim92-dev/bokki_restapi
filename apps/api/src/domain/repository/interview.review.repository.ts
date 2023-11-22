import {InterviewReviewEntity} from "../entity/interview.review.entity";

export interface InterviewReviewRepository {
  
  save(entity : InterviewReviewEntity) : Promise<InterviewReviewEntity>;

  findById(id : string) : Promise<InterviewReviewEntity>;

  findByMemberId(memberId : string) : Promise<InterviewReviewEntity[]>;

  findByResult(result : string) : Promise<InterviewReviewEntity[]>;

  findByEstimation(estimation : string) : Promise<InterviewReviewEntity[]>;
};