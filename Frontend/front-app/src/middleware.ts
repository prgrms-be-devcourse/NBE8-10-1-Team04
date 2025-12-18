// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ 'default' 함수로 내보내기 (Next.js 권장 방식)
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 관리자 페이지 경로인지 확인
  if (pathname.startsWith("/admin")) {
    // 로그인 페이지는 통과
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // 2. 세션 쿠키 확인
    const session = request.cookies.get("JSESSIONID");

    // 3. 세션이 없으면 로그인 페이지로 리다이렉트
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ["/admin/:path*"],
};
