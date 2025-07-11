import React from 'react';

const logos = [
  '/logos/1.png',
  '/logos/2.png',
  '/logos/3.webp',
  '/logos/4.webp',
  '/logos/5.png',
  '/logos/6.png',
  '/logos/7.png',
  '/logos/8.png',
];

const LogoSlider: React.FC = () => (
  <section className="overflow-hidden py-8 bg-white">
    <div className="flex animate-marquee whitespace-nowrap space-x-8">
      {[...logos, ...logos].map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="inline-block h-12 w-auto object-contain"
        />
      ))}
    </div>
  </section>
);

export default LogoSlider;
