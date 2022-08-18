<div>
<img src="./readme_assets/eco2_logo.png" width="300px" alt="ECO2" />
</div>

# 🌏 Eco2

> 환경보호를 실천함에 있어 동기와 성취감을 주는 웹서비스

## ✨서비스 소개

**Eco2**는 쉽게 지킬 수 있는 환경 미션 목록을 제공하고, 매일 실천을 독려하는 **데일리 미션 기능**과 **보상**을 통해 사용자가 꾸준히 환경 보호를 실천할 수 있도록 돕습니다. 또한, **퀘스트**를 통해 다른 사람과 함께 미션을 진행할 수 있습니다.

## 🕙프로젝트 진행 기간

2022.07.04 ~ 2022.08.19

## 🎥소개 영상

[추후 추가 예정]()

## ⌨️기술 스택

### FE

- React 18.2.0
- node.js 16.13.2
- redux-toolkit 1.8.3
- HTML, CSS, JavaScript

### BE

- Java 11
- Springboot 2.7.1
- Spring Security
- JJWT 0.11.5
- Spring Data JPA
- MySQL
- Firebase 9.0.0
- Springboot Redis
- Stomp WebSocket 2.3.3-1
- Swagger

## ⚙주요 기능

</div>

| 기능     | 내용                                                                                                                                                                                                                                                                                                             |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 데일리미션  | **매일 인증할 미션을 선택하고, 인증 시 보상을 받을 수 있습니다.**<br/><br/>오늘 하루 지킬 미션을 지정하고, 미션을 인증하면 나무를 꾸밀 수 있는 아이템을 받습니다. 모든 미션에 인증글을 작성하면 카카오톡 공유가 가능한 사진을 지급합니다. 미션은 카테고리 별로 분류되어 있고, 기본적으로 제공되는 미션 목록 외에 유저가 원하는 미션을 직접 작성할 수도 있습니다. 사용자의 선택을 돕고, 다양한 미션을 참여하도록 독려하기 위해 날씨에 따라 매일 미션 3개를 추천하고, 현재 가장 많은 사람이 참여한 미션 상위 5개를 제공합니다. |
| 퀘스트    | **위치를 기반으로 다른 사람과 함께 미션을 진행할 수 있습니다.**<br/><br/>현재 위치 500m 주변에 핀을 꽂아 퀘스트를 생성할 수 있으며, 다른 사람이 생성한 퀘스트에 참여할 수도 있습니다. 미션을 인증하면 나무를 꾸밀 수 있는 아이템을 받습니다. 생성한 퀘스트의 참여인원이 설정한 목표인원에 도달하면 추가적인 아이템을 지급합니다. 하루 3개의 퀘스트를 생성할 수 있고, 퀘스트끼리의 간격이 20m를 초과해야 퀘스트를 생성할 수 있습니다.                                                   |
| 나무 꾸미기 | **데일리미션과 퀘스트를 통해 받은 보상으로 자신만의 나무를 꾸밀 수 있습니다.**                                                                                                                                                                                                                                                                 |
| 인증글 피드 | **카테고리 별로 다른 사람들이 작성한 인증글을 확인하고 소통할 수 있습니다.**                                                                                                                                                                                                                                                                  |

## 🔧공통 기능

| 기능       | 내용                                                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 피드 조회    | **사용자들이 올린 인증글을 조회하고 다른 사용자들과 소통할 수 있습니다.**<br/><br/>미션의 카테고리별로 피드를 조회하고, 게시물에 댓글, 좋아요를 달 수 있습니다. 자신이 쓴 게시글은 수정 및 삭제가 가능합니다.                    |
| 회원가입/로그인 | **일반 메일을 활용한 로그인과 소셜로그인이 가능합니다.**<br/><br/>일반 메일로 로그인할 경우, 인증메일을 통해 사용자 인증을 받습니다.                                                               |
| 친구       | **다른 사용자와 친구관계를 맺을 수 있습니다.**                                                                                                                    |
| 채팅       | **다른 사용자와 채팅을 할 수 있습니다.**                                                                                                                       |
| 신고       | **부적절한 게시물, 댓글을 신고할 수 있습니다.**<br/><br/>제대로 된 인증글이 아니거나, 광고글, 불쾌한 내용을 담은 글 또는 댓글의 경우 신고가 가능하고, 관리자 계정으로 로그인하여 신고된 글과 댓글을 조회하고 스크리닝 후 삭제할 수 있습니다. |
| 공지사항     | **관리자 계정으로 공지사항을 작성할 수 있습니다.****<br/><br/>중요한 공지는 상단으로 고정시키는 기능을 사용할 수 있습니다.                                                                    |
| 알림       | **다양한 알림을 받을 수 있습니다.**<br/><br/>친구 신청 및 수락, 인증글에 달린 댓글, 신고당한 글/댓글의 삭제, 채팅 등의 알림을 받을 수 있습니다.                                                     |

