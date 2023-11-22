import {Inject, Injectable, Logger} from "@nestjs/common";
import {InterviewReviewService} from "../interview.review.service";
import {StoredInterviewReview, StoredInterviewReviewSummary, convertEntityToStoredInterviewReview, convertEntityToStoredInterviewReviewSummary} from "../dto/stored.review.dto";
import {InterviewReviewRepository} from "../../domain/repository/interview.review.repository";
import {InterviewReviewBuilder} from "../../domain/entity/interview.review.entity";
import {InterviewRepository} from "../../domain/repository/interview.repository";
import {InterviewReviewCreateRequest} from "../dto/interview.review.create.request.dto";

@Injectable()
export class InterviewReviewServiceImpl implements InterviewReviewService {

  constructor(
    @Inject("interview.review.firebase.repository")
    private readonly reviewRepository : InterviewReviewRepository,
    @Inject("interview.firebase.repository")
    private readonly interviewRepository : InterviewRepository) {}

  async createReview(memberId: string, request : InterviewReviewCreateRequest): Promise<StoredInterviewReview> {
    const interview = await this.interviewRepository.findById(request.interview_id);
    Logger.debug(`Interview id : ${interview.id}`)
    const entity = new InterviewReviewBuilder()
    .member_id(memberId)
    .interview_id(interview.id)
    .interview_date(interview.interview_date)
    .company_name(interview.company_name)
    .area_of_support(interview.area_of_support)
    .stage(interview.stage)
    .estimation(request.estimation)
    .interviewers(request.interviewers)
    .duration(request.duration)
    .questions(request.questions)
    .result(request.result)
    .created_at(new Date())
    .updated_at(new Date())
    .deleted(false)
    .version(1)
    .build();

    const savedEntity = await this.reviewRepository.save(entity);

    return convertEntityToStoredInterviewReview(savedEntity);
  }

  async getReview(interviewId: string): Promise<StoredInterviewReview> {
    const review = await this.reviewRepository.findById(interviewId)
    return convertEntityToStoredInterviewReview(review);
  }

  async getMembersReviews(memberId: string): Promise<StoredInterviewReviewSummary[]> {
    const entities = await this.reviewRepository.findByMemberId(memberId)
    return entities.map((value, index, arr) => convertEntityToStoredInterviewReviewSummary(value))
  }
}