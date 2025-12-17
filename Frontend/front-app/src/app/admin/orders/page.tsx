"use client"

import { apiFetch } from "@/lib/backend/client";
import { OrderDto } from "@/type/order";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Select, { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const [ orders, setOrders ] = useState<OrderDto[] | null>(null);

    const [ confirmOrders, setConfirmOrders ] = useState<OrderDto[] | null>(null);
    const [ shippingOrders, setShippingOrders ] = useState<OrderDto[] | null>(null);
    const [ deliverdOrders, setDeliveredOrders ] = useState<OrderDto[] | null>(null);

    useEffect(() => {
    apiFetch(`/api/v1/orders`).then(setOrders);
    }, []);

    // orders?.map((order) => (
    //     order.deliveryStatus == "CONFIRM" // setConfirmOrders
    // ))

    // ✅ 상태 변경 핸들러
    const handleStatusChange = (orderIds: number[], newStatus: string) => {
        apiFetch(`/api/v1/orders/status`, {
            method: "PUT",
            body: JSON.stringify({
                orderIds: orderIds,
                deliveryStatus: newStatus
            }),
            }).then((data) => {
            alert(data.msg);
            router.replace(`/api/v1/orders`);
        });
    };

    if (orders == null) return <div>로딩중...</div>;

    return (
        <>
        <div className="absolute left-10 top-8 flex text-3xl">주문 관리</div>
        <ul className="absolute top-20">
            {orders?.map((order, index) => (
                <li key={index} className="py-5 border w-full rounded">
                    {order.address}
                    {order.deliveryDate}
                    <select 
                        name="deliveryStatus"
                        value={order.deliveryStatus}
                        onChange={(e) => handleStatusChange(order.orders || [], e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="READY">배송 준비 중</option>
                        <option value="SHIPPING">배송 중</option>
                        <option value="DELIVERED">배송 완료</option>
                    </select>
                </li>
            ))}
        </ul>
        </>
    )
}