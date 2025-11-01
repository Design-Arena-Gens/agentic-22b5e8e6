"use client";

import { useSearchParams, Link } from 'next/navigation';
import NextLink from 'next/link';

export default function SuccessPage() {
  const params = useSearchParams();
  const orderId = params.get('order') || 'N/A';
  return (
    <div className="container-default py-16 text-center">
      <h1 className="text-3xl font-bold">Thank you for your purchase!</h1>
      <p className="mt-2 text-gray-600">Your order ID is <span className="font-mono">{orderId}</span>.</p>
      <NextLink href="/products" className="mt-6 inline-block rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">Continue shopping</NextLink>
    </div>
  );
}
