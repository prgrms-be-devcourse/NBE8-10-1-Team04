"use client";

import { apiFetch } from "@/lib/backend/client";
import { use, useEffect, useState } from "react";
import { OrderResponseDto } from "@/type/orderResponse";
import { OrderProductDto } from "@/type/orderProduct";

export default function Page({ params }: { params: Promise<{ orderId: String }> }) {
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

    return (
        <>
        <h1>{orderId}번 주문 수정</h1>
        {order.products && order.products.length > 0 ? (
                <ul>
                    {order.products.map((product: OrderProductDto) => (
                        // key는 목록 렌더링 시 중요하며, productId가 고유하다고 가정합니다.
                        <li key={product.productId} style={{ marginBottom: '5px' }}>
                            {product.productName} (수량: {product.quantity}개, 가격: {product.price}원)
                        </li>
                    ))}
                </ul>
            ) : (
                <p>주문된 상품이 없습니다.</p>
            )}

        <form className="flex flex-col gap-2 p-2">        
            <button className="border p-2 rounded" type="submit">
            저장
            </button>
        </form>
        </>
    );
}