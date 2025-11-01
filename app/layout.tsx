import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { CartProvider } from '@/components/cart/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '?clat Parfums',
  description: 'Boutique de parfums d?exception',
  metadataBase: new URL('https://agentic-22b5e8e6.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <header className="border-b">
            <div className="container-default flex items-center justify-between py-4">
              <Link href="/" className="text-2xl font-bold text-brand-700">?clat Parfums</Link>
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/products" className="hover:text-brand-700">Shop</Link>
                <Link href="/cart" className="hover:text-brand-700">Cart</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t mt-16">
            <div className="container-default py-10 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>? {new Date().getFullYear()} ?clat Parfums. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/" className="hover:text-brand-700">Privacy</Link>
                <Link href="/" className="hover:text-brand-700">Terms</Link>
                <Link href="/" className="hover:text-brand-700">Contact</Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
