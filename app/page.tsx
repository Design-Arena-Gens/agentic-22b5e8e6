import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

export default function HomePage() {
  const featured = products.slice(0, 3);
  return (
    <div>
      <section className="bg-gradient-to-b from-rose-50 to-white">
        <div className="container-default grid md:grid-cols-2 gap-10 items-center py-16">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Discover your signature scent
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Curated collection of artisanal fragrances crafted with the finest notes.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/products" className="rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">Shop now</Link>
              <a href="#featured" className="rounded-md border px-6 py-3 hover:bg-gray-50">Explore</a>
            </div>
          </div>
          <div className="relative h-80 md:h-[28rem]">
            <Image src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1600&auto=format&fit=crop" alt="Perfume bottles" fill className="object-cover rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      <section id="featured" className="container-default py-16">
        <h2 className="text-2xl font-semibold">Featured</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
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
      </section>
    </div>
  );
}