## 🎞️기능 영상

[추후 추가 예정]()

### 메인

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/9d18393257e3b05da6046cae16e438cb/나무.gif)

- 미션과 퀘스트를 통해 얻은 보상 확인 및 활용하여 자신만의 나무 꾸미기
- 지금까지 참여했던 미션 카테고리 통계 확인 가능

### 데일리미션

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/18c6cdb02f16f46e36f9ce8de89c9f54/데일리_미션_추천.gif)

- 날씨에 따라 매일 미션 3개 추천

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/cbf21ad64073d6bb244d0d362e897dec/기본_미션.gif)

- 트렌딩을 통해 가장 많이 참여한 미션 상위 5개 확인 가능
- 카테고리 별로 나눠진 추천리스트에서 원하는 미션을 선택

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/d3f8b6bee09f97d7ff8ba7e6801a4254/데일리_미션_즐겨찾기.gif)

- 자주 하는 미션을 즐겨찾기로 등록 가능

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/53ee198e9bc68ee52a32942618d34d69/커스텀_미션_등록.gif)

- 커스텀 미션 기능을 통해 목록에 없는 미션을 직접 생성하여 실천 가능

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/035cb627df9e457dc6c2b9f7e9f9c0f8/데일리_미션_완료_게시물_등록.gif)

- 미션 수행 후, 인증 게시물을 올리면 보상 아이템 지급

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/d390c832f50c588b7007cf05bc4ef64b/데일리_미션_보상.gif)

- 모든 데일리 미션 수행 후, 보상받기 버튼을 누르면 보상 이미지 지급
- 보상 이미지 다운로드, 카카오톡 공유 가능

### 퀘스트

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/e0d91b0f97cacd04e283c27d638219fd/퀘스트_등록.gif)

- 지도에서 위치를 정해 퀘스트를 생성하고, 다른 사람과 함께 미션 진행 가능

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/402d5fba16453acf28eb3c548612e2d6/퀘스트_생성_제한.gif)

- 하루에 퀘스트를 3개 생성했을 시, 추가적으로 퀘스트 생성 불가능
- 50m 이내에 퀘스트가 존재하면 퀘스트 생성 불가능

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/14d93ba54d0e22424ee335a4c83ab403/퀘스트_완료_게시물_등록.gif)

- 미션 수행 후, 인증 게시물을 올리면 보상 아이템 지급

![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/ada79ee898da8a877e62c0ca10809d90/퀘스트_인원_달성_보상.gif)

- 퀘스트 참여 인원수가 목표 인원수에 도달하면 추가 보상 아이템 지급

### 공통 기능

- 회원가입
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/e556a5e755bcf402e9bbcdd947d69e40/회원가입.gif)

- 로그인
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/e3762e029438a4890c3347fa7be73121/로그인.gif)

- 프로필
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/uploads/cfbc2fad4f3949811be8d609b412aa46/닉네임_변경.gif)
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/c61141d3fd235ef808da9729924adae2/비밀번호_변경.gif)

- 친구
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/1536c91bc2d6842c88f85af37faffa5c/친구신청.gif)
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/385bf94a223ef116dd5c98980d18dbdf/친구삭제.gif)

- 채팅
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/812f67dd329b505931935b107ed3e3bc/채팅.gif)

- 신고
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/aac04dd73db33c53ece667ca4bebee12/관리자_신고_수락.gif)
  
  - 신고받은 게시물/댓글을 관리자가 확인 후 처리

- 공지사항
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/50e8b6299ec91eced8b4b841ba0642bd/공지사항_유저.gif)
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/0fc64b54419f104fb32cf839ad8fd546/공지사항_관리자.gif)
  
  - 관리자는 공지사항 작성 가능
  
  - 긴급 공지사항은 상단 고정

- 알림
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/fff1f9454cbd4cbc69ef240ae9d89665/알림_팝업.gif)

