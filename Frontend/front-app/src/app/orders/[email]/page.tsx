// app/orders/[email]/page.tsx
"use client"; // 상태 관리를 위해 클라이언트 컴포넌트 선언

import { use, useEffect, useState } from "react";
import { EmailOrderDto } from "@/type/emailOrder";
import { apiFetch } from "@/lib/backend/client";
import Link from "next/link"; // Next.js의 Link 컴포넌트를 가져옵니다.


export default function Page({ params }: { params: Promise<{ email: string }> }) {
  const [orders, setOrders] = useState<EmailOrderDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = use(params);


  useEffect(() => {
    apiFetch(`/api/v1/orders/${email}`)
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error("주문 내역 조회 중 오류 발생:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <main><h2>로딩 중...</h2></main>;
  }
  return (
    <main style={{ padding: '20px' }}>
      <h1>{decodeURIComponent(email)} 님의 주문 내역</h1>
      {orders && orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <Link
              key={order.orderId}
              // href를 현재 경로(/orders/[email])와 orderId를 조합하여 설정합니다.
              // 예: /orders/1@1.com/1001
              href={`/orders/${email}/${order.orderId}`}
              passHref // Link 컴포넌트가 자식 요소에 href를 전달하도록 합니다.
              style={{ textDecoration: 'none', color: 'inherit' }} // 링크 스타일 제거
            >
              <div key={order.orderId} style={{ border: '1px solid #eee', margin: '10px 0', padding: '10px' }}>
                <p>주문 번호: {order.orderId}</p>
                <p>배송지: {order.address}</p>
                <p>우편 번호: {order.zipCode}</p>
                <p>총 수량: {order.totalQuantity}</p>
                <p>총 가격: {order.totalPrice}</p>
                <p>배송 날짜: {order.deliveryDate}</p>
                <p>배송 상태: {order.deliveryStatus}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>조회된 주문 내역이 없습니다.</p>
      )}
    </main>
  );
}