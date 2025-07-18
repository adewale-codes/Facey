import React from 'react';

const WellnessSection: React.FC = () => (
  <section id="wellness-section" className="py-16 px-4 md:px-8 lg:px-16">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
      {/* Image */}
      <div className="w-full md:w-1/2">
        <img
          src="/images/5.webp"
          alt="Wellness Treatment"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* Text */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gray-800">
          The Home of Aesthetics and Wellness
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to Facey Clinic, the best aesthetics clinic in London based in Weybridge. We are dedicated to seamlessly blending our profound medical expertise with an artistic touch, making our clinic a leading destination for non-surgical beauty treatments in London.
        </p>
      </div>
    </div>
  </section>
);

export default WellnessSection;
