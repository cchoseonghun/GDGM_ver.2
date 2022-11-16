GDGM
====

사용된 외부 모듈
------------
### Node.js
```
express
cors
dotenv
path
winston
mysql
bcrypt
mongodb
mongoose
```

### React
```
react-router-dom
axios
@reduxjs/toolkit
react-redux
redux-persist
```

### 앞으로 추가되야할 기능 (11.16)
- 레이드(Raids) 생성 (완), 리스트업 (진행중)
- 세부 기능 조율 (마무리 작업)
- RESTful한 server인지 점검 및 API 문서화
- 테스트 작성
- 저장되는 로그 방식에 대해 (예를들어 사용자가 입력한 비밀번호가 나오는 부분) 의견 구하기
- http 코드 (200, 404 등) 응답 정리 및 의견 구하기
- 각 기능별 로그 저장 (추가 기능들 및 DB 쿼리 날리는 부분이나 쿼리 결과에 대해)
- 각 기능별 로그마다 분리 및 날짜별 저장
- localStorage를 통한 클라이언트쪽에서의 세션 유지가 아닌 passport 등을 통한 서버쪽에서의 세션 유지
- 공격대, 레이드별 중복 이름에 대한 실 사용자 의견 검토
- 위 의견을 받기 위한 리포트 기능 -> 관리자 권한을 통해 해당 사이트에서 확인을 할지 이메일이나 구글 스프레드시트로 받을지 고민해봐야할듯
- 사진도 같이 받는다면 이미지 서버는 어떻게?