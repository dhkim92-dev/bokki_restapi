import {ApiResponse} from "../response/ApiResponse";

export const INTERNAL_SERVER_ERROR : ApiResponse = {
  status: 500,
  code: "G-000",
  payload: null,
  message: null,
  error: "내부 서버 오류",
};

export const NOT_SUPPORTED_METHOD : ApiResponse = {
  status: 405,
  code: "G-001",
  payload: null,
  message: null,
  error: "지원하지 않는 Http method 입니다.",
};

export const NO_PLATFORM_PROVIDED : ApiResponse = {
  status: 400,
  code: "A-000",
  payload: null,
  message: null,
  error: "인증 플랫폼이 명시되지 않았습니다. (ex. naver, kakao, google)",
};

export const NO_ACCESS_TOKEN : ApiResponse = {
  status: 400,
  code: "A-001",
  payload: null,
  message: null,
  error: "Access token이 제공되어야 합니다",
};

export const INVALID_ACCESS_TOKEN : ApiResponse = {
  status: 401,
  code: "A-002",
  payload: null,
  message: null,
  error: "Invalid Access token",
};

export const NO_USER_FOUND : ApiResponse = {
  status: 404,
  code: "A-003",
  payload: null,
  message: null,
  error: "리소스 서버에 해당 유저 정보가 없습니다",
};
