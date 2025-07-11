'use client';

import React from 'react';
import Link from 'next/link';

interface Block {
  title: string;
  paragraphs: string[];
  image: string;
  alt: string;
  ctaHref?: string;
  ctaText?: string;
}

const blocks: Block[] = [
  {
    title: 'Excellence is our passion',
    paragraphs: [
      'Dr Rasha Clinic proudly offers world-class aesthetic treatments in Knightsbridge, led by the highly respected Dr Rasha and her expert team. Rasha and her dedicated team endeavour to provide the highest standard of care and aesthetic experience in the heart of London, and are one of the best according to Forbes Magazine.',
      'At Dr Rasha Clinic, we take great pride in introducing you to our exceptional team of professionals. Our dedicated and highly skilled team, led by the renowned Dr. Rasha, is committed to providing you with the highest standard of care and aesthetic expertise with a comprehensive range of face, body and hair treatments.With a collective passion for enhancing natural beauty and ensuring patient satisfaction, the Dr Rasha Clinic team is here to guide you on your aesthetic journey in our beautiful custom-built Knightsbridge Clinic in London. Get to know the individuals who make every visit to our clinic a personalized and transformative experience below.Our dedicated and highly skilled team, led by the renowned Dr. Rasha, is committed to providing you with the highest standard of care and aesthetic expertise.',
      'With a collective passion for enhancing natural beauty, and ensuring patient satisfaction, the Dr Rasha Clinic team is here to guide you on your aesthetic journey in our beautiful custom-build Knightsbridge Clinic in London. Get to know the individuals who make every visit to our clinic a personalized and transformative experience below.',
    ],
    image: '/images/15.webp',
    alt: 'Wellness Treatment Room',
    ctaHref: '/contact',
    ctaText: 'Send us a whatsapp',
  },
];

const WellnessSection: React.FC = () => (
  <section id="wellness" className="py-16 px-4 md:px-8 lg:px-16 space-y-16">
    {blocks.map((block) => (
      <div
        key={block.title}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-full md:w-1/2 h-1/2 overflow-hidden rounded-lg">
          <img
            src={block.image}
            alt={block.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-green-800">
            {block.title}
          </h2>
          {block.paragraphs.map((p, i) => (
            <p key={i} className="text-base md:text-lg text-gray-700 leading-relaxed">
              {p}
            </p>
          ))}
          {block.ctaHref && block.ctaText && (
            <Link
              href={block.ctaHref}
              className="inline-block bg-green-700 text-white uppercase font-medium px-6 py-3 rounded mt-4"
            >
              {block.ctaText}
            </Link>
          )}
        </div>
      </div>
    ))}
  </section>
);

export default WellnessSection;