"use client";

import { apiFetch } from "@/lib/backend/client";
import { use, useEffect, useState } from "react";
import { OrderResponseDto } from "@/type/orderResponse";
import { OrderProductDto } from "@/type/orderProduct";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: Promise<{ orderId: String }> }) {
    const router = useRouter();

    const { orderId } = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState<OrderResponseDto | null>(null);
    useEffect(() => {
        apiFetch(`/api/v1/order/${orderId}`)
          .then((data) => {
                setOrder(data); 
            })
          .catch(error => {
                console.error(`주문 ${orderId} 상세 내역 조회 중 오류 발생:`, error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); 
    if (isLoading) {
        return <main style={{ padding: '20px' }}><h2>주문 내역 로딩 중...</h2></main>;
    }
    if (!order) { 
        return <main style={{ padding: '20px' }}><h1>주문 번호 {orderId}번</h1><p>주문 상세 정보를 찾을 수 없습니다.</p></main>;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const addressInput = form.elements.namedItem("address") as HTMLInputElement;

    addressInput.value = addressInput.value.trim();

    if (addressInput.value.length === 0) {
      alert("주소를 입력해주세요.");
      addressInput.focus();
      return;
    }
    const zipCodeInput = form.elements.namedItem("zipCode") as HTMLInputElement;

    zipCodeInput.value = zipCodeInput.value.trim();

    if (zipCodeInput.value.length === 0) {
      alert("우편번호를 입력해주세요.");
      zipCodeInput.focus();
      return;
    }

    apiFetch(`/api/v1/order/${orderId}?email=${order.email}`, {
      method: "PUT",
      body: JSON.stringify({
        address: addressInput.value,
        zipCode: zipCodeInput.value,
        products: order.products,
      }),
    }).then((data) => {
      alert(data.msg);
      router.replace(`/orders/${order.email}/${orderId}`);
    });
  };

    return (
        <>
        <h1>{orderId}번 주문 수정</h1>
        {order.products && order.products.length > 0 ? (
            <div>
                <ul>
                    {order.products.map((product: OrderProductDto) => (
                        // key는 목록 렌더링 시 중요하며, productId가 고유하다고 가정합니다.
                        <li key={product.productId} style={{ marginBottom: '5px' }}>
                            {product.productName} (수량: {product.quantity}개, 가격: {product.price}원)
                        </li>
                    ))}
                </ul>
                <h1>총 가격 : {order.totalPrice}</h1>
                </div>
            ) : (
                <p>주문된 상품이 없습니다.</p>
            )}

        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>    
            <a>
            주소 
            <input
            className="border p-2 rounded"
            type="text"
            name="address"
            placeholder="주소"
            autoFocus
            defaultValue={order?.address}
            />
            </a>
            <a>
            우편번호
            <input
            className="border p-2 rounded"
            type="text"
            name="zipCode"
            placeholder="우편번호"
            autoFocus
            defaultValue={order?.zipCode}
            />
             </a>
            <button className="border p-2 rounded" type="submit">
            저장
            </button>
        </form>
        </>
    );
}