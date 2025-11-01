"use client";

import { useCart } from './CartContext';

export function AddToCartButton({ product }: { product: { id: string; name: string; price: number; image: string } }) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(product, 1)}
      className="rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700"
    >
      Add to cart
    </button>
  );
}
