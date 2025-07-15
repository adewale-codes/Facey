'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const VARIANT_MAP: Record<string, string> = {
    'hair-supplements':            'gid://shopify/ProductVariant/55628511478133',
    'cellular-defence-spf50':      'gid://shopify/ProductVariant/55628509118837',
  };

  const lineItems = Object.entries(cart).map(([id, qty]) => ({
    variantId: VARIANT_MAP[id],
    quantity: qty,
  }));

  const totalCount = lineItems.reduce((sum, li) => sum + li.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!totalCount) {
    return (
      <div className="p-8 text-center">
        <p>Your cart is empty.</p>
        <button
          onClick={() => router.push('/shop')}
          className="mt-4 bg-green-700 text-white px-6 py-2 rounded"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-6">
      <h1 className="text-2xl font-serif text-green-800">Checkout</h1>
      <p>
        You have <strong>{totalCount}</strong> item{totalCount > 1 && 's'} in your cart
      </p>

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-green-700 text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? 'Redirecting…' : 'Proceed to Secure Checkout'}
      </button>

      <Link href="/cart" className="text-sm underline text-gray-600 block text-center">
        ← Edit Cart
      </Link>
    </div>
  );
}
