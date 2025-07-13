'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
interface Product {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  description: string;
  images: string[];
  keyIngredients: string[];
  howToUse: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'hair-supplements',
    title: 'Hair Supplements',
    subtitle: '60 Capsules',
    price: '£90.00',
    description:
      'Dr Rasha signature hair supplements that help support healthy hair growth.',
    images: ['/products/a.webp', '/products/b.webp', '/products/c.webp', '/products/d.webp'],
    keyIngredients: ['Biotin', 'Zinc', 'Vitamin D', 'Collagen peptides'],
    howToUse: 'Take two capsules daily with food. Do not exceed recommended dose.',
  },
  {
    id: 'cellular-defence-spf50',
    title: 'Cellular Defence SPF50 Moisturiser',
    subtitle: '50 ml (1.6 fl oz)',
    price: '£80.00',
    description:
      'Broad-spectrum SPF50 that shields skin from UVA/UVB while boosting cellular repair.',
    images: [
      '/images/products/spf50-1.jpg',
      '/images/products/spf50-2.jpg',
      '/images/products/spf50-3.jpg',
    ],
    keyIngredients: ['Hyaluronic acid', 'Vitamin E', 'Niacinamide'],
    howToUse:
      'Apply generously every morning as the last step in your skincare routine.',
  },
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const { push, back } = useRouter();
  const id = params?.id as string;

  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);
  if (!product) {
    return (
      <div className="p-8 text-center">
        <p>Product not found.</p>
        <button onClick={() => back()} className="mt-4 text-green-700 underline">
          Go back
        </button>
      </div>
    );
  }

  const [currentImage, setCurrentImage] = useState(0);
  const goToImage = (i: number) => setCurrentImage(i);

  const [openKey, setOpenKey] = useState(false);
  const [openUse, setOpenUse] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    addToCart(product.id);
    setShowToast(true);
  };
  const handleBuyNow = () => {
    addToCart(product.id);
    push('/cart');
  };

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  return (
    <>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-700 text-white px-4 py-2 rounded shadow-lg">
          Added to cart!
        </div>
      )}

      <section className="py-16 px-4 md:px-8 lg:px-16 space-y-16 max-w-7xl mx-auto">
        <Link href="/shop" className="text-sm text-green-700 underline">
          ← Back to shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
              <Image
                src={product.images[currentImage]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    i === currentImage ? 'bg-green-700' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`overflow-hidden rounded-lg ${
                    i === currentImage ? 'ring-2 ring-green-700' : ''
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${i + 1}`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-24"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-black">
            <p className="text-sm uppercase text-gray-600">{product.subtitle}</p>
            <h1 className="text-3xl font-serif text-green-800">{product.title}</h1>
            <p className="text-xl font-medium text-green-800">{product.price}</p>
            <p className="text-gray-700">{product.description}</p>

            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setOpenKey((o) => !o)}
                  className="w-full flex justify-between items-center border-b pb-2 text-gray-800"
                >
                  Key Ingredients
                  <span className="text-xl">{openKey ? '–' : '+'}</span>
                </button>
                {openKey && (
                  <ul className="mt-2 pl-4 list-disc text-gray-700 space-y-1">
                    {product.keyIngredients.map((ki, i) => (
                      <li key={i}>{ki}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <button
                  onClick={() => setOpenUse((o) => !o)}
                  className="w-full flex justify-between items-center border-b pb-2 text-gray-800"
                >
                  How to Use
                  <span className="text-xl">{openUse ? '–' : '+'}</span>
                </button>
                {openUse && <p className="mt-2 pl-4 text-gray-700">{product.howToUse}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Shipping Fees</p>
              <p className="text-gray-700 text-sm">
                Free UK shipping over £150<br />
                UK: £6.50 · EU: £15.00 · Intl: £24.00 · ME: £40.00
              </p>
              <p className="font-semibold text-gray-800">Shipping Guidelines</p>
              <p className="text-gray-700 text-sm">
                Parcels outside UK may incur customs duties/taxes by destination.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleAdd}
                className="w-full bg-green-700 text-white py-3 uppercase font-medium rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full border border-green-700 text-green-700 py-3 uppercase font-medium rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
