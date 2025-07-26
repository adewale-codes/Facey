"use client";

import React, { useState, useEffect, useRef } from "react";

const videos = ["/videos/1.mp4", "/videos/2.mp4", "/videos/3.mp4"];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // ensure the newly visible video starts playing
  useEffect(() => {
    if (videoRef.current) {
      // play() returns a promise, you can catch errors if needed
      videoRef.current.play().catch(() => {
        /* autoplay still blocked? */
      });
    }
  }, [current]);

  return (
    <section className="relative w-full h-[calc(100vh+4rem)] -mt-16 overflow-hidden">
      {/* Video slides */}
      <div className="absolute inset-0">
        {videos.map((src, idx) => (
          <video
            key={idx}
            ref={idx === current ? videoRef : null}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            // for older iOS:
            webkit-playsinline="true"
            preload="auto"
            className={
              `absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ` +
              (idx === current ? "opacity-100" : "opacity-0")
            }
          />
        ))}
      </div>

      {/* Text overlay */}
      <div className="relative z-10 flex h-[calc(100vh-4rem)] flex-col items-start justify-center max-w-2xl px-4 md:px-8 lg:pt-24 lg:px-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white">
          London&apos;s Finest Aesthetics and Wellness Clinic
        </h1>
        <p className="mt-4 text-base md:text-lg text-white">
          Unrivalled aesthetics clinic in London for Anti-Wrinkle Injections,
          Dermal Fillers, and Laser Treatments
        </p>
      </div>
    </section>
  );
};

export { Hero };
