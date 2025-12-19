"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { apiFetch } from "@/lib/backend/client";

export default function Home() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmedName = name.trim();
      const trimmedDescription = description.trim();
      const numericPrice = Number(price);

      if (!trimmedName) {
        Swal.fire({
          text: "상품명을 입력해주세요.",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
          confirmButtonText: "확인",
          heightAuto: false,
          backdrop: true,
        });
        return;
      }
      if (numericPrice <= 0 || isNaN(numericPrice)) {
        Swal.fire({
          text: "가격을 올바르게 입력해주세요.",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
          confirmButtonText: "확인",
          heightAuto: false,
          backdrop: true,
        });
        return;
      }
      if (trimmedDescription.length < 2) {
        Swal.fire({
          text: "설명을 2자 이상 입력해주세요.",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
          confirmButtonText: "확인",
          heightAuto: false,
          backdrop: true,
        });
        return;
      }

      setIsSubmitting(true);

      try {
        await apiFetch("/api/v1/product", {
          method: "POST",
          body: JSON.stringify({
            name: trimmedName,
            price: numericPrice,
            description: trimmedDescription,
            imageUrl: imageUrl || null,
          }),
        });
        Swal.fire({
          title: "상품 생성 완료",
          text: "상품이 성공적으로 생성되었습니다.",
          icon: "success",
          confirmButtonColor: "#3b82f6",
          heightAuto: false,
          backdrop: true,
        })
        router.push("/admin/products");
      } catch (err) {
        console.error("상품 생성 실패:", err);
        Swal.fire({
          title: "오류 발생",
          text: "상품 생성에 실패했습니다.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          heightAuto: false,
          backdrop: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, price, description, imageUrl, router]
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* 메인 영역 */}
      <div className="flex gap-10 p-5">
        {/* 좌측 영역 */}
        <div className="w-1/3 flex flex-col gap-6">
          {/* 이미지 */}
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
              className="w-full border border-gray-300 px-3 py-2 rounded"
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

        {/* 우측 영역 */}
        <div className="w-2/3 flex flex-col gap-6">
          {/* 상품 이름 */}
          <div>
            <label className="block mb-1 font-medium">상품 이름</label>
            <input
              placeholder="예) 아라비카 (원두커피용)"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-600"
              disabled={isSubmitting}
            />
          </div>

          {/* 상품 설명 */}
          <div className="flex-1">
            <label className="block mb-1 font-medium">상품 설명</label>
            <textarea
              placeholder="예) 산미가 강하고 꽃향기가 남"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-600 resize-none"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-5 mt-20">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-md border border-gray-900 px-4 py-4 font-semibold hover:bg-gray-900 hover:text-white w-22"
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="submit"
          className="rounded-md border border-gray-900 px-4 py-4 font-semibold hover:bg-gray-900 hover:text-white w-22"
          disabled={isSubmitting}
        >
          완료
        </button>
      </div>
    </form>
  );
}
