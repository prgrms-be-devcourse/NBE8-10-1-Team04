"use client";

import { useEffect, useState } from "react";
import { ProductDto } from "@/type/product";
import { apiFetch } from "@/lib/backend/client";

export default function Home() {
  const [products, setProducts] = useState<ProductDto[] | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/products`)
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>Grids & Circle</h1>
      <div>
        <h2>상품 목록</h2>
        {products?.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
