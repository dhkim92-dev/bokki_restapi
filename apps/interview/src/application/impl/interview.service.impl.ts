import {Inject, Injectable} from "@nestjs/common/decorators";
import {InterviewService} from "../interview.service";
import {InterviewCreateRequest} from "../dto/InterviewCreateRequest";
import {StoredInterview} from "../dto/StoredInterview";
// import {InterviewRepository} from "../../domain/repository/interview.repository";
import {InterviewBuilder, InterviewEntity} from "../../domain/entity/interview.entity";
import {InterviewRepository} from "../../domain/repository/interview.repository";

@Injectable()
export class InterviewServiceImpl implements InterviewService{

  constructor(
    @Inject("interview.firebase.repository") private readonly interviewRepository: InterviewRepository,
  ) {
  }

  createNewInterview(memberId: string, request: InterviewCreateRequest): Promise<StoredInterview> {
    const newInterview = new InterviewBuilder()
    .member_id(memberId)
    .company_name(request.company_name)
    .area_of_support(request.area_of_support)
    .interview_date(request.interview_date)
    .review_alarm_at(new Date(new Date(request.interview_date).getTime() + 60 * request.review_alarm))
    .stage(request.stage)
    .deleted(false)
    .version(1)
    .build();

    return this.interviewRepository.save(newInterview);
  }

  getInterview(memberId: string, interviewId: string): Promise<InterviewEntity> {
    const interview = this.interviewRepository.findById(interviewId);
    return interview;
  }

  getInterviewList(memberId: string): Promise<StoredInterview[]> {
    return this.interviewRepository.findByAuthor(memberId);
  }
}