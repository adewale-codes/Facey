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
        Our Weybridge Clinic
      </h2>
      <p className="text-base md:text-lg text-white mb-4 leading-relaxed max-w-lg">
        At Facey Clinic, we take great pride in introducing you to our
        exceptional team of professionals. Our dedicated and highly skilled
        team, led by the renowned Facey, is committed to providing you with the
        highest standard of care and aesthetic expertise.
      </p>
      <Link
        href="/clinic"
        className="bg-green-700 text-white uppercase font-medium px-4 py-2 rounded"
      >
        Find Out More
      </Link>
    </div>
  </section>
);

export default FindSection;
