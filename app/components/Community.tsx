// components/CommunitySection.tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface Card {
  title: string;
  subtitle?: string;
  image: string;
  href?: string;
}

const topCards: Card[] = [
  { title: 'Must-Have Treatments', subtitle: 'Winter Edition', image: '/images/6.png', href: '/blog/must-have' },
  { title: 'Effects of Caffeine', image: '/images/7.jpg', href: '/blog/caffeine' },
];
const bottomCards: Card[] = [
  { title: 'AquaGold', subtitle: 'Treatment', image: '/images/8.jpg', href: '/blog/aquagold' },
  { title: 'Sunday’s Self-Care Agenda', image: '/images/9.jpg', href: '/blog/self-care' },
];

const CommunitySection: React.FC = () => (
  <section id="community" className="py-16 px-4 md:px-8 lg:px-16">
    <div className="max-w-7xl mx-auto">
      {/* Mobile: top swipe */}
      <div className="flex md:hidden overflow-x-auto space-x-4 mb-8">
        {topCards.map((c) => (
          <Link key={c.title} href={c.href!} className="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden relative">
            <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-serif">{c.title}</h3>
              {c.subtitle && <p className="text-sm">{c.subtitle}</p>}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Column */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-serif text-green-800 mb-4">Join our community</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Welcome to Dr Rasha Clinic based in Knightsbridge. We are here to seamlessly blend our profound medical expertise with an artistic touch; making our clinic a distinctive haven of aesthetic excellence in the capital.
          </p>
          <Link
            href="https://instagram.com/dr.rasha.clinic"
            className="inline-block bg-green-700 text-white uppercase font-medium px-6 py-3 rounded"
          >
            Instagram
          </Link>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4">
          {[...topCards, ...bottomCards].map((c) => (
            <Link key={c.title} href={c.href!} className="relative rounded-lg overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-serif">{c.title}</h3>
                {c.subtitle && <p className="text-sm">{c.subtitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile: bottom swipe */}
      <div className="flex md:hidden overflow-x-auto space-x-4 mt-8">
        {bottomCards.map((c) => (
          <Link key={c.title} href={c.href!} className="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden relative">
            <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-serif">{c.title}</h3>
              {c.subtitle && <p className="text-sm">{c.subtitle}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;
