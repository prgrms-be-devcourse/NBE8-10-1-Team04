"use client";

import { use, useEffect, useState } from "react";
import { apiFetch } from "@/lib/backend/client";
import { OrderResponseDto } from "@/type/orderResponse";
import { OrderProductDto } from "@/type/orderProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatWon } from "@/lib/frontend/tools";

export default function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const [order, setOrder] = useState<OrderResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = use(params);
  const router = useRouter();

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

  const deletePost = (id: string) => {
    if (!order) { return}
    apiFetch(`/api/v1/order/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg || "주문이 취소되었습니다.");
      router.replace(`/orders/${order.email}`);
    });
  };

  useEffect(() => {
    apiFetch(`/api/v1/order/${orderId}`)
      .then((data) => setOrder(data))
      .catch((error) => console.error("오류 발생:", error))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <main className="max-w-2xl mx-auto mt-10 p-6 text-center bg-red-50 rounded-lg border border-red-200">
        <h1 className="text-xl font-bold text-red-600">주문을 찾을 수 없습니다.</h1>
      </main>
    );
  }


  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* 헤더 섹션 */}
        <div className="bg-gray-50 border-b p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{orderId}번 주문 상세</h1>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${STATUS_STYLE_MAP[order.deliveryStatus]}`}>
            {DELIVERY_STATUS_MAP[order.deliveryStatus]}
          </span>
        </div>

        <div className="p-6 space-y-8">
          {/* 요약 정보 섹션 */}
          <section className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600 font-medium">총 결제 금액</p>
              <p className="text-2xl font-extrabold text-blue-700">{formatWon(order.totalPrice)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-600 font-medium">배송 예정일</p>
              <p className="text-xl font-bold text-gray-800">{order.deliveryDate || "미정"}</p>
            </div>
          </section>

          {/* 상품 목록 섹션 */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
              주문 상품
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <ul className="divide-y divide-gray-200">
                {order.products.map((product: OrderProductDto) => (
                  <li key={product.productId} className="py-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{product.productName}</span>
                      <span className="text-sm text-gray-500">수량: {product.quantity}개</span>
                    </div>
                    <span className="font-semibold text-gray-700">{formatWon(product.price * product.quantity)}원</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 배송 정보 섹션 (상세보기용 추가) */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
              배송지 정보
            </h2>
            <div className="p-4 border border-gray-200 rounded-xl space-y-2">
              <p className="text-gray-800"><span className="font-medium text-gray-500 mr-2">주소:</span> {order.address || "정보 없음"}</p>
              <p className="text-gray-800"><span className="font-medium text-gray-500 mr-2">우편번호:</span> {order.zipCode || "정보 없음"}</p>
            </div>
          </section>

          {/* 하단 버튼 액션: 배송 완료(DELIVERED)가 아닐 때만 표시 */}
            {order.deliveryStatus !== "DELIVERED" && (
            <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button
                onClick={() => confirm(`${orderId}번 주문을 취소하시겠습니까?`) && deletePost(orderId)}
                className="flex-1 px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
                >
                주문 취소하기
                </button>
                <Link
                href={`${orderId}/edit`}
                className="flex-[2] px-4 py-3 bg-gray-800 text-white text-center rounded-lg hover:bg-gray-900 font-bold shadow-lg transition-all active:scale-[0.98]"
                >
                주문 정보 수정
                </Link>
            </div>
            )}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button onClick={() => router.push(`/orders/${order.email}`)} className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4">
          전체 주문 목록으로 돌아가기
        </button>
      </div>
    </main>
  );
}