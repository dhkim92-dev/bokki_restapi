import { InterviewCreateRequest } from "./dto/InterviewCreateRequest";
import { StoredInterview } from "./dto/StoredInterview";

export interface InterviewService {

  createNewInterview(memberId: string, request: InterviewCreateRequest): Promise<StoredInterview>

  getInterview(memberId: string, interviewId: string): Promise<StoredInterview>

  getInterviewList(memberId: string): Promise<StoredInterview[]>,
};