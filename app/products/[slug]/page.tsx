import Image from 'next/image';
import { notFound } from 'next/navigation';
import products from '@/data/products.json';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="container-default py-12 grid lg:grid-cols-2 gap-10">
      <div className="relative h-96 lg:h-[36rem]">
        <Image src={product.image} alt={product.name} fill className="object-cover rounded-xl" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-4 text-sm text-gray-500">Notes: {product.notes.join(', ')}</p>
        <p className="mt-6 text-2xl font-semibold">${product.price.toFixed(2)}</p>
        <div className="mt-6">
          <AddToCartButton product={{ id: product.slug, name: product.name, price: product.price, image: product.image }} />
        </div>
      </div>
    </div>
  );
}
