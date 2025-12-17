"use client";

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
            alert('이메일을 입력해주세요.');
            return;
        }
        
        // 4. 경로 변수(Path Variable)를 사용하여 /orders/[email]로 이동
        // 예: /orders/test@test.com
        router.push(`/orders/${encodeURIComponent(email)}`);
    };

  return (
    <main>
      <h1>이메일 입력 페이지</h1>
      <form onSubmit={handleSubmit}>
                {/* 이메일 입력 필드 */}
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    // 입력 시 상태 업데이트
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* 연결 버튼: 폼 제출 역할 */}
                <button type="submit">
                    주문 내역 조회
                </button>
            </form>
    </main>
  );
}