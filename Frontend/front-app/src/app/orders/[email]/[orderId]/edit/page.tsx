"use client";

import { apiFetch } from "@/lib/backend/client";
import { use, useEffect, useState } from "react";
import { OrderResponseDto } from "@/type/orderResponse";
import { OrderProductDto } from "@/type/orderProduct";
import { useRouter } from "next/navigation";
import { formatWon } from "@/lib/frontend/tools";

export default function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const router = useRouter();
  const { orderId } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderResponseDto | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/order/${orderId}`)
      .then((data) => setOrder(data))
      .catch((error) => console.error(`오류 발생:`, error))
      .finally(() => setIsLoading(false));
  }, [orderId]);
  // --- 수량 조절 및 상품 삭제 로직 ---
  const updateQuantity = (productId: number, delta: number) => {
    if (!order) return;

    // 1. 수량 업데이트 및 0이 된 상품 필터링
    const updatedProducts = order.products
      .map((p) => {
        if (p.productId === productId) {
          return { ...p, quantity: p.quantity + delta };
        }
        return p;
      })
      .filter((p) => p.quantity > 0);

    // 2. 모든 상품이 삭제시 주문 삭제
    if (updatedProducts.length === 0) {
      if (confirm("모든 상품을 삭제하시겠습니까? 주문이 취소됩니다.")) {
        // 주문 취소 API 호출
        apiFetch(`/api/v1/order/${orderId}`, {
          method: "DELETE",
        }).then((data) => {
          alert(data.msg || "주문이 취소되었습니다.");
          router.replace(`/orders/${order.email}`); 
        }).catch((err) => {
          console.error("삭제 실패:", err);
          alert("주문 취소 중 오류가 발생했습니다.");
        });
      }
      return; 
    }

    // 2. 새로운 총액 계산
    const newTotalPrice = updatedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity, 
      0
    );

    // 3. 상태 반영
    setOrder({
      ...order,
      products: updatedProducts,
      totalPrice: newTotalPrice,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg font-medium">주문 정보를 불러오는 중...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <main className="max-w-2xl mx-auto mt-10 p-6 bg-red-50 rounded-lg border border-red-200 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">주문 번호 {orderId}</h1>
        <p className="text-gray-600">주문 상세 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const address = (form.elements.namedItem("address") as HTMLInputElement).value.trim();
    const zipCode = (form.elements.namedItem("zipCode") as HTMLInputElement).value.trim();

    if (!address || !zipCode) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    apiFetch(`/api/v1/order/${orderId}?email=${order.email}`, {
      method: "PUT",
      body: JSON.stringify({
        address,
        zipCode,
        products: order.products,
      }),
    }).then((data) => {
      alert(data.msg || "수정이 완료되었습니다.");
      router.replace(`/orders/${order.email}/${orderId}`);
    });
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-gray-50 border-b p-6">
          <h1 className="text-2xl font-bold text-gray-800"> {orderId}번 주문 수정하기</h1>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
              상품 정보
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <ul className="divide-y divide-gray-200">
                {order.products.map((product: OrderProductDto) => (
                  <li key={product.productId} className="py-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{product.productName}</span>
                      <span className="text-sm text-gray-500">{formatWon(product.price)}원</span>
                    </div>

                    {/* --- 수량 조절 +,- 버튼 --- */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.productId, -1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          -
                        </button>
                        <div className="w-12 text-center font-bold text-gray-800 border-x border-gray-200">
                          {product.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.productId, 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-gray-700 min-w-[80px] text-right">
                        {formatWon(product.price * product.quantity)}원
                      </span>
                    </div>
                    {/* --- 수량 조절 +,- 버튼 --- */}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">총 결제 금액</span>
                <span className="text-2xl font-extrabold text-blue-600">
                  {formatWon(order.totalPrice)}원
                </span>
              </div>
            </div>
          </section>

          {/* 배송지 수정 폼 */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
              배송지 정보 수정
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 ml-1">배송 주소</label>
                <input
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  type="text"
                  name="address"
                  placeholder="주소를 입력하세요"
                  defaultValue={order.address}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 ml-1">우편번호</label>
                <input
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  type="text"
                  name="zipCode"
                  placeholder="우편번호를 입력하세요"
                  defaultValue={order.zipCode}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-[2] px-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-700 font-bold shadow-lg shadow-gray-200 transition-all active:scale-[0.98]"
                >
                  수정 사항 저장하기
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}