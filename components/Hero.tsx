
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import type { BannerVariant, HeroSlide } from "@/data/type";

interface HeroProps {
  data?: BannerVariant;
}

export default function Hero({ data }: HeroProps) {
  const heroData: BannerVariant =
    data || contentData.Repzon.sections.Banner.variants.RepzonBanner1;

  const slides: HeroSlide[] =
    heroData.slides && heroData.slides.length > 0
      ? heroData.slides
      : [
          {
            tagline: heroData.tagline,
            line1: heroData.heading.line1,
            line2: heroData.heading.line2,
            image: heroData.backgroundImage,
          },
        ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="home"
      className="relative isolate w-full aspect-[16/9] sm:aspect-auto sm:h-[82svh] sm:min-h-[620px] sm:max-h-[880px] overflow-hidden bg-[#080808] text-white select-none scroll-mt-[84px]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              index === currentSlideIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image || heroData.backgroundImage || "/hero.webp"}
              alt={`Repzon Fitness Slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-[68%_center] sm:object-[60%_center] lg:object-center transition-transform duration-[8000ms] ease-out motion-reduce:transition-none ${
                index === currentSlideIndex
                  ? "scale-100"
                  : "scale-[1.12]"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/85 via-[38%] to-transparent max-sm:bg-gradient-to-r max-sm:from-black/85 max-sm:via-black/50 max-sm:to-transparent pointer-events-none" />

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

      <div
        className="hidden sm:block absolute -top-16 -left-10 z-[2] pointer-events-none select-none text-[420px] lg:text-[560px] font-black leading-none text-transparent opacity-[0.12]"
        style={{ WebkitTextStroke: "2px #D99B16" }}
        aria-hidden="true"
      >
        R
      </div>

      <div
        className={`absolute top-0 right-5 sm:right-10 lg:right-14 z-20 flex gap-1.5 sm:gap-3 transition-all duration-1000 ${
          isLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-12"
        }`}
        aria-hidden="true"
      >
        <span className="w-4 sm:w-8 lg:w-10 h-6 sm:h-16 lg:h-20 bg-gradient-to-b from-[#FFD04A] to-[#B77908] -skew-x-[25deg]" />
        <span className="w-4 sm:w-8 lg:w-10 h-6 sm:h-16 lg:h-20 bg-gradient-to-b from-[#FFD04A] to-[#B77908] -skew-x-[25deg]" />
      </div>

      <div
        className={`absolute bottom-0 left-0 z-20 flex gap-1.5 sm:gap-2 transition-all duration-1000 ${
          isLoaded
            ? "opacity-70 translate-x-0"
            : "opacity-0 -translate-x-10"
        }`}
        aria-hidden="true"
      >
        <span className="w-5 sm:w-10 lg:w-12 h-8 sm:h-24 lg:h-28 bg-gradient-to-b from-[#F5B51B] to-[#8C6009] -skew-x-[25deg] -translate-x-4" />
        <span className="w-5 sm:w-10 lg:w-12 h-8 sm:h-24 lg:h-28 bg-gradient-to-b from-[#F5B51B] to-[#8C6009] -skew-x-[25deg] -translate-x-4" />
      </div>

      <div className="relative z-10 h-full w-full max-w-[1600px] mx-auto flex items-center px-4 sm:px-8 lg:px-12 xl:px-12">
        <div className="relative w-full max-w-[800px] pb-7 sm:pb-12">
          {slides.map((slide, index) => {
            const isActive = index === currentSlideIndex;

            return (
              <div
                key={index}
                aria-hidden={!isActive}
                className={`w-full ${
                  isActive
                    ? "relative"
                    : "absolute inset-0 opacity-0 pointer-events-none"
                }`}
              >
                {isActive && (
                  <>
                    <div
                      key={`tagline-${index}`}
                      className={`flex items-center gap-2 sm:gap-4 mb-2 sm:mb-6 lg:mb-7 ${
                        isLoaded ? "hero-tagline" : "opacity-0"
                      }`}
                    >
                      <span className="text-white text-[9px] sm:text-sm lg:text-xl font-semibold tracking-wide">
                        {slide.tagline}
                      </span>

                      <span className="w-7 sm:w-16 lg:w-20 h-[2px] bg-gradient-to-r from-[#F5B51B] to-transparent" />
                    </div>

                    <h1
                      key={`heading-${index}`}
                      className={`uppercase font-black tracking-[-0.045em] leading-[1.02] sm:leading-[0.98] ${
                        isLoaded ? "hero-heading" : "opacity-0"
                      }`}
                    >
                      <span className="block text-white text-[clamp(1.1rem,5.2vw,2rem)] sm:text-[clamp(2.1rem,5.1vw,5.1rem)]">
                        {slide.line1}
                      </span>

                      <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFD044] via-[#E9AA19] to-[#BD810B] text-[clamp(1.1rem,5.2vw,2rem)] sm:text-[clamp(2.1rem,5.1vw,5.1rem)] mt-1 sm:mt-2.5">
                        {slide.line2}
                      </span>
                    </h1>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`absolute bottom-3 right-3 sm:bottom-8 sm:right-10 z-30 flex items-center gap-2 sm:gap-3 transition-all duration-700 ${
          isLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-8 h-8 sm:w-12 sm:h-12 bg-white text-black hover:bg-[#EAB308] hover:text-black flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="w-8 h-8 sm:w-12 sm:h-12 bg-white text-black hover:bg-[#EAB308] hover:text-black flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      <style jsx global>{`
        @keyframes heroTaglineIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroHeadingIn {
          from {
            opacity: 0;
            transform: translateY(35px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .hero-tagline {
          animation: heroTaglineIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-heading {
          animation: heroHeadingIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }

        @media (max-width: 640px) {
          .hero-heading {
            line-height: 1.05;
            letter-spacing: -0.04em;
            overflow-wrap: anywhere;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-tagline,
          .hero-heading {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
}
