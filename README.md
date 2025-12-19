# ☕백(Back) 다방
작은 로컬 카페 '백(Back) 다방' 의 온라인 주문, 배송 관리 온라인 웹 사이트

---

## ✍️ 프로젝트 개요

‘백(Back) 다방’은 스프링 부트 기반의 원두 패키지 주문 웹사이트입니다. 고객들은 온라인 웹 사이트를 통해 커피 원두 패키지를 주문할 수 있으며, 매일 전날 오후 2시부터 당일 오후 2시까지의 주소가 동일한 주문을 모아서 당일 배송합니다. 주문·배송 처리, 관리자 상품 추가 및 조회, 이메일을 통한 주문 내역 확인 등의 CRUD를 구현했습니다.

---

## 💁‍♂️ 팀원 소개 및 역할


<table>
  <tr>
    <th style="text-align:center;">팀원</th>
    <th style="text-align:center;" width="80">역할</th>
    <th style="text-align:center;">담당 업무</th>
  </tr>
  <tr>
    <td align="center"> <a href="https://github.com/MintyU"> <img src="https://avatars.githubusercontent.com/u/54997194?v=4" width="80"><br> <strong>김연수</strong> </a> </td>
    <td align="center">팀장</td>
    <td> <strong>Backend</strong>: 상품 추가 기능 구현<br> <strong>Frontend</strong>: 상품 주문 페이지 구현, UI 전반 통합 </td>
  </tr>
  <tr>
  <td align="center"> <a href="https://github.com/kimhss"> <img src="https://avatars.githubusercontent.com/u/127471807?v=4" width="80"><br> <strong>김현수</strong> </a> </td>
    <td align="center">팀원</td>
    <td> <strong>Backend</strong>: 주문 생성·삭제, 단건/다건 조회, 배송 상태 변경 기능 구현<br> <strong>Frontend</strong>: 관리자 주문 관리 페이지 연동 및 구현 </td>
    
  </tr>
  <tr>
    <td align="center"> <a href="https://github.com/BaekRaven"> <img src="https://avatars.githubusercontent.com/u/58510698?v=4" width="80"><br> <strong>유재원</strong> </a> </td>
    <td align="center">팀원</td>
    <td> <strong>Backend</strong>: 상품 조회·수정·삭제 기능 구현<br> <strong>Frontend</strong>: 주문 조회 기능 프론트엔드 연동 </td>
  </tr>
  <tr>
    <td align="center"> <a href="https://github.com/inhj1223"> <img src="https://avatars.githubusercontent.com/u/29454099?v=4" width="80"><br> <strong>장인호</strong> </a> </td>
    <td align="center">팀원</td>
    <td> <strong>Backend</strong>: 주문 전체 조회, 이메일 기반 다건 조회, 주문 수정 기능 구현<br> <strong>Security</strong>: Spring Security 적용<br> <strong>Frontend</strong>: 관리자 상품 목록·추가·수정·삭제 기능 구현, 상품 이미지 처리, 관리자 페이지 접근 제어 </td>
  </tr>
</table>

## 🖼️ 주요 기능 및 시연

### 🌟 사용자

- 사용자는 메인 페이지에서 판매 중인 상품 목록을 조회할 수 있습니다.
- 사용자는 메인 페이지에서 이메일을 통해 상품을 주문할 수 있습니다.
- 사용자는 내 주문 조회에서 이메일을 입력 후 주문 내역을 확인하고 수정하거나 취소할 수 있습니다.

### 🌟 관리자

- 관리자는 인증을 거쳐 관리자 페이지에 접근할 수 있습니다
- 관리자는 상품관리 페이지에서 판매 중인 상품 목록을 수정, 삭제, 추가할 수 있습니다.
- 관리자는 주문관리 페이지에서 전체 주문 목록을 확인하고 배송 상태를 변경할 수 있습니다.

---

### 🛒 1. 상품 주문 (메인 페이지)

- 메인 페이지에서 상품을 선택하여 주문 생성
- 상품 미선택 시 결제 버튼 비활성화
- 이메일·우편번호 미입력 시 알림을 통해 입력 유도

