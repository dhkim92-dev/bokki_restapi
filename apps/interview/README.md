# Bokki API

## Entity
- [InterviewEntity](./src/domain/entity/interview.entity.ts)

## Endpoint
- 인터뷰
  - 인터뷰 생성 : /api/v1/interviews

  요청
  ```http.request
  HOST https://asia-northeast1-bokki-35963.cloudfunctions.net/api
  POST /v1/interviews
  Content-Type application/json
  Authorization Bearer <firebase_token>
  Body {
    "company_name": "보끼,
    "area_of_support": "웹 개발자",
    "stage": "1차 면접",
    "interview_date": "2023-11-29T11:20:31.587Z",
    "review_alarm": 30
  }
  ```

  응답
  ```json
  {
    "message": "면접 목록이 추가되었습니다.",
    "error": null,
    "status": 201,
    "code": "IV-001",
    "data": {
        "id": "TQLWVWu7mgUBjIlNlTRY",
        "member_id": "abcd",
        "company_name": "보끼 인코퍼레이션13",
        "area_of_support": "개발자",
        "stage": "1차 면접",
        "interview_date": "2023-11-29T11:20:31.587Z",
        "review_alarm_at": "2023-11-29T11:20:33.387Z",
        "deleted": false,
        "version": 1
    }
  }
  ```
  - 인터뷰 단건 조회 : /api/v1/interviews/{interview_id:string}
  
  요청
  ```http.request
    HOST https://asia-northeast1-bokki-35963.cloudfunctions.net/api
    Authorization Bearer <firebase_token>
    GET /v1/interviews/{interview_id : string}
  ```

  응답
  ```json
  {
    "message": "면접을 조회하였습니다.",
    "error": null,
    "status": 200,
    "code": "IV-003",
    "data": {
        "id": "zJMiOr4Qjb2czqhCrzJ6",
        "member_id": "abcd",
        "deleted": false,
        "stage": "1차 면접",
        "interview_date": "2023-11-09T11:20:31.587Z",
        "review_alarm_at": "2023-11-09T11:20:33.387Z",
        "company_name": "보끼 인코퍼레이션",
        "area_of_support": "엡 백엔드 개발자",
        "version": 1
    }
  }
  ```

  - 인터뷰 목록 조회: /api/v1/interviews  

  요청
  ```http.request
    HOST https://asia-northeast1-bokki-35963.cloudfunctions.net/api
    Authorization Bearer <firebase_token>
    GET /v1/interviews
  ```

  응답
  ```json
  {
    "message": "면접 목록을 조회하였습니다.",
    "error": null,
    "status": 200,
    "code": "IV-002",
    "data": [
        {
            "id": "pk93nO5mwuxjEqfQ5W02",
            "member_id": "abcd",
            "deleted": false,
            "stage": "1차 면접",
            "interview_date": "2023-11-29T11:20:31.587Z",
            "review_alarm_at": "2023-11-29T11:20:33.387Z",
            "company_name": "보끼 인코퍼레이션1",
            "area_of_support": "개발자",
            "version": 1
        },
        {
            "id": "o3Lckbh4nhwCXGCFhthO",
            "member_id": "abcd",
            "deleted": false,
            "stage": "1차 면접",
            "interview_date": "2023-11-29T11:20:31.587Z",
            "review_alarm_at": "2023-11-29T11:20:33.387Z",
            "company_name": "보끼 인코퍼레이션",
            "area_of_support": "개발자",
            "version": 1
        },
        {
            "id": "MjBDaD3YpaDCvd3LQltZ",
            "member_id": "abcd",
            "deleted": false,
            "stage": "1차 면접",
            "interview_date": "2023-11-29T11:20:31.587Z",
            "review_alarm_at": "2023-11-29T11:20:33.387Z",
            "company_name": "보끼 인코퍼레이션13",
            "area_of_support": "엔드 개발자",
            "version": 1
        },
        {
            "id": "zJMiOr4Qjb2czqhCrzJ6",
            "member_id": "abcd",
            "deleted": false,
            "stage": "1차 면접",
            "interview_date": "2023-11-09T11:20:31.587Z",
            "review_alarm_at": "2023-11-09T11:20:33.387Z",
            "company_name": "보끼 인코퍼레이션",
            "area_of_support": "앱 개발자",
            "version": 1
        }
    ]
  }
  ```



