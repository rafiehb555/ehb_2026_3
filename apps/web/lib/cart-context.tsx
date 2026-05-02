'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface CartItem {
  productId: string;
  title: string;
  priceUsd: number;
  quantity: number;
  image?: string;
  sellerId?: string;
  productStl?: number;
}

interface CartCtx {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
}

const C = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = useCallback((item: CartItem) => {
    setItems((list) => {
      const existing = list.find((i) => i.productId === item.productId);
      if (existing) {
        return list.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...list, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((list) => list.filter((i) => i.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setItems((list) =>
      list.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.priceUsd * i.quantity, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  return (
    <C.Provider value={{ items, add, remove, setQty, clear, subtotal, count }}>
      {children}
    </C.Provider>
  );
}

export function useCart() {
  const ctx = useContext(C);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
