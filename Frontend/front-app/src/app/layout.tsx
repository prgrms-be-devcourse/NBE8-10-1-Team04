import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import AuthButtons from "@/components/AuthButtons";
import AuthGuard from "@/components/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "백(BACK) 다방",
  description: "백(BACK) 다방 관리자 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-screen overflow-hidden">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-300 h-screen overflow-hidden flex flex-col`}
      >
        {/* 헤더 영역 */}
        <header className="relative pt-10 pb-6 text-center">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-4xl font-bold tracking-tight">백(BACK) 다방</h1>
          </Link>

          {/* 네비게이션 바 */}
          <NavBar />

          <div className="absolute top-10 right-10 flex items-center justify-end min-w-[120px]">
            <AuthButtons />
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main className="mx-auto max-w-6xl px-6 pb-8 flex-1 w-full overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex">
            <div className="overflow-y-auto p-5 flex-1">
              <AuthGuard>{children}</AuthGuard>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