![Image](https://github.com/user-attachments/assets/b7d057f9-fb26-4a70-953c-f5b788a92662)

---

### 📧 2. 내 주문 조회 및 수정

- 주문 시 입력한 이메일 주소로 주문 내역 조회
- 주문 상태가 `주문 확인`, `배송 준비 중` 일 경우 주문 수정 가능
- 주문 상세 페이지에서 상품 수량 및 배송지 정보 수정

![Image](https://github.com/user-attachments/assets/2ca7ec53-b2d2-4079-b9da-f1f311cae79b)

---

### 🔐 3. 관리자 페이지 접근 제어

- 상품관리 / 주문관리 탭은 로그인 없이 접근 불가
- 관리자 로그인 후 정상 접근 가능
- Spring Security 기반 인증 및 세션 유지

![Image](https://github.com/user-attachments/assets/4b82bba6-025c-493c-b389-9010f02ff594)

---

### 📦 4. 상품 관리 (관리자)

- 새로운 상품 등록
- 기존 상품 가격 수정
- 상품 삭제
- 필수 입력값 누락 시 경고 메시지 출력

![Image](https://github.com/user-attachments/assets/a5b875a0-ac75-4c29-9a83-fc0ceea0930c)

---

### 🚚 5. 주문 관리 & 배송 상태 변경 (관리자)

- 주문 상태: `주문 확인 → 배송 준비 중 → 배송 중 → 배송 완료`
- 관리자가 배송 상태 변경 가능
- 배송 상태가 `배송 중` 또는 `배송 완료`일 경우 사용자는 주문 수정/취소 불가

![Image](https://github.com/user-attachments/assets/bc398ace-b295-4805-b6d0-acaf1fdc4db8)


## 🔧 Teck Stack

### Backend

![Java](https://img.shields.io/badge/Java-JDK%2021-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Security-Spring%20Security-green?style=for-the-badge&logo=springsecurity&logoColor=white)
![Gradle](https://img.shields.io/badge/Build-Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)


### Database

![MySQL](https://img.shields.io/badge/MySQL-Production-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![H2](https://img.shields.io/badge/H2-Local%2FTest-blue?style=for-the-badge)


### Frontend

![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-Framework-black?style=for-the-badge&logo=nextdotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)


## 🖇️ ERD
![ERD](https://private-user-images.githubusercontent.com/54997194/528407252-9e088fa7-562d-4a61-b3fd-6a05f45f277f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjYxMjUwMDgsIm5iZiI6MTc2NjEyNDcwOCwicGF0aCI6Ii81NDk5NzE5NC81Mjg0MDcyNTItOWUwODhmYTctNTYyZC00YTYxLWIzZmQtNmEwNWY0NWYyNzdmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMjE5VDA2MTE0OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ2ZGFiZTU4ZjA0YTg2NDg3MWIyMzYwYjVlNTQxYzYwYWJjM2UyMTA5YmJjOWYxNTFmNDgxOGE1ZWIzNTY4NTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.IozS4Y9gUHb-130wyiwgCnIvg6snY1WBwCRdfHrSw2U)

## ⚙️ 시스템 아키텍처
![시스템 아키텍처](https://private-user-images.githubusercontent.com/54997194/528411629-3b4e100e-1995-401a-abd9-2f56943f6c19.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjYxMjUwMDgsIm5iZiI6MTc2NjEyNDcwOCwicGF0aCI6Ii81NDk5NzE5NC81Mjg0MTE2MjktM2I0ZTEwMGUtMTk5NS00MDFhLWFiZDktMmY1Njk0M2Y2YzE5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMjE5VDA2MTE0OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThjMDc1Nzc3MGE2NTZkNTc5YTYwY2ZkZDc4NDg4MmRlOGUwMDZjYWYyMWM0ZWMyYTFiNThkZTFlNTdlMWVlNDkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.N7Lm_OdOVgQom1scnElFDOZEfS30DjuNVTLSwP42MVQ)


## 📃 커밋 컨벤션 & 협업 규칙

### GitHub Flow

- **main**
    - 실제 서비스에 배포되는 안정화 브랜치
    - 브랜치 보호 규칙 적용 (PR + 리뷰 후 머지)
- **develop**
    - 새로운 기능 개발이 통합되는 기준 브랜치
    - 브랜치 보호 규칙 적용 (PR + 리뷰 후 머지)
- **feat/**
    - 개별 기능 개발용 브랜치
    - 이슈 단위로 생성하여 작업
    - 작업 완료 후 PR을 통해 develop에 머지


### 팀 운영 규칙

🔹 PR 하나 = 이슈 하나

🔹 PR 너무 크면 쪼개기

🔹 머지 후 브랜치 삭제


### **⚙️ 네이밍 & 작성 규칙**

1. **이슈**
    - 제목 규칙 : `[타입] 작업내용`
    - 예시 : `[feat] 로그인 기능 추가`
    - 본문은 템플릿에 맞춰서 작성
2. **PR**
    - 제목 규칙 : `[타입] 작업내용`
    - 예시 : `[feat] 로그인 기능 추가`
    - 본문은 템플릿에 맞춰서 작성
3. **브랜치**
    - 생성 기준 : `develop` 브랜치에서 생성
    - 명명 규칙 : `타입/이슈내용`
    - 예시: `feat/로그인 기능 추가`
    - `main` 브랜치는 브랜치 보호 규칙이 적용되어, 반드시 PR을 통해 최소 2명의 팀원 리뷰 승인 후에만 머지할 수 있다.
    - `develop` 브랜치는 브랜치 보호 규칙이 적용되어, 반드시 PR을 통해 최소 1명의 팀원 리뷰 승인 후에만 머지할 수 있다.
4. **Commit Message 규칙**
    
    
    | **타입**     | **의미**                                                   |
    | ------------ | ---------------------------------------------------------- |
    | **feat**     | 새로운 기능 추가                                           |
    | **fix**      | 버그 수정                                                  |
    | **docs**     | 문서 수정 (README, 주석 등)                                |
    | **style**    | 코드 스타일 변경 (포맷팅, 세미콜론 등. 기능 변화 없음)     |
    | **refactor** | 코드 리팩토링 (동작 변화 없음)                             |
    | **test**     | 테스트 코드 추가/수정                                      |
    | **chore**    | 빌드, 패키지 매니저, 설정 파일 등 유지보수 작업(환경 설정) |
    | **remove**   | 파일, 폴더 삭제                                            |
    | **rename**   | 파일, 폴더명 수정                                          |
    - `[타입] 작업내용 #이슈번호`
    - 예시 : `[feat] 로그인 기능 추가 #1` 