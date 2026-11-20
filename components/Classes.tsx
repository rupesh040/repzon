"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import contentData from "@/data/content.json";
import type { ClassesVariant, ClassItem } from "@/data/type";

interface ClassesProps {
  data?: ClassesVariant;
}

function RenderClassIcon({ type }: { type: string }) {
  if (type === "dumbbell") {
    return (
      <svg
        className="w-8 h-8 sm:w-9 sm:h-9 text-[#EAB308]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="10" y1="16" x2="22" y2="16" strokeWidth="3.2" />
        <rect x="7" y="9.5" width="3" height="13" rx="1" fill="currentColor" fillOpacity="0.2" />
        <rect x="2.5" y="11.5" width="3.5" height="9" rx="0.8" fill="currentColor" fillOpacity="0.2" />
        <rect x="22" y="9.5" width="3" height="13" rx="1" fill="currentColor" fillOpacity="0.2" />
        <rect x="26" y="11.5" width="3.5" height="9" rx="0.8" fill="currentColor" fillOpacity="0.2" />
      </svg>
    );
  }

  if (type === "running") {
    return (
      <svg
        className="w-8 h-8 sm:w-9 sm:h-9 text-[#EAB308]"
        viewBox="0 0 32 32"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      >
        <circle cx="21" cy="6.5" r="3" />
        <path d="M18.8 11.2c-.8-.5-1.8-.7-2.8-.4-1.2.3-2.1 1.2-2.5 2.4l-1.3 4.2 3.1 1.5.8-2.6 1.9 1.9v6.8h2.8v-7.8l-1.9-2.2.9-3.2 2.8 2.2 1.5-1.9-4.5-3.5-.5 2.6zM11.5 17.5l-3.2-1.6-1.1 2.2 3.7 1.9 2-3.8-1.4 1.3z" />
        <path d="M15.5 20.8l-3.2 5.2h-3v-2.2h1.6l2.3-3.8 2.3.8z" />
      </svg>
    );
  }

  if (type === "lotus") {
    return (
      <svg
        className="w-8 h-8 sm:w-9 sm:h-9 text-[#EAB308]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 7c-3.2 4.2-3.2 11 0 15 3.2-4 3.2-10.8 0-15z" />
        <path d="M16 22c-5.5 0-10-4.2-12-8.5 4.5-1 9 1.2 12 8.5z" />
        <path d="M16 22c5.5 0 10-4.2 12-8.5-4.5-1-9 1.2-12 8.5z" />
        <path d="M16 22c-7.5-1.2-13 1-15 3.2 4.5 2.2 11 1 15-3.2z" />
        <path d="M16 22c7.5-1.2 13 1 15 3.2-4.5 2.2-11 1-15-3.2z" />
      </svg>
    );
  }

  return (
    <svg
      className="w-8 h-8 sm:w-9 sm:h-9 text-[#EAB308]"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.5 9V5.5c0-1.2 1-2 2.2-2h4.6c1.2 0 2.2.8 2.2 2V9" />
      <path d="M9.5 13.5c-3 2.2-4.5 5.8-4.5 9.5 0 3.8 3 7 7 7h8c4 0 7-3.2 7-7 0-3.7-1.5-7.3-4.5-9.5l-2.2-4.5H11.7l-2.2 4.5z" />
    </svg>
  );
}

export default function Classes({ data }: ClassesProps) {
  const classesData: ClassesVariant =
    data || contentData.Repzon.sections.Classes.variants.RepzonClasses1;

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
      id="classes"
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
            {classesData.tagline}
          </span>
          <span className="h-[2px] w-8 sm:w-12 bg-[#EAB308] rounded-full" />
        </div>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight uppercase text-center mb-14 sm:mb-16 transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-black mr-3">{classesData.heading.line1}</span>
          <span className="text-[#EAB308]">{classesData.heading.highlight}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {classesData.items.map((item: ClassItem, index: number) => {
            const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];
            const currentDelay = delays[index % delays.length];

            return (
              <Link
                key={item.title}
                href={item.href || "#contact"}
                className={`group relative flex flex-col overflow-hidden bg-neutral-950 shadow-xl transition-all duration-700 ease-out ${currentDelay} transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="relative w-full aspect-square overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                </div>

                <div className="relative z-10 w-full bg-[#161616] border-b-[5px] border-[#EAB308] px-4 py-3.5 sm:py-4 flex items-center justify-between transition-colors duration-300 group-hover:bg-black">
                  <div className="flex items-center">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <RenderClassIcon type={item.icon} />
                    </div>

                    <div
                      className="h-7 w-[1.5px] bg-neutral-600 mx-3 sm:mx-3.5 shrink-0"
                      aria-hidden="true"
                    />

                    <div className="flex flex-col text-left">
                      <span className="text-white font-black text-xs sm:text-[13px] md:text-[14px] tracking-wider uppercase leading-tight">
                        {item.line1}
                      </span>
                      <span className="text-white font-black text-xs sm:text-[13px] md:text-[14px] tracking-wider uppercase leading-tight">
                        {item.line2}
                      </span>
                    </div>
                  </div>

                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#EAB308] shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
