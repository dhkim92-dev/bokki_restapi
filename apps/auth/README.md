## API Endpoints

### https://host/authentication 
- Method : POST
- Description : OAuth Provider, Access Token을 제출하여 Firebase Custom Token을 발급받는다.  
  회원가입이 되지 않은 경우 회원 가입이 이루어지고 Custom Token이 발급되고,  
  이미 회원가입이 된 사용자의 경우 변경된 사용자 정보가 반영 된 이후 Custom Token이 발급된다.

Required Body Example
```json
{
  "provider" : "naver", // naver or kakao, case insensitive
  "access_token" : "access_token_that_published_by_provider."
}
```
Success Response Examples
```json
{
  "status" : 200,
  "code" : "A-000",
  "payload" : { 
    "firebase_token" : "firebase_token"
  },
  "message" : "Custom token이 발행되었습니다.",
  "error" : null
}
```

Failure Response Examples
```json
{
  "status" : 401,
  "code" : "A-002",
  "payload" : null,
  "message" : null,
  "error" : "Invalid Access token"
}
```

---
### ErrorCodes
- G-000 : 내부서버 오류
- A-000 : Request body에 provider 가 존재하지 않음
- A-001 : Request body에 access_token 이 존재하지 않음
- A-002 : 유효하지 않은 Access Token
- A-003 : 리소스 서버에서 유저 정보 조회 실패