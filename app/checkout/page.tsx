"use client";

import { useCart } from '@/components/cart/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: { name, email, address }, items })
      });
      if (!res.ok) throw new Error('Checkout failed');
      const data = await res.json();
      clear();
      router.push(`/success?order=${encodeURIComponent(data.orderId)}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-default py-12">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container-default py-12 grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">Checkout</h1>
        {error && <div className="rounded bg-red-50 border border-red-200 text-red-700 p-3">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <button disabled={loading} className="rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 disabled:opacity-60">
          {loading ? 'Processing...' : 'Place order'}
        </button>
      </form>
      <div className="border rounded-md p-4 h-max">
        <p className="text-lg font-semibold">Summary</p>
        <div className="mt-2 flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
