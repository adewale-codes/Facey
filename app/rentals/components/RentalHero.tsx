"use client";

import React from "react";
import Image from "next/image";

interface RentalHeroProps {
  title: string;
  imageSrc: string;
}

const RentalHero: React.FC<RentalHeroProps> = ({ title, imageSrc }) => (
  <section className="relative w-full h-screen -mt-16 overflow-hidden">
    <Image
      src={imageSrc}
      alt=""
      fill
      className="object-cover object-center"
      priority
    />

    <div className="absolute inset-0 bg-black bg-opacity-40" />

    <div className="relative z-10 flex h-full items-center px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4">
          {title}
        </h1>
      </div>
    </div>
  </section>
);

export default RentalHero;
