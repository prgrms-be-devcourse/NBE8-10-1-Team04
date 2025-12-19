"use client";

import Swal from "sweetalert2";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  // 2. 라우터: 프로그래밍 방식으로 경로 이동
  const router = useRouter();

  // 3. 폼 제출/버튼 클릭 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침) 방지

    if (!email.trim()) {
      Swal.fire({
        text: "이메일을 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
        confirmButtonText: "확인",
      });
      return;
    }

    // 4. 경로 변수(Path Variable)를 사용하여 /orders/[email]로 이동
    // 예: /orders/test@test.com
    router.push(`/orders/${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        {/* 제목 */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          주문 조회
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          주문 시 입력한 이메일로 주문 내역을 확인할 수 있습니다.
        </p>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                outline-none transition
                focus:border-gray-900 focus:ring-1 focus:ring-gray-900
              "
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full rounded-md bg-gray-900 py-3 text-sm font-semibold text-white
              transition hover:bg-gray-800
            "
          >
            주문 내역 조회
          </button>
        </form>

        {/* 안내 문구 */}
        <p className="mt-4 text-center text-xs text-gray-500">
          이메일 주소는 주문 확인 용도로만 사용됩니다.
        </p>
      </div>
    </div>
  );
}