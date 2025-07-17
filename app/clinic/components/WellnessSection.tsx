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
    title: 'The Home of Aesthetics and Wellness',
    paragraphs: [
      'Unrivalled aesthetics clinic in London for anti-wrinkle injections, dermal fillers, and laser treatments.',
      'Welcome to Facey Clinic, the best aesthetics clinic in London based in Knightsbridge. We are dedicated to seamlessly blending our profound medical expertise with an artistic touch, making our clinic a leading destination for non-surgical beauty treatments in London.',
      'As a renowned aesthetic clinic in London, we stand out not only for our exceptional aesthetic treatments, designed to enhance your natural beauty and boost your confidence but also for the meaningful connections we build with our patients. Facey and her skilled team are more than practitioners; they become trusted partners on your aesthetic journey, ensuring a personalized, compassionate approach every step of the way.',
      'Discover why Facey Clinic is considered the best aesthetics clinic in London with our wide range of popular treatments that cater to your beauty needs.'
    ],
    image: '/images/12.webp',
    alt: 'Wellness Treatment Room',
    ctaHref: '/contact',
    ctaText: 'Enquire Today',
  },
  {
    title: 'Why Choose Facey Clinic',
    paragraphs: [
      'As a renowned aesthetics clinic in London, we stand as a beacon of excellence and inclusivity, dedicated to addressing both the specific concerns of Middle Eastern women and our local clients in London. Our unwavering commitment to understanding and treating problems such as hyperpigmentation, thinning skin/hair, and ageing skin sets us apart, making us one of the best aesthetics clinics in London',
      'We specialise in offering personalised aesthetic treatments, tailoring our approach to meet the unique needs of our valued patients. Our holistic care ensures a wide range of non-surgical beauty treatments, making our clinic the go-to cosmetic clinic in London.',
      'In the dynamic world of aesthetic treatments, staying ahead is paramount. Facey Clinic prides itself on being at the forefront of innovation. We consistently adopt the latest techniques and cutting-edge technology to enhance our patients experience and deliver exceptional results. When you choose Facey Clinic, you choose a trusted partner on the journey to a more radiant and rejuvenated you from head to toe.'
    ],
    image: '/images/clinic-background.jpg',
    alt: 'Clinic Interior',
    ctaHref: '/about',
    ctaText: 'Learn More',
  },
];

const WellnessSection: React.FC = () => (
  <section id="wellness" className="py-16 px-4 md:px-8 lg:px-16 space-y-16">
    {blocks.map((block) => (
      <div
        key={block.title}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-lg">
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