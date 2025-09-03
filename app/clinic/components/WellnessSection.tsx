"use client";

import React from "react";
import Link from "next/link";

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
    title: "Crafting Beauty Beyond Boundaries",
    paragraphs: [
      "Welcome to Face Weybridge, Surreys leading destination for aesthetics, beauty, and wellness. Here, our passion lies in delivering exceptional care and transformative treatments designed to enhance your natural beauty and instil lasting confidence.",
      "Recognised as Surreys most trusted clinics, we bring together advanced expertise and artistic precision to deliver results that are both elegant and timeless. What truly defines Face is not only the excellence of ourtreatments, but the genuine connections we create  making every clients experience personal, meaningful, and unique.",
      "Explore our carefully curated range of treatments, each tailored to your individual needs, and discover a space where inner wellbeing and outer radiance meet in perfect harmony.",
    ],
    image: "/images/clinic-background.jpg",
    alt: "Clinic Interior",
    ctaHref: "/about",
    ctaText: "Learn More",
  },
  {
    title: "Our Values",
    paragraphs: [
      "Our values are rooted in delivering personalised care that celebrates your individuality, guided by excellence and expertise in every treatment. We believe true beauty begins within, which is why we focus on creating inner and outer harmony—nurturing confidence, radiance, and wellbeing together. Every detail of your journey is designed to offer a luxury experience, blending comfort, artistry, and precision. Built on trust and connection, our philosophy ensures that the results we deliver are not only beautiful today, but also timeless for tomorrow.",
    ],

    image: "/images/12.png",
    alt: "Wellness Treatment Room",
    ctaHref: "/contact",
    ctaText: "Enquire Today",
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
            <p
              key={i}
              className="text-base md:text-lg text-gray-700 leading-relaxed"
            >
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
