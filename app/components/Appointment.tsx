"use client";

import React from "react";
import Link from "next/link";

const AppointmentSection: React.FC = () => (
  <section className="bg-[#303638] py-16 px-4 text-white text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif mb-4">
        Book Your Appointment
      </h2>
      <p className="text-base md:text-lg mb-8 leading-relaxed">
        Before your transformation begins, a crucial step awaits &ndash; your
        consultation. At Facey Clinic, our expert practitioners and doctors
        conduct a comprehensive skin assessment, dedicated to crafting a bespoke
        treatment plan exclusively for you. Book today to unleash your
        beauty&apos;s true potential and discover the art of aesthetics in the
        heart of Weybridge, London.
      </p>
      <Link
        href="/book"
        className="inline-block border border-white px-8 py-3 uppercase font-medium hover:bg-white hover:text-green-700 transition"
      >
        Book Now
      </Link>
    </div>
  </section>
);

export default AppointmentSection;
