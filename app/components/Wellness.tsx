import React from "react";

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
          Our Values
        </h2>
        <p className="text-xm md:text-sm text-gray-700 mb-6 leading-relaxed">
          Our values are rooted in delivering personalised care that celebrates
          your individuality, guided by excellence and expertise in every
          treatment. We believe true beauty begins within, which is why we focus
          on creating inner and outer harmony—nurturing confidence, radiance,
          and wellbeing together. Every detail of your journey is designed to
          offer a luxury experience, blending comfort, artistry, and precision.
          Built on trust and connection, our philosophy ensures that the results
          we deliver are not only beautiful today, but also timeless for
          tomorrow.
        </p>
      </div>
    </div>
  </section>
);

export default WellnessSection;
