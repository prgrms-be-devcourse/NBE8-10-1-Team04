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
    <td align="center"> <a href="https://github.com/BaekRaven"> <img src="https://avatars.githubusercontent.com/u/58510698?v=4" width="80"><br> <strong>유재원</strong> </a> </td>
    <td align="center">팀원</td>
    <td> <strong>Backend</strong>: 상품 조회·수정·삭제 기능 구현<br> <strong>Frontend</strong>: 주문 조회 기능 프론트엔드 연동 </td>
  </tr>
  <tr>
    <td align="center"> <a href="https://github.com/kimhss"> <img src="https://avatars.githubusercontent.com/u/127471807?v=4" width="80"><br> <strong>김현수</strong> </a> </td>
    <td align="center">팀원</td>
    <td> <strong>Backend</strong>: 주문 생성·삭제, 단건/다건 조회, 배송 상태 변경 기능 구현<br> <strong>Frontend</strong>: 관리자 주문 관리 페이지 연동 및 구현 </td>
  </tr>
  <tr>
    <td align="center"> <a href="https://github.com/inhj1223"> <img src="https://avatars.githubusercontent.com/u/29454099?v=4" width="80"><br> <strong>장인호</strong> </a> </td>
    <td align="center">팀원</td>
    <td> <strong>Backend</strong>: 주문 전체 조회, 이메일 기반 다건 조회, 주문 수정 기능 구현<br> <strong>Security</strong>: Spring Security 적용<br> <strong>Frontend</strong>: 관리자 상품 목록·추가·수정·삭제 기능 구현, 상품 이미지 처리, 관리자 페이지 접근 제어 </td>
  </tr>
</table>

## 🖼️ UI 및 기능

### 🌟 사용자

- 사용자는 메인 페이지에서 판매 중인 상품 목록을 조회할 수 있습니다.
- 사용자는 메인 페이지에서 이메일을 통해 상품을 주문할 수 있습니다.
- 사용자는 내 주문 조회에서 이메일을 입력 후 주문 내역을 확인하고 수정하거나 취소할 수 있습니다.

### 🌟 관리자

- 관리자는 인증을 거쳐 관리자 페이지에 접근할 수 있습니다
- 관리자는 상품관리 페이지에서 판매 중인 상품 목록을 수정, 삭제, 추가할 수 있습니다.
- 관리자는 주문관리 페이지에서 전체 주문 목록을 확인하고 배송 상태를 변경할 수 있습니다.

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

## ⚙️ 시스템 아키텍처