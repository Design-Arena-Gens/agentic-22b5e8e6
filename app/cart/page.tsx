"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartContext';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="mt-6 text-gray-600">Your cart is empty. <Link href="/products" className="text-brand-600">Shop now</Link></div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border rounded-md p-3">
                <div className="relative h-24 w-24">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-sm">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                      className="w-20 rounded border px-2 py-1"
                    />
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-sm text-red-600">Remove</button>
              </div>
            ))}
          </div>
          <div className="border rounded-md p-4 h-max">
            <p className="text-lg font-semibold">Summary</p>
            <div className="mt-2 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="mt-4 block rounded-md bg-brand-600 px-4 py-2 text-center text-white hover:bg-brand-700">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
