import products from '@/data/products.json';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-static';

export default function ProductsPage() {
  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold">Shop</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group rounded-lg border hover:shadow-md overflow-hidden">
            <div className="relative h-64">
              <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.notes.join(', ')}</p>
              <p className="mt-2 font-semibold">${p.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
