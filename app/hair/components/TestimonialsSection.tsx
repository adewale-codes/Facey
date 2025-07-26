'use client';

import React from 'react';

interface Testimonials {
  name: string;
  role?: string;
  rating: number;
  text: string;
}

const testimonials: Testimonials[] = [
  {
    name: 'Nas A',
    rating: 5,
    text: `I visited Facey on Tuesday. Nice receptionists, very welcoming. Consultation - the consultation with Facey was very thorough and honest...`,
  },
  {
    name: 'Mariam C',
    rating: 5,
    text: `Dr. Sara is by far the best practitioner I've ever met. She spots straight away the areas that require enhancement...`,
  },
  {
    name: 'Clariana T. M',
    rating: 5,
    text: `I'm really satisfied with my treatment today. Facey is very kind and knows the most suitable procedures...`,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="20" height="20"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="text-green-800"
          viewBox="0 0 24 24"
        >
          <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9 9 9" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-green-800 mb-8 text-center">
          What Our Customers Say
        </h2>

        <div className="flex md:hidden overflow-x-auto space-x-6 pb-4">
          {testimonials.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 p-4 border rounded-lg shadow">
              <StarRating count={t.rating} />
              <p className="mt-4 text-gray-700">{t.text}</p>
              <p className="mt-4 font-semibold text-green-800">{t.name}</p>
            </div>
          ))}
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 border rounded-lg shadow-lg flex flex-col">
              <StarRating count={t.rating} />
              <p className="mt-4 text-gray-700 flex-1">{t.text}</p>
              <p className="mt-4 font-semibold text-green-800">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
