import {InterviewReviewCreateRequest} from "./dto/interview.review.create.request.dto";
import {StoredInterviewReview, StoredInterviewReviewSummary} from "./dto/stored.review.dto";

export interface InterviewReviewService {

  createReview(memberId : string, request : InterviewReviewCreateRequest) : Promise<StoredInterviewReview>;

  getReview(interviewId : string) : Promise<StoredInterviewReview>;

  getMembersReviews(memberId : string) : Promise<StoredInterviewReviewSummary[]>;
}