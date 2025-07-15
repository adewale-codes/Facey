"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
}

const PRODUCTS: Product[] = [
  {
    id: "cellular-defence-spf50",
    title: "Cellular Defence SPF50 Moisturiser",
    image: "/products/1.jpeg",
    price: "£80.00",
  },
  {
    id: "hair-supplements",
    title: "Hair Supplements",
    image: "/products/2.jpeg",
    price: "£90.00",
  },
];

export default function ShopGrid() {
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    router.push("/cart");
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="group relative overflow-hidden rounded-lg shadow-lg"
          >
            <Link href={`/shop/${p.id}`}>
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-95"
              />
            </Link>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Link href="/checkout">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-green-700 text-white uppercase text-sm font-medium px-4 py-2 rounded pointer-events-auto"
                >
                  Buy Now
                </button>
              </Link>
            </div>

            <div className="mt-4 flex justify-between items-center px-5">
              <h3 className="text-lg font-serif text-gray-800">{p.title}</h3>
              <span className="text-base font-medium text-green-800">
                {p.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
