"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import type { FAQVariant } from "@/data/type";

interface FAQProps {
  data?: FAQVariant;
}

export default function FAQ({ data }: FAQProps) {
  const faqData: FAQVariant =
    data || contentData.Repzon.sections.FAQ.variants.RepzonFAQ1;

  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const visible = isLoaded && isInView;

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="w-full bg-white text-black py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-100 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-center space-x-3 mb-2.5 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="h-[2px] w-8 sm:w-12 bg-[#EAB308] rounded-full" />
          <span className="text-black text-xs sm:text-sm font-bold tracking-[0.25em] uppercase">
            {faqData.tagline}
          </span>
          <span className="h-[2px] w-8 sm:w-12 bg-[#EAB308] rounded-full" />
        </div>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight uppercase text-center mb-14 sm:mb-16 transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-black mr-3">{faqData.heading.line1}</span>
          <span className="text-[#EAB308]">{faqData.heading.highlight}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            className={`lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none transition-all duration-700 ease-out transform ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div
              className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 w-24 h-24 sm:w-32 sm:h-32 border-t-[12px] border-l-[12px] border-[#EAB308] z-0 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 w-full aspect-[4/5] sm:h-[480px] lg:h-[500px] overflow-hidden shadow-2xl bg-neutral-900 group">
              <Image
                src={faqData.image}
                alt="Repzon Member FAQ"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div
              className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-20 h-20 sm:w-24 sm:h-24 border-b-[12px] border-r-[12px] border-[#EAB308] z-0 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            {faqData.items.map((item, index) => {
              const isOpen = openIndex === index;
              const delays = ["delay-200", "delay-300", "delay-400", "delay-500", "delay-600"];
              const currentDelay = delays[index % delays.length];

              return (
                <div
                  key={item.question}
                  className={`overflow-hidden transition-all duration-700 ease-out ${currentDelay} transform ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className={`w-full border-l-[5px] border-[#EAB308] px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between cursor-pointer select-none transition-all duration-200 focus:outline-none ${
                      isOpen
                        ? "bg-[#181818] text-white rounded-t-lg shadow-md"
                        : "bg-[#f8f8f8] hover:bg-[#f2f2f2] text-black rounded-lg shadow-xs border-r border-t border-b border-neutral-200/60"
                    }`}
                  >
                    <span className="text-sm sm:text-base font-extrabold tracking-wide text-left pr-4">
                      {item.question}
                    </span>

                    <span className="shrink-0 flex items-center justify-center">
                      {isOpen ? (
                        <svg
                          className="w-5 h-5 text-white stroke-[2.8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-black stroke-[2.8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="bg-white border-x border-b border-neutral-200/90 rounded-b-lg p-5 sm:p-6 text-neutral-600 text-sm sm:text-[15px] leading-relaxed shadow-xs transition-all duration-300 animate-fadeIn">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
