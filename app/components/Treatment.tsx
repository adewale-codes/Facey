"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TILES = [
  { title: "Face", href: "/face", imgSrc: "/mega/1.webp" },
  { title: "Body", href: "/body", imgSrc: "/mega/2.webp" },
  { title: "Hair", href: "/hair", imgSrc: "/mega/3.webp" },
  { title: "Hands", href: "/skin", imgSrc: "/mega/4.webp" },
  { title: "Wellness", href: "/wellness", imgSrc: "/mega/5.jpg" },
  { title: "Concerns", href: "/concerns", imgSrc: "/mega/6.webp" },
];

export default function TreatmentSlider() {
  return (
    <div className="w-full md:p-2">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        loop
        speed={600}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        // navigation // uncomment if you want arrows
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="
          !pb-8
          [--swiper-theme-color:#C09A6B]
          [--swiper-pagination-bullet-inactive-color:rgba(192,154,107,0.35)]
          [--swiper-pagination-bullet-inactive-opacity:1]
          [--swiper-pagination-bullet-size:10px]
          [--swiper-pagination-bullet-horizontal-gap:6px]
        "
      >
        {TILES.map((t) => (
          <SwiperSlide key={t.href}>
            <Link
              href={t.href}
              className="group relative block h-96 overflow-hidden"
            >
              <Image
                src={t.imgSrc}
                alt={t.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
              <span className="absolute bottom-3 left-3 text-lg font-semibold text-white">
                {t.title}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
