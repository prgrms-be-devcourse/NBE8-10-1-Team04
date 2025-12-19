"use client"

import Swal from "sweetalert2";
import { apiFetch } from "@/lib/backend/client";
import { OrderDto } from "@/type/order";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function Page() {
    const router = useRouter();
    const [orders, setOrders] = useState<OrderDto[] | null>(null);
    const [selectedTab, setSelectedTab] = useState<string>("ALL");
    
    useEffect(() => {
        apiFetch('/api/v1/orders').then(setOrders);
    }, []);
    
    // 탭에 따라 필터링된 주문
    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        if (selectedTab === "ALL") return orders;
        return orders.filter(order => order.deliveryStatus === selectedTab);
    }, [orders, selectedTab]);
    
    const handleStatusChange = (orderIds: number[], newStatus: string) => {
        apiFetch('/api/v1/orders/status', {
            method: "PUT",
            body: JSON.stringify({
                orderIds: orderIds,
                deliveryStatus: newStatus
            }),
        }).then((data) => {
            Swal.fire({
                title: "변경 완료",
                text: data.msg,
                icon: "success",
                confirmButtonColor: "#3b82f6",
            })
            // 주문 목록 새로고침
            apiFetch('/api/v1/orders').then(setOrders);
        });
    };
    
    if (orders == null) return <div className="flex justify-center items-center h-full">로딩중...</div>;
    
    return (
        <div className="flex flex-col h-full px-5 py-5">
            {/* 고정 헤더 */}
            <div className="text-2xl font-bold mb-4 flex-shrink-0">
                주문 관리
            </div>
            
            {/* 탭 메뉴 */}
            <div className="flex gap-2 mb-4 flex-shrink-0">
                <button 
                    onClick={() => setSelectedTab("ALL")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedTab === "ALL" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    전체 ({orders?.length || 0})
                </button>
                <button 
                    onClick={() => setSelectedTab("CONFIRM")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedTab === "CONFIRM" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    주문 확인 ({orders?.filter(o => o.deliveryStatus === "CONFIRM").length || 0})
                </button>
                <button 
                    onClick={() => setSelectedTab("READY")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedTab === "READY" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    배송 준비 중 ({orders?.filter(o => o.deliveryStatus === "READY").length || 0})
                </button>
                <button 
                    onClick={() => setSelectedTab("SHIPPING")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedTab === "SHIPPING" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    배송 중 ({orders?.filter(o => o.deliveryStatus === "SHIPPING").length || 0})
                </button>
                <button 
                    onClick={() => setSelectedTab("DELIVERED")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedTab === "DELIVERED" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    배송 완료 ({orders?.filter(o => o.deliveryStatus === "DELIVERED").length || 0})
                </button>
            </div>
            
            {/* 스크롤 가능한 주문 목록 */}
            <div className="flex-1 overflow-y-auto space-y-3">
                {filteredOrders.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                        해당 상태의 주문이 없습니다.
                    </div>
                ) : (
                    filteredOrders.map((order, index) => (
                        <div key={index} className="border border-gray-300 rounded-xl p-5 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-6 flex-1">
                                {/* 번호 */}
                                <div className="text-3xl font-bold text-gray-800 w-8">
                                    {index + 1}
                                </div>
                                
                                {/* 주문 정보 */}
                                <div className="flex-1">
                                    <div className="text-base font-semibold mb-1">
                                        {order.address}
                                    </div>
                                    <div className="flex gap-12 text-sm text-gray-700">
                                        <span>주문 {order.groupTotalQuantity}건</span>
                                        <span>배송 예상 일자 : {order.deliveryDate}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 주문 확인 드롭다운 */}
                            <select 
                                value={order.deliveryStatus}
                                onChange={(e) => handleStatusChange(order.orders || [], e.target.value)}
                                className="border border-gray-300 rounded-lg px-6 py-2.5 bg-white cursor-pointer hover:bg-gray-50 font-medium min-w-[140px] appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundSize: '1.5em 1.5em',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="CONFIRM">주문 확인</option>
                                <option value="READY">배송 준비 중</option>
                                <option value="SHIPPING">배송 중</option>
                                <option value="DELIVERED">배송 완료</option>
                            </select>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}