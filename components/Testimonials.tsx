"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import type { TestimonialsVariant, TestimonialItem } from "@/data/type";

interface TestimonialsProps {
  data?: TestimonialsVariant;
}

function TestimonialArrowButton({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className: string;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous testimonial" : "Next testimonial"}
      className={className}
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            isPrev
              ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          }
        />
      </svg>
    </button>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonialsData: TestimonialsVariant =
    data || contentData.Repzon.sections.Testimonials.variants.RepzonTestimonials1;

  const items: TestimonialItem[] = testimonialsData.items;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const visible = isLoaded && isInView;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full overflow-hidden bg-black text-white select-none border-b border-neutral-900 scroll-mt-[84px]"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={testimonialsData.backgroundImage}
          alt="Repzon Member Testimonial Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right] lg:object-right-top brightness-[0.80]"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/85 md:via-black/75 to-transparent w-full md:w-4/5 lg:w-3/5 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20">
        <div
          className={`flex items-center space-x-3 mb-2 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="h-[2px] w-8 sm:w-12 bg-[#EAB308] rounded-full" />
          <span className="text-white text-xs sm:text-sm font-bold tracking-[0.25em] uppercase">
            {testimonialsData.tagline}
          </span>
          <span className="h-[2px] w-8 sm:w-12 bg-[#EAB308] rounded-full" />
        </div>

        <h2
          className={`text-[clamp(1.22rem,5.3vw,2rem)] sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight uppercase leading-tight mb-6 sm:mb-8 lg:mb-10 transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-white mr-2 sm:mr-3">
            {testimonialsData.heading.line1}
          </span>
          <span className="text-[#EAB308] whitespace-nowrap">
            {testimonialsData.heading.highlight}
          </span>
        </h2>

        <div
          className={`relative max-w-3xl transition-all duration-700 ease-out delay-300 transform ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-5">
            <TestimonialArrowButton
              direction="prev"
              onClick={handlePrev}
              className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 bg-white text-black hover:bg-[#EAB308] hover:text-black items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer shrink-0"
            />

            <div className="flex-1 bg-[#0c0d0e]/85 backdrop-blur-md border border-neutral-800/90 shadow-2xl p-6 sm:p-9 lg:p-11">
              <div className="grid grid-cols-1">
                {items.map((item, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={item.name}
                      aria-hidden={!isActive}
                      className={`col-start-1 row-start-1 w-full flex flex-col justify-between transition-all duration-500 ease-out ${
                        isActive
                          ? "opacity-100 translate-y-0 z-20"
                          : "opacity-0 -translate-y-4 pointer-events-none z-0"
                      }`}
                    >
                      <div>
                        <div className="text-[#EAB308] mb-3 sm:mb-4">
                          <svg
                            className="w-9 h-9 sm:w-11 sm:h-11 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        <p className="text-white/95 italic text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal mb-6 sm:mb-7">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      <div>
                        <span className="block h-[2.5px] w-14 bg-[#EAB308] rounded-full mb-5 sm:mb-6" />

                        <div className="flex items-center space-x-4">
                          <div className="relative w-14 h-14 sm:w-18 sm:h-18 border-2 border-white/90 overflow-hidden shrink-0 bg-neutral-900">
                            <Image
                              src={item.avatar}
                              alt={item.name}
                              fill
                              sizes="72px"
                              className="object-cover object-center"
                            />
                          </div>

                          <div className="flex flex-col">
                            <h3 className="text-white font-black text-base sm:text-lg tracking-wide uppercase">
                              {item.name}
                            </h3>
                            <p className="text-neutral-300 text-xs sm:text-sm font-medium mt-0.5 mb-1.5">
                              {item.role}
                            </p>
                            <div className="text-[#EAB308] flex items-center space-x-1 text-sm sm:text-base">
                              {Array.from({ length: item.rating }).map(
                                (_, rIndex) => (
                                  <span key={rIndex}>★</span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <TestimonialArrowButton
              direction="next"
              onClick={handleNext}
              className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 bg-white text-black hover:bg-[#EAB308] hover:text-black items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer shrink-0"
            />
          </div>

          <div className="flex sm:hidden items-center justify-end gap-3 mt-4">
            <TestimonialArrowButton
              direction="prev"
              onClick={handlePrev}
              className="w-10 h-10 bg-white text-black hover:bg-[#EAB308] hover:text-black flex items-center justify-center shadow-lg cursor-pointer"
            />
            <TestimonialArrowButton
              direction="next"
              onClick={handleNext}
              className="w-10 h-10 bg-white text-black hover:bg-[#EAB308] hover:text-black flex items-center justify-center shadow-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
