export interface ApiResponse {
  status: number,
  code: string,
  payload: any,
  message: string | null,
  error: string | null
}
