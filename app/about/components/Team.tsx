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
    title: "Facey",
    paragraphs: [
      "Facey Rahkshani, a highly esteemed cosmetic doctor in London, has established herself as a prominent figure in the world of aesthetics. Born in Kuwait and educated in both Australia and the UK, she brings a unique blend of cultural diversity and medical expertise to her practice.",
      "Driven by her artistic sensibilities and a deep love of the arts, she found her true calling in aesthetic medicine, where she harmoniously combines her medical knowledge with an innate flair for beauty. Facey is not only recognised for her incredible results but also her dedication to helping patients achieve their beauty goals; earning her a global following with clients coming from across the world to see her.",
    ],
    image: "/team/1.webp",
    alt: "Wellness Treatment Room",
    ctaHref: "/contact",
    ctaText: "Send us a whatsapp",
  },
  {
    title: "Dr Sara",
    paragraphs: [
      "Dr Sara, a dedicated aesthetic doctor, embarked on her journey at Kuwait University, graduating in 2017. Her diverse experience includes rotations in internal medicine, surgery and gynecology before she found her calling in surgical excellence at a leading London hospital.",
      "Driven by a familial artistic legacy, she seamlessly blends creativity and medicine. Dr Sara’s meticulous eye and holistic approach defines her practice and empowers her patients with lifestyle enhancements. Her holistic methods for body, skin and facial aesthetics have garnered a devoted following at our Knightsbridge clinic in London.",
    ],
    image: "/team/2.webp",
    alt: "Wellness Treatment Room",
    ctaHref: "/contact",
    ctaText: "Book Now",
  },
];

const Team: React.FC = () => (
  <section id="wellness" className="py-16 px-4 md:px-8 lg:px-16 space-y-16">
    <div className="text-bold text-4xl text-green-800 text-center">
      Meet Our Clinic Team
    </div>
    {blocks.map((block) => (
      <div
        key={block.title}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-full md:w-1/2 h-1/3 overflow-hidden rounded-lg">
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

export default Team;
