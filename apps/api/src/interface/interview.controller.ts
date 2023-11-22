import {Body, Controller, Get, HttpCode, Inject, Injectable, Param, Post} from "@nestjs/common/decorators";
import {InterviewService} from "../application/interview.service";
import {InterviewCreateRequest} from "../application/dto/InterviewCreateRequest";
import {Success} from "../common/response/apiresult";
import {StoredInterview} from "../application/dto/stored.interview.dto";
import {CREATE_INTERVIEW_SUCCESS, GET_INTERVIEW_LIST_SUCCESS, GET_INTERVIEW_SUCCESS} from "../common/response/codes/success.code";
import {HttpStatus} from "@nestjs/common";

@Controller("v1/interviews")
@Injectable()
export class InterviewRestController{
  constructor(@Inject("interview.service.impl") private readonly interviewService: InterviewService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createInterview(@Body() req: InterviewCreateRequest) {
    const data = await this.interviewService.createNewInterview("abcd", req);

    return Success<StoredInterview>(data, CREATE_INTERVIEW_SUCCESS);
  }

  @Get("")
  @HttpCode(HttpStatus.OK)
  async getInterviews() {
    const data = await this.interviewService.getInterviewList("abcd");

    return Success<StoredInterview[]>(data, GET_INTERVIEW_LIST_SUCCESS);
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async getInterview(@Param("id") id : string) {
    const data = await this.interviewService.getInterview("abcd", id);

    return Success<StoredInterview>(data, GET_INTERVIEW_SUCCESS);
  }
}
