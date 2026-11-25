"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import type { AboutVariant } from "@/data/type";

interface AboutProps {
  data?: AboutVariant;
}

function RenderAboutIcon({ type }: { type: string }) {
  if (type === "trainers") {
    return (
      <svg
        className="w-13 h-13 sm:w-16 sm:h-16 text-[#EAB308]"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="18" r="6.5" />
        <path d="M22 44c0-5.5 4.5-10 10-10s10 4.5 10 10" />
        <circle cx="16" cy="24" r="5.5" />
        <path d="M7 46c0-4.5 3.5-8 8-8 2 0 3.8.7 5.2 2" />
        <circle cx="48" cy="24" r="5.5" />
        <path d="M43.8 40c1.4-1.3 3.2-2 5.2-2 4.5 0 8 3.5 8 8" />
      </svg>
    );
  }

  if (type === "equipment") {
    return (
      <svg
        className="w-13 h-13 sm:w-16 sm:h-16 text-[#EAB308]"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="20" y1="32" x2="44" y2="32" strokeWidth="3.5" />
        <rect x="14" y="21" width="6" height="22" rx="2" />
        <rect x="7" y="25" width="5" height="14" rx="1.5" />
        <rect x="44" y="21" width="6" height="22" rx="2" />
        <rect x="52" y="25" width="5" height="14" rx="1.5" />
      </svg>
    );
  }

  return (
    <svg
      className="w-13 h-13 sm:w-16 sm:h-16 text-[#EAB308]"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 54S10 42 10 24a12 12 0 0 1 22-7.2A12 12 0 0 1 54 24c0 18-22 30-22 30z" />
      <path d="M12 32h11l3.5-7 5.5 14 4-8h16" strokeWidth="2.5" />
    </svg>
  );
}

export default function About({ data }: AboutProps) {
  const aboutData: AboutVariant =
    data || contentData.Repzon.sections.About.variants.RepzonAbout1;

  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const visible = isLoaded && isInView;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-white text-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-neutral-100 scroll-mt-[84px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div
            className={`lg:col-span-5 relative w-full max-w-[380px] sm:max-w-md lg:max-w-none mx-auto pt-3.5 pl-3.5 pr-8 pb-10 sm:pt-5 sm:pl-5 sm:pr-10 sm:pb-12 transition-all duration-700 ease-out transform ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative w-full">
              <div
                className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 w-20 h-20 sm:w-28 sm:h-28 border-t-[10px] border-l-[10px] sm:border-t-[12px] sm:border-l-[12px] border-[#EAB308] z-0 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 w-full aspect-square sm:aspect-[4/5] lg:h-[460px] overflow-hidden shadow-2xl bg-neutral-900 group">
                <Image
                  src={aboutData.mainImage}
                  alt="Repzon Fitness Trainer"
                  fill
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div
                className={`absolute -bottom-6 -right-5 sm:-bottom-8 sm:-right-6 w-[48%] max-w-[190px] sm:max-w-none sm:w-60 lg:w-64 aspect-[4/3] z-20 overflow-hidden border-4 border-white shadow-2xl bg-neutral-900 group transition-all duration-700 ease-out delay-300 transform ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Image
                  src={aboutData.secondaryImage}
                  alt="Repzon Gym Equipment Facility"
                  fill
                  sizes="(max-width: 768px) 180px, 260px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div
                className="absolute -bottom-9 -right-8 sm:-bottom-11 sm:-right-9 w-14 h-14 sm:w-20 sm:h-20 border-b-[10px] border-r-[10px] sm:border-b-[12px] sm:border-r-[12px] border-[#EAB308] z-10 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          <div
            className={`lg:col-span-7 flex flex-col justify-center transition-all duration-700 ease-out delay-150 transform ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <span className="text-black text-xs sm:text-base font-extrabold tracking-[0.25em] uppercase">
                {aboutData.tagline}
              </span>
              <span className="h-[2.5px] w-12 sm:w-16 bg-[#EAB308] inline-block rounded-full" />
            </div>

            <h2 className="text-[clamp(1.35rem,5.7vw,2.5rem)] md:text-[clamp(2.25rem,3.6vw,3.35rem)] font-black italic tracking-tight uppercase leading-[1.04] mb-4 sm:mb-6">
              <span className="block whitespace-nowrap text-black">
                {aboutData.heading.line1}
              </span>
              <span className="block whitespace-nowrap text-[#EAB308] mt-1 sm:mt-2">
                {aboutData.heading.line2}
              </span>
            </h2>

            <p className="text-neutral-600 text-sm sm:text-lg lg:text-[19px] leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
              {aboutData.description}
            </p>

            <div className="grid grid-cols-3 divide-x divide-neutral-200 border-t border-neutral-100 pt-6 sm:pt-8 max-w-2xl">
              {aboutData.features.map((feature, index) => {
                const delays = ["delay-300", "delay-450", "delay-600"];
                const currentDelay = delays[index % delays.length];

                return (
                  <div
                    key={feature.title}
                    className={`flex flex-col items-center text-center px-2 sm:px-5 group cursor-default transition-all duration-700 ease-out ${currentDelay} transform ${
                      visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    <div className="text-[#EAB308] mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110">
                      <RenderAboutIcon type={feature.icon} />
                    </div>
                    <span className="text-sm sm:text-lg lg:text-xl font-bold text-black tracking-tight leading-snug">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
