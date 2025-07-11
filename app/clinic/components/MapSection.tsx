'use client';

import React from 'react';

const MapSection: React.FC = () => (
  <section id="map" className="w-full my-16">
    <div className="aspect-[16/9] max-w-7xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <iframe
        title="Dr Rasha Clinic Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.8984723475573!2d-0.44835082473791715!3d51.36816312086731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487675c00be49101%3A0xf477bf7a64a502a1!2s71%20Queens%20Rd%2C%20Weybridge%20KT13%209UQ!5e0!3m2!1sen!2suk!4v1752256792537!5m2!1sen!2suk"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </section>
);

export default MapSection;
