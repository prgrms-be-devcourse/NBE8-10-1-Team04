"use client";

import { use, useEffect, useState } from "react";
import { apiFetch } from "@/lib/backend/client";
import { OrderResponseDto } from "@/type/orderResponse";
import { OrderProductDto } from "@/type/orderProduct";
import Link from "next/link"; // Next.js의 Link 컴포넌트를 가져옵니다.

export default function Page({ params }: { params: Promise<{ orderId: String }> }) {    
    const [order, setOrder] = useState<OrderResponseDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { orderId } = use(params);
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
        <main style={{ padding: '20px' }}>
        <h1>주문 번호 {orderId}번 </h1>
        <p>총 수량: {order.totalQuantity}개 | 총 가격: {order.totalPrice}원</p>
            <p>배송 상태: {order.deliveryStatus} (예정일: {order.deliveryDate})</p>

            <hr style={{ margin: '20px 0' }} />

            <h2> 주문 상품 목록</h2>
            
            {/* products의 이름만 출력 */}
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
             <div className="flex gap-2">
            <button className="p-2 rounded border" >
            삭제
            </button>
            <Link className="p-2 rounded border" href={`${orderId}/edit`}>
            수정
            </Link>
        </div>
        </main>
    );
}