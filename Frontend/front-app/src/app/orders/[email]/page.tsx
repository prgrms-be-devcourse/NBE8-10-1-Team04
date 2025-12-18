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

  const DELIVERY_STATUS_MAP: Record<string, string> = {
    "CONFIRM": "주문 확인",
    "READY": "배송 준비 중",
    "SHIPPING": "배송 중",
    "DELIVERED": "배송 완료",
  };


  const STATUS_STYLE_MAP: Record<string, string> = {
    CONFIRM: "bg-gray-200 text-gray-800",
    READY: "bg-blue-100 text-blue-800",
    SHIPPING: "bg-yellow-100 text-yellow-800",
    DELIVERED: "bg-green-100 text-green-800",
  };

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
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-gray-500">주문 내역을 불러오는 중입니다…</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full mx-auto max-w-5xl px-4 py-6">
      {/* 제목 */}
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {decodeURIComponent(email)} 님의 주문 내역
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          주문을 클릭하면 상세 내역을 확인할 수 있습니다.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-3">
        {/* 주문 목록 */}
      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.orderId}
              href={`/orders/${email}/${order.orderId}`}
              className="block"
            >
              <div
                className="
                  rounded-xl border border-gray-200 bg-white p-5
                  transition hover:border-gray-300 hover:shadow-md
                "
              >
                {/* 상단: 주문번호 + 상태 */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">
                    주문 번호 #{order.orderId}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE_MAP[order.deliveryStatus]
                      }`}
                  >
                    {DELIVERY_STATUS_MAP[order.deliveryStatus]}
                  </span>
                </div>

                {/* 내용 */}
                <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  <p>
                    <span className="text-gray-500">배송지</span>
                    <br />
                    {order.address}
                  </p>
                  <p>
                    <span className="text-gray-500">우편번호</span>
                    <br />
                    {order.zipCode}
                  </p>
                  <p>
                    <span className="text-gray-500">총 수량</span>
                    <br />
                    {order.totalQuantity}개
                  </p>
                  <p>
                    <span className="text-gray-500">총 금액</span>
                    <br />
                    {order.totalPrice.toLocaleString()}원
                  </p>
                </div>

                {/* 하단 */}
                <p className="mt-3 text-xs text-gray-500">
                  배송 예정일: {order.deliveryDate}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="text-sm text-gray-500">
            조회된 주문 내역이 없습니다.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}