"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('cart:v1');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  try {
    localStorage.setItem('cart:v1', JSON.stringify(items));
  } catch {}
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') saveToStorage(items);
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
  };

  const clear = () => setItems([]);

  const totalQuantity = useMemo(() => items.reduce((a, b) => a + b.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((a, b) => a + b.price * b.quantity, 0), [items]);

  const value = useMemo(() => ({ items, totalQuantity, subtotal, addItem, removeItem, updateQuantity, clear }), [items, totalQuantity, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
