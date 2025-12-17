"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductDto } from "@/type/product";
import { apiFetch } from "@/lib/backend/client";

type CartItem = {
  product: ProductDto;
  qty: number;
};

export default function Home() {
  const [products, setProducts] = useState<ProductDto[] | null>(null);
  const router = useRouter();

  // cart: productId -> { product, qty }
  const [cart, setCart] = useState<Record<number, CartItem>>({});

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    apiFetch(`/api/v1/products`).then(setProducts).catch(console.error);
  }, []);

  const cartItems = useMemo(() => Object.values(cart), [cart]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cartItems]);

  const addToCart = (product: ProductDto) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: {
          product,
          qty: existing ? existing.qty + 1 : 1,
        },
      };
    });
  };

  const incQty = (productId: number) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      return {
        ...prev,
        [productId]: { ...existing, qty: existing.qty + 1 },
      };
    });
  };

  const decQty = (productId: number) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;

      const nextQty = existing.qty - 1;
      if (nextQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [productId]: { ...existing, qty: nextQty },
      };
    });
  };

  const formatWon = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

  const handleCheckout = async () => {
    const payload = {
      address,
      zipCode,
      email,
      products: cartItems.map((it) => ({
        productId: it.product.id,
        quantity: it.qty,
      })),
    };

    try {
      const res = await apiFetch(`/api/v1/order`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("order result:", res);
      setCart({});
      alert("주문이 완료되었습니다.");
    } catch (e) {
      console.error(e);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT: 상품 목록 */}
          <section>
            <h2 className="text-2xl font-bold">상품 목록</h2>

            <div className="mt-6 space-y-4">
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-5 rounded-lg border border-gray-200 bg-white p-5"
                >
                  {/* 이미지 (있으면 사용, 없으면 placeholder) */}
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

                  {/* 텍스트 */}
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold">{product.name}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">{product.description}</p>
                  </div>

                  {/* 가격 */}
                  <div className="ml-auto flex items-center gap-4">
                    <p className="w-24 text-right text-lg font-semibold">{formatWon(product.price)}원</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-md border border-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-900 hover:text-white w-15"
                    >
                      추가
                    </button>
                  </div>
                </div>
              ))}

              {!products && <p className="text-sm text-gray-500">상품을 불러오는 중...</p>}
              {products && products.length === 0 && (
                <p className="text-sm text-gray-500">상품이 없습니다.</p>
              )}
            </div>
          </section>

          {/* RIGHT: Summary */}
          <aside className="rounded-lg bg-gray-100 p-6">
            <h2 className="text-2xl font-bold">Summary</h2>
            <div className="mt-4 h-px w-full bg-gray-300" />

            {/* 장바구니 리스트 */}
            <div className="mt-4 space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-600">아직 담긴 상품이 없습니다.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-600">
                        {formatWon(item.product.price)}원 × {item.qty} = {formatWon(item.product.price * item.qty)}원
                      </p>
                    </div>

                    {/* 수량 컨트롤 */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decQty(item.product.id)}
                        className="h-8 w-8 rounded-md border border-gray-400 bg-white text-lg leading-none hover:bg-gray-50"
                        aria-label="decrease"
                      >
                        −
                      </button>
                      <span className="min-w-10 rounded-md bg-gray-800 px-3 py-1 text-center text-sm font-semibold text-white">
                        {item.qty}개
                      </span>
                      <button
                        onClick={() => incQty(item.product.id)}
                        className="h-8 w-8 rounded-md border border-gray-400 bg-white text-lg leading-none hover:bg-gray-50"
                        aria-label="increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 입력 폼 */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">이메일</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-600"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">주소</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-600"
                  placeholder="서울시 ..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">우편번호</label>
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-600"
                  placeholder="12345"
                />
              </div>

              <p className="text-sm text-gray-600">
                당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.
              </p>
            </div>

            {/* 총금액 */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">총금액</p>
              <p className="text-2xl font-bold text-gray-900">{formatWon(totalPrice)}원</p>
            </div>

            {/* 결제하기 */}
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="mt-6 w-full rounded-md bg-gray-900 py-4 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              결제하기
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
