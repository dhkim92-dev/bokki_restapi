import {Body, Controller, Get, HttpCode, HttpStatus, Inject, Injectable, Param, Post} from "@nestjs/common";
import {InterviewReviewService} from "../application/interview.review.service";
import {Success} from "../common/response/apiresult";
import {InterviewReviewCreateRequest} from "../application/dto/interview.review.create.request.dto";
import {CREATE_INTERVIEW_REVIEW_SUCCESS, GET_INTERVIEW_REVIEW_LIST_SUCCESS, GET_INTERVIEW_REVIEW_SUCCESS} from "../common/response/codes/success.code";
import {CursorList} from "../common/response/cursorlist";
import {StoredInterviewReviewSummary} from "../application/dto/stored.review.dto";

/**
 * 면접 복기 컨트롤러
 */
@Injectable()
@Controller("v1/interview-reviews")
export class InterviewReviewController {

  constructor(
    @Inject("interview.review.service.impl")
    private readonly reviewService : InterviewReviewService) {}
  
  /**
   * 새로운 면접 복기를 등록한다.
   * @param {InterviewReviewCreateRequest} request 면접 복기 내용
   * @return {StoredInterviewReview}
   */
  @Post("")
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Body() request : InterviewReviewCreateRequest) {
    const memberId = "abcd";
    const data = await this.reviewService.createReview(
      memberId,
      request
    );

    const ret = Success(data, CREATE_INTERVIEW_REVIEW_SUCCESS);
    return ret;
  }

  /**
   * 작성한 면접 복기 리스트를 반환한다.
   * @return {ApiResult<CursorList<StoredInterviewReviewSummary>>} 면접 복기 요약 목록 
   */
  @Get("")
  @HttpCode(HttpStatus.OK)
  async getUserReviews() {
    const memberId = "abcd";
    const data = await this.reviewService.getMembersReviews(memberId);
    const listData = new CursorList<StoredInterviewReviewSummary>();
    listData.data = data;
    listData.count = data.length;
    listData.next = null;

    return Success(listData, GET_INTERVIEW_REVIEW_LIST_SUCCESS);
  }

  /**
   * 면접 복기를 반환한다.
   * @param {string} interviewId 인터뷰 고유 식별자
   * @return {ApiResult<StoredInterviewReview>} 저장된 면접 복기 상세 내역 
   */
  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async getReview(@Param("id") interviewId : string) {
    const data = await this.reviewService.getReview(interviewId);
    return Success(data, GET_INTERVIEW_REVIEW_SUCCESS);
  }
}