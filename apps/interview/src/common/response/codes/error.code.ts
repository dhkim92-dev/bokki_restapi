import { ResultCode } from "../resultcode";

/* 사용자 인증 관련 */
export const UNAUTHORIZED : ResultCode = {status: 401, code: "AU-001", message: "사용자 인증을 실패하였습니다."};

/* 글로벌 */
export const RESOURCE_OWNERSHIP_VIOLATION = {status: 401, code: "G-001", message: "접근 권한이 없는 리소스입니다."};
export const BAD_REQUEST = {status: 400, code: "G-002", message: "잘못된 입력입니다."};