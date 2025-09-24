"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroProps } from "@/types/hero";

export default function Hero({ heroData, settings }: HeroProps) {
  const {
    auto_slide_hero: autoSlide = false,
    primary_color: priColor = "#EF4444",
    secondary_color: secColor = "#111827",
    third_color: thiColor = "#374151",
    button_1_color: btn1Color = "#EF4444",
    button_2_color: btn2Color = "#DC2626",
    bt_1_color: bt1Color = "#FFFFFF",
    bt_2_color: bt2Color = "#FFFFFF",
    currency = "₹"
  } = settings;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoSlide || heroData.length === 0) return;

    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 100);

    const slideTimer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroData.length);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [current, heroData, autoSlide]);

  if (heroData.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroData.map((slide, index) => (
          <div
            key={index}
            className="relative min-w-full h-[450px] overflow-hidden"
          >
            {/* Image container with padding */}
            <div className="absolute inset-0 px-2 py-2 md:px-2 lg:px-2">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={
                    slide.hero_image.startsWith("http")
                      ? slide.hero_image
                      : `${process.env.DOMAIN}${slide.hero_image}`
                  }
                  alt={slide.image_alt}
                  fill
                  loading="lazy"
                  className="object-cover object-top-right"
                />

                {/* Banner Content */}
                <div className="absolute bottom-6 left-6 bg-white/80 p-5 rounded-lg w-full md:w-1/2">
                  {/* Semi heading with priColor */}
                  <p 
                    className="text-sm font-medium tracking-widest mb-2"
                    style={{ color: priColor }}
                  >
                    {slide.hero_subtitle}
                  </p>
                  
                  {/* Heading with secColor */}
                  <h2 
                    className="text-2xl md:text-4xl font-bold leading-tight mb-2"
                    style={{ color: secColor }}
                  >
                    {slide.hero_title}
                  </h2>
                  
                  {/* Price with textColor and dynamic currency */}
                  <p className="hidden md:block mb-2">
                    <span style={{ color: secColor }}>
                      {slide.price_text}{" "}
                      <b style={{ color: thiColor }}>
                        {currency} {slide.price}
                      </b>
                    </span>
                  </p>
                  
                  {/* Button with hover effects */}
                  <a
                    href={
                      slide.hero_url.startsWith("http")
                        ? slide.hero_url
                        : `${process.env.DOMAIN}${slide.hero_url}`
                    }
                    className="inline-block text-sm font-semibold px-4 py-2 rounded-md transition"
                    style={{
                      backgroundColor: isHovered ? btn2Color : btn1Color,
                      color: isHovered ? bt2Color : bt1Color
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {slide.button_text || "Shop now"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Dots (clickable) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="relative flex items-center justify-center focus:outline-none"
          >
            {current === index ? (
              <div className="w-8 h-1 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}