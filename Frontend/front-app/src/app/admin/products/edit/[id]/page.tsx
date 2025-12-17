"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/lib/backend/client";

interface ProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      const data: ProductDto = await apiFetch(`/api/v1/products/${productId}`);
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
    };

    loadProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || price === "" || price <= 0 || !description.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch(`/api/v1/product/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, description, imageUrl }),
      });
      alert("상품이 수정되었습니다.");
      router.push("/admin/products");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 메인 영역 */}
      <div className="flex gap-10 p-5">
        {/* 좌측 */}
        <div className="w-1/3 flex flex-col gap-6">
          {/* 이미지 미리보기 */}{" "}
          <div className="h-32 w-32 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
            {" "}
            {imageUrl ? (
              <img
                src={imageUrl}
                className="h-full w-full object-cover"
                alt="미리보기"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                {" "}
                이미지 없음{" "}
              </div>
            )}{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block mb-1 font-medium">이미지 URL</label>{" "}
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />{" "}
          </div>
          {/* 가격 */}
          <div>
            <label className="block mb-1 font-medium">가격 :</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={price}
              onChange={(e) =>
                setPrice(Number(e.target.value.replace(/[^0-9]/g, "")))
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-600"
            />
          </div>
        </div>

        {/* 우측 */}
        <div className="w-2/3 flex flex-col gap-6">
          {/* 상품 이름 */}
          <div>
            <label className="block mb-1 font-medium">상품 이름</label>
            <input
              type="text"
              placeholder="예) 아라비카 (원두커피용)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-600"
            />
          </div>

          {/* 상품 설명 */}
          <div className="flex-1">
            <label className="block mb-1 font-medium">상품 설명</label>
            <textarea
              value={description}
              placeholder="예) 산미가 강하고 꽃향기가 남"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full rounded-md border border-gray-300 bg-white px-3 py-2  outline-none focus:border-gray-600 resize-none"
            />
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-10 mt-50">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-md border border-gray-900 px-4 py-4 font-semibold hover:bg-gray-900 hover:text-white w-22"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md border border-gray-900 px-4 py-4 font-semibold hover:bg-gray-900 hover:text-white w-22"
        >
          완료
        </button>
      </div>
    </form>
  );
}
