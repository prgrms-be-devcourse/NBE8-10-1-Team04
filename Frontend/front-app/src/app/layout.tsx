"use client"; // 클라이언트 사이드 로직(localStorage 체크)을 위해 추가

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    // 1. 관리자 페이지 경로인지 확인 (/admin으로 시작하는 모든 경로)
    const isAdminPage = pathname.startsWith("/admin");
    // 2. 로그인 페이지 자체는 제외 (안 그러면 로그인을 못함)
    const isLoginPage = pathname === "/admin/login";

    if (isAdminPage && !isLoginPage) {
      const isAdmin = localStorage.getItem("adminLoggedIn");

      if (isAdmin !== "true") {
        setIsAuthorized(false); // 권한 없음 상태로 변경
        alert("관리자 권한이 필요한 페이지입니다.");
        router.replace("/"); // 메인으로 튕겨내기
      } else {
        setIsAuthorized(true);
      }
    } else {
      setIsAuthorized(true); // 일반 페이지는 항상 허용
    }
  }, [pathname, router]);

  return (
    <html lang="ko" className="h-screen overflow-hidden">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="antialiased bg-gray-300 h-screen overflow-hidden flex flex-col">
        <header className="relative pt-10 pb-6 text-center text-4xl font-bold">
          <Link href={`/`}>백(BACK) 다방</Link>
          <AuthButtons />
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-8 flex-1 w-full overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl/30 overflow-hidden h-full flex">
            <div className="overflow-y-auto p-5 flex-1">
              {/* ✅ 권한이 확인된 경우에만 children(페이지 내용)을 보여줌 */}
              {isAuthorized ? (
                children
              ) : (
                <div className="p-10 text-center">권한을 확인 중입니다...</div>
              )}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
