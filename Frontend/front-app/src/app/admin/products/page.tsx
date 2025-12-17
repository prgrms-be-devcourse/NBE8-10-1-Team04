"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductDto } from "@/type/product";
import { apiFetch } from "@/lib/backend/client";
import Link from "next/link";

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
      {/* 🔲 하나의 레이어 */}
      <div className="bg-white border rounded-xl shadow-md h-[530px] flex flex-col">
        {/* 🔽 상품 목록 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {products.length === 0 && (
            <p className="text-center text-gray-500">등록된 상품이 없습니다.</p>
          )}
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              {/* 좌측 */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                  이미지
                </div>
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-500">
                    {product.description}
                  </div>
                </div>
              </div>

              {/* 가격 */}
              <div className="font-medium">{product.price}원</div>

              {/* 버튼 */}
              <div className="flex gap-2">
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

        {/* 🔽 + 버튼 (같은 레이어 안, 스크롤 영향 ❌) */}
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
