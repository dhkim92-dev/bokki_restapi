import {Body, Controller, Get, Inject, Injectable, Param, Post} from "@nestjs/common/decorators";
import {InterviewService} from "../application/interview.service";
import {InterviewCreateRequest} from "../application/dto/InterviewCreateRequest";
import { Success } from "../common/response/apiresult";
import { StoredInterview } from "../application/dto/StoredInterview";
import { CREATE_INTERVIEW_SUCCESS, GET_INTERVIEW_LIST_SUCCESS, GET_INTERVIEW_SUCCESS } from "../common/response/codes/success.code";

@Controller("v1/interviews")
@Injectable()
export class InterviewRestController{
  constructor(@Inject("interview.service.impl") private readonly interviewService: InterviewService) {
  }

  @Post()
  async createInterview(@Body() req: InterviewCreateRequest) {
    const data = await this.interviewService.createNewInterview("abcd", req);

    return Success<StoredInterview>(data, CREATE_INTERVIEW_SUCCESS);
  }

  @Get("")
  async getInterviews() {
    const data = await this.interviewService.getInterviewList("abcd");

    return Success<StoredInterview[]>(data, GET_INTERVIEW_LIST_SUCCESS);
  }

  @Get("/:id")
  async getInterview(@Param("id") id : string) {
    const data = await this.interviewService.getInterview("abcd", id);

    return Success<StoredInterview>(data, GET_INTERVIEW_SUCCESS);
  }
}
