'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
const PRODUCTS = [
  { id: 'hair-supplements', title: 'Hair Supplements', price: 90, image: '/products/a.webp' },
  { id: 'cellular-defence-spf50', title: 'Cellular Defence SPF50', price: 80, image: '/products/b.webp' },
];

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const items = PRODUCTS
    .filter((p) => cart[p.id])
    .map((p) => ({
      ...p,
      quantity: cart[p.id],
      lineTotal: p.price * cart[p.id],
    }));

  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto text-black">
      <h1 className="text-3xl font-serif text-green-800 mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center space-y-4">
          <p>Your cart is empty. Let’s change that!</p>
          <Link href="/shop" className="inline-block bg-green-700 text-white px-6 py-2 rounded">
            Back to Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-full md:w-1/4 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-auto"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-medium">{item.title}</h2>
                <p className="text-gray-700">£{item.price.toFixed(2)}</p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 border rounded"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold">
                  Line total: £{item.lineTotal.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-2xl font-medium">
              Subtotal: £{subtotal.toFixed(2)}
            </p>
            <div className="space-x-4 mt-4 md:mt-0 flex flex-col sm:flex-row">
              <button
                onClick={() => clearCart()}
                className="inline-block text-red-600 underline mb-2 sm:mb-0"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="inline-block bg-green-700 text-white px-6 py-3 rounded"
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
