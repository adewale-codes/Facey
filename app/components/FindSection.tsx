"use client";

import React from "react";
import Link from "next/link";

const FindSection: React.FC = () => (
  <section
    className="relative w-full h-screen bg-center bg-cover"
    style={{ backgroundImage: "url('/images/clinic-background.jpg')" }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40" />

    <div className="relative z-10 flex flex-col justify-end items-start h-full  mx-auto px-4 md:px-8 pb-16">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-2">
        Crafting Beauty Beyond Boundaries
      </h2>
      <p className="text-xm md:text-sm text-white mb-4 leading-relaxed max-w-lg">
        Welcome to Face Weybridge, Surreys leading destination for aesthetics,
        beauty, and wellness. Here, our passion lies in delivering exceptional
        care and transformative treatments designed to enhance your natural
        beauty and instil lasting confidence.
        <br />
        Recognised as Surreys most trusted clinics, we bring together advanced
        expertise and artistic precision to deliver results that are both
        elegant and timeless. What truly defines Face is not only the excellence
        of ourtreatments, but the genuine connections we create making every
        clients experience personal, meaningful, and unique.
        <br />
        Explore our carefully curated range of treatments, each tailored to your
        individual needs, and discover a space where inner wellbeing and outer
        radiance meet in perfect harmony.
      </p>
      {/* <Link
        href="/clinic"
        className="bg-green-700 text-white uppercase font-medium px-4 py-2 rounded"
      >
        Find Out More
      </Link> */}
    </div>
  </section>
);

export default FindSection;
