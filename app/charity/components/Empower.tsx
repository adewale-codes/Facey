'use client';

import React from 'react';
import Image from 'next/image';

const EmpowerSection: React.FC = () => (
  <section id="empower" className="py-16 px-4 md:px-8 lg:px-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="order-first md:order-last flex justify-center md:justify-end">
        <div className="w-48 h-48 md:w-64 md:h-64">
          <Image
            src="/images/17.png"
            alt="Malala Fund QR Code"
            width={256}
            height={256}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Text Column: mobile second, desktop first */}
      <div className="order-last md:order-first space-y-6">
        <h2 className="text-3xl md:text-4xl font-serif text-green-800">
          Malala Fund: Empowering Girls Through Education
        </h2>

        <p className="text-gray-700 leading-relaxed">
          At Facey Clinic, we believe in enhancing beauty, confidence, and well-being in every way possible. As
          the leading aesthetics clinic in London, located in the heart of Knightsbridge, we are committed to
          delivering the highest standards of medical expertise with an artistic touch. But beauty goes beyond the
          surface—it lies in empowering others, too.
        </p>

        <h3 className="text-2xl font-serif text-green-800">Our Charity Partnership</h3>

        <p className="text-gray-700 leading-relaxed">
          For every treatment you receive at Facey Clinic, a portion of the proceeds will go directly to
          supporting Malala Fund&apos;s impactful work. By choosing us for your aesthetic needs, you’re helping to create a
          more equal world for girls, ensuring that they have access to education that will shape their futures.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Together, with your support, we are helping to make a lasting difference in the lives of girls around the
          globe. Join us in this cause, and let&apos;s create beauty that truly changes the world.
        </p>
      </div>
    </div>
  </section>
);

export default EmpowerSection;
