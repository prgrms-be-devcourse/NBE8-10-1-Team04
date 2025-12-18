"use client";

import { useEffect, useState } from "react";
import { ProductDto } from "@/type/product";
import { apiFetch } from "@/lib/backend/client";
import Link from "next/link";

import { formatWon } from "@/lib/frontend/tools";

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
      <div className="flex flex-col h-full mx-auto max-w-6xl px-4 py-4">
        <h2 className="text-2xl font-bold flex-shrink-0">상품 목록</h2>
        {/* 상품 목록*/}
        <div className="flex-1 overflow-y-auto space-y-3 mt-6 space-y-4 my-4">
          {products.length === 0 && (
            <p className="text-center text-gray-500">등록된 상품이 없습니다.</p>
          )}

          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-5 rounded-lg border border-gray-200 bg-white p-5"
            >
              {/* 이미지 */}
              <div className="h-14 w-14 flex-none overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                {/* @ts-ignore: DTO에 imageUrl 없을 수 있음 */}
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    // @ts-ignore
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                    IMG
                  </div>
                )}
              </div>

              {/* 이름 + 설명 (가변 영역) */}
              <div className="flex-1 min-w-0">
                <div className="truncate text-lg font-semibold">
                  {product.name}
                </div>
                <div className="mt-1 truncate text-sm text-gray-500">
                  {product.description}
                </div>
              </div>

              {/* 가격 (고정 영역) */}
              <div className="w-26 text-right text-lg font-semibold">
                {formatWon(product.price)}원
              </div>

              {/* 버튼 */}
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="rounded-md border border-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-900 hover:text-white w-15"
                >
                  수정
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="rounded-md border border-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-900 hover:text-white w-15"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-1 border-gray-200 my-5"></hr>
        <Link
            href="/admin/products/create"
            className="block w-full border-2 border-gray-300 rounded py-2 text-center text-lg hover:bg-gray-100"
          >
            +  
        </Link>
      </div>
  );
}