- 계정설정
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/uploads/079da07abec92f284bfd82330eb47769/계정설정_변경.gif)
  ![](https://lab.ssafy.com/s07-webmobile2-sub2/S07P12B103/S07P12B103/uploads/44920505ff4f19ac8170538e239646b7/프로필_변경.gif)

## 📄산출물

- [기능 명세서](./readme_assets/Eco2_기능명세서.pdf)
- [Mockup]([Figma](https://www.figma.com/file/QxA4rpR793RfNxOK5D9mhw/Eco-%2B-Co2)
- [API](./readme-assets/Eco2_API docs.xlsx)
- [ERD](./readme-assets/Eco2_ERD)
- [포팅 메뉴얼](./exec/공통PJT_대전_1반_B103_포팅매뉴얼.pdf)
- [중간 발표자료](./readme_assets/Eco2_중간발표.pptx)

## 👥팀 멤버

<div>
<table>
<tr>
    <td text-align="center" colspan="3">Front-end</td>
    <td text-align="center" colspan="3">Back-end</td>
</tr>
<tr>
    <td align="center" width="150px">
      <a href="https://github.com/WoowonKim" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/83275938?v=4" alt="김우원 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/shinyoungjei" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/74912232?v=4" alt="신영제 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/YujinJo19" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/97591584?v=4" alt="조유진 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/eunkyung-kim-99" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/64150747?v=4" alt="김은경 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/rlamsp" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/97591457?v=4" alt="김은혜 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/smj53" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/105499985?v=4" alt="정세미 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
        김우원
    </td>
    <td align="center">
        신영제
    </td>
    <td align="center">
        조유진
    </td>
    <td align="center">
        김은경
    </td>
    <td align="center">
        김은혜
    </td>
    <td align="center">
        정세미
    </td>
  </tr>
</table>
</div>

| 이름  | 개발 내용                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김우원 | FE<br/>- react-dnd를 이용하여 이미지파일 드래그엔드롭 구현<br/>    - 모바일 환경에서는 작동 안하는 문제가 발생하여 Backends를 react-dnd에서 제공하는 TouchBackend로 변경<br/>    - TouchBackend로 변경 시 Preview가 보이지 않는 현상 발생… react-dnd의 isDragging 함수를 사용하여 드래그시 보여질 컴포넌트를 만들어서 해결<br/>- kakao-map api를 활용한 위치기반 퀘스트 생성 및 참여 기능 구현<br/>    - kakao Developers의 maps api sample과 docs에서 제공하는 web Api자료를 분석하여 React 원하는 기능을 개발 할 수 있도록 코드 작성<br/>    - 퀘스트 생성시 퀘스트 정보가 담긴 마커를 반경 500미터 내에 찍을 수 있도록 클릭 이벤트 생성<br/>- 모달<br/>    - 생성, 조회등에 사용될 모달 기능 직접 구현<br/>    - styled-components를 활용하여 자주 쓰이는 컴포넌트 제작<br/>- redux/toolkit과 axios를 이용한 백엔드 서버와의 비동기 연동 및 상태관리<br/>- .env.development와 .env.production파일을 나누어 배포와 로컬 테스트시 사용할 api key, base_url 관리<br/><br/>DevOps<br/>- Linux EC2 인프라 환경 세팅(Open jdk 11, mySQL, redis…)<br/>- 프론트엔드 백엔드 EC2 배포<br/>- Nginx 웹서버 적용<br/>- Certbot을 이용한 서비스 SSL 보안 적용 |
| 김은경 | - DB 설계<br/>- Spring Data JPA 세팅 및 Entity 설계<br/>- SpringSecurity를 이용한 권한 인증 구현<br/>- JWT를 이용한 토큰 생성 구현<br/>- 회원가입 API 및 이메일 인증 구현<br/>- 미션리스트 관리 API 구현<br/>- 데일리미션 관리 API 구현<br/>- 관리자 신고 기능 API 구현<br/>- 관리자 신고 서버 연동 및 CSS<br/>- Socket.io, STOMP를 이용한 실시간 채팅 서버 구현<br/>- 채팅 서버 연동 및 CSS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 김은혜 | - 인증 게시물 등록 및 관리<br/>- 사진 업로드, 수정, 조회 구현<br/>- 댓글 및 좋아요 기능 구현<br/>- 인증 게시물 등록시 통계치 연계<br/>- 유저 페이지 및 특정 게시물 CSS 구현                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 신영제 | - 미션리스트  서버 연동<br/>- 즐겨 찾기 추가 및 불러오기 서버 연동<br/>- 추천 리스트 불러오기 서버 연동<br/>- 미션 카테고리별 분류<br/>- 미션 완료 등록하기 서버 연동<br/>- 선택한 미션 별 동적 카운트 구현<br/>- 함수 별 모달창 연동                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 정세미 | - DB 설계<br/>- 소셜 로그인<br/>    - OAuth2를 활용한 카카오 로그인 구현<br/>    - Firebase Authentication을 이용한 구글 로그인 구현<br/>- 계정정보, 회원정보 API<br/>- 친구 API<br/>- 퀘스트 API<br/>- 이미지 조회 API<br/>- 미션 추천 API<br/>    - 공공데이터 API 활용<br/>- Firestore 활용한 알림 기능 구현                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 조유진 | - 회원가입, 로그인 서비스 개발<br/>    - 이메일, 비밀번호, 에코네임 유효성 검사<br/>- 유저 프로필 페이지 개발<br/>    - 회원 정보 수정 및 개인 피드<br/>    - date-fns를 활용하여 달력 개발<br/>        - 달력 내에 보상 이미지 저장 기능, 카카오톡 공유 기능 구현<br/>    - 공지사항 페이지 구현<br/>- 메인 피드 및 게시물<br/>    - 카테고리 별 피드 분류<br/>    - 게시물 작성, 수정, 삭제, 신고 구현<br/>- 수정, 삭제, 신고, 확인 모달 구현                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
