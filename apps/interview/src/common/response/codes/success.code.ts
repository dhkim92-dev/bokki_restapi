import { ResultCode } from "../resultcode";

/*면접 관련 코드*/
export const CREATE_INTERVIEW_SUCCESS : ResultCode = {status: 201, code: "IV-001", message: "면접 목록이 추가되었습니다."};
export const GET_INTERVIEW_LIST_SUCCESS : ResultCode = {status: 200, code: "IV-002", message: "면접 목록을 조회하였습니다."};
export const GET_INTERVIEW_SUCCESS : ResultCode = {status: 200, code: "IV-003", message: "면접을 조회하였습니다."};
export const UPDATE_INTERVIEW_SUCCESS : ResultCode = {status: 200, code: "IV-004", message: "면접 정보를 수정하였습니다."};
export const DELETE_INTERVIEW_SUCCESS : ResultCode = {status: 204, code: "IV-005", message: "면접을 삭제하였습니다."};