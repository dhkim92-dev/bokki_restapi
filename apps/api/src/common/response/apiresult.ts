import { ResultCode } from "./resultcode";

export class ApiResult<T> {
  readonly status: number;
  readonly code: string;
  readonly data: T | null;
  readonly message: string | null = null;
  readonly error: string | null = null

  /**
   * 
   * @param {number} status HTTP Status code
   * @param {string} code Application Status code
   * @param {T | null} data API 반환 결과
   * @param {string | null} message 성공 시 반환 메세지, 실패 시 null
   * @param {string | null} error  실패 시 반환 메시지, 성공 시 null
   */
  constructor(status : number, code : string, data : T, message : string | null, error : string | null) {
    this.status = status;
    this.code = code;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}

export function Success<T>(data : T, code : ResultCode) {
  return new ApiResult(
    code.status,
    code.code,
    data,
    code.message,
    null
  );
}
