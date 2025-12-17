"use client";

import { useEffect, useState } from "react";
import { ProductDto } from "@/type/product";
import { apiFetch } from "@/lib/backend/client";
import Link from "next/link";

const formatPrice = (price: number) => price.toLocaleString("ko-KR");

export default function Home() {
  const [products, setProducts] = useState<ProductDto[]>([]);

  const loadProducts = async () => {
    try {
      const data = await apiFetch("/api/v1/products");
      setProducts(data);
    } catch (err) {
      console.error("상품 불러오기 실패:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제할까요?")) return;

    try {
      await apiFetch(`/api/v1/product/${id}`, { method: "DELETE" });
      loadProducts();
    } catch (err) {
      console.error("상품 삭제 실패:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <div className="bg-white border rounded-xl shadow-md h-[530px] flex flex-col">
        {/* 상품 목록*/}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {products.length === 0 && (
            <p className="text-center text-gray-500">등록된 상품이 없습니다.</p>
          )}

          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-6 border rounded-lg p-4"
            >
              {/* 이미지 */}
              <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm shrink-0">
                이미지
              </div>

              {/* 이름 + 설명 (가변 영역) */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{product.name}</div>
                <div className="text-sm text-gray-500 truncate">
                  {product.description}
                </div>
              </div>

              {/* 가격 (고정 영역) */}
              <div className="w-28 text-right font-medium shrink-0">
                {formatPrice(product.price)}원
              </div>

              {/* 버튼 */}
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="px-4 py-1 border rounded hover:bg-gray-100"
                >
                  수정
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-1 border rounded hover:bg-gray-100"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4">
          <Link
            href="/admin/products/create"
            className="block w-full border rounded py-2 text-center text-lg hover:bg-gray-100"
          >
            +
          </Link>
        </div>
      </div>
    </div>
  );
}
