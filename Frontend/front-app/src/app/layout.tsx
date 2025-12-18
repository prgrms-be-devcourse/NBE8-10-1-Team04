import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavBar from "@/components/NavBar";

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
  description: "백(BACK) 다방",
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
      <body className="antialiased bg-gray-300 h-screen overflow-hidden flex flex-col">
        <header className="pt-10 pb-6 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-tight">
              백(BACK) 다방
            </h1>
          </Link>
          <NavBar />
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-8 flex-1 w-full overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl/30 overflow-hidden h-full flex">
            <div className="overflow-y-auto p-5 flex-1">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
