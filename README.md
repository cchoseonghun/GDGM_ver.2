GDGM - ver.2
====


|||
|-|-|
|진행기간|07/18 ~ 08/04|
|리뉴얼기간|222222|
|서비스목표|게임에서 그룹의 일정이 잘 지켜지지 않는 모습을 보며 이런 기능이 있으면 좋겠다 생각한 기능을 포함한 앱을 만들고 싶었다.|
|필수기능|회원기능, 큰 그룹(공격대), 작은 그룹(레이드), 작은 그룹에서의 일정 관리|
|리뉴얼 이유|Node.js와 React를 배우자마자 썼다보니 폴더구조 등 객체지향적으로 쓰지 못한거 같아 다시 만들게 되었다.|


# 진행상황
* 11/14 - 팀 자기소개 및 S.A 의견 종합, 개인 소개 페이지 작업 시작
  * S.A (Starting Assignments) - [링크](https://4sii.tistory.com/74)   



  
# 사용된 외부 모듈
||모듈이름|
|-|-|
|Node.js|express, cors, dotenv, path, winston, mysql, bcrypt, mongodb, mongoose|
|React|react-router-dom, axios, @reduxjs/toolkit, react-redux, redux-persist|
  

# 문제 해결 & 추가 개선사항
#### MySQL에서의 JSON 데이터 관리가 어렵다는걸 느낌
> 리뉴얼 전 MongoDB를 이용하다 MySQL을 조만간 다시 쓸 일이 생길거 같아 미리 익힐 생각으로 MySQL로의 포팅을 진행했었다.   
> 그러나 기존에 MongoDB를 통한 JSON 데이터를 너무 편하게 다루다가 MySQL에서 다루려니 기능은 구현되어 있지만   
> 적합하지 않다고 결론을 내리고 다시 MongoDB로 넘어오면서 이왕 썼던 코드를 수정할거 Mongoose도 같이 도입하게 되었다.

# API



### 앞으로 추가되야할 기능 (11.17)
- 레이드(Raids) 리스트업 세부 항목 - 시간(완), 인원(진행중), 상태(진행중) -> 기존 4자기 상태에서 2가지 상태로 변경
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
