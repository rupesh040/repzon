"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import type { TrainersVariant, TrainerItem } from "@/data/type";

interface TrainersProps {
  data?: TrainersVariant;
}

function RenderSocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") {
    return (
      <svg
        className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg
        className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  return (
    <svg
      className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  );
}

export default function Trainers({ data }: TrainersProps) {
  const trainersData: TrainersVariant =
    data || contentData.Repzon.sections.Trainers.variants.RepzonTrainers1;

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
      id="trainers"
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
            {trainersData.tagline}
          </span>
          <span className="h-[2px] w-8 sm:w-12 bg-[#EAB308] rounded-full" />
        </div>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight uppercase text-center mb-14 sm:mb-16 transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-black mr-3">{trainersData.heading.line1}</span>
          <span className="text-[#EAB308]">{trainersData.heading.highlight}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {trainersData.items.map((trainer: TrainerItem, index: number) => {
            const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];
            const currentDelay = delays[index % delays.length];

            return (
              <div
                key={trainer.name}
                className={`relative group flex flex-col bg-white shadow-lg border border-neutral-100 transition-all duration-700 ease-out ${currentDelay} transform hover:-translate-y-2 hover:shadow-2xl ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className="absolute -bottom-2 -right-2 w-9 h-9 border-b-4 border-r-4 border-[#EAB308] z-0 pointer-events-none transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />

                <div className="relative w-full aspect-square overflow-hidden bg-neutral-900 z-10">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="relative z-10 bg-white pt-5 pb-6 px-4 flex flex-col items-center text-center">
                  <h3 className="text-lg sm:text-xl font-black text-black tracking-tight mb-1">
                    {trainer.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-bold text-[#EAB308] tracking-wide mb-2.5">
                    {trainer.role}
                  </p>

                  <span className="h-[2px] w-8 bg-[#EAB308] mx-auto mb-4 rounded-full transition-all duration-300 group-hover:w-12" />

                  <div className="flex items-center justify-center space-x-3.5 text-black">
                    {trainer.socials && trainer.socials.length > 0 ? (
                      trainer.socials.map((social, sIndex) => (
                        <React.Fragment key={social.platform}>
                          {sIndex > 0 && (
                            <span
                              className="h-3.5 w-[1px] bg-neutral-300"
                              aria-hidden="true"
                            />
                          )}
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:text-[#EAB308] transition-colors p-1"
                            aria-label={`${trainer.name} ${social.platform}`}
                          >
                            <RenderSocialIcon platform={social.platform} />
                          </a>
                        </React.Fragment>
                      ))
                    ) : (
                      <>
                        <a
                          href="#"
                          className="text-black hover:text-[#EAB308] transition-colors p-1"
                          aria-label={`${trainer.name} Instagram`}
                        >
                          <RenderSocialIcon platform="instagram" />
                        </a>
                        <span
                          className="h-3.5 w-[1px] bg-neutral-300"
                          aria-hidden="true"
                        />
                        <a
                          href="#"
                          className="text-black hover:text-[#EAB308] transition-colors p-1"
                          aria-label={`${trainer.name} Facebook`}
                        >
                          <RenderSocialIcon platform="facebook" />
                        </a>
                        <span
                          className="h-3.5 w-[1px] bg-neutral-300"
                          aria-hidden="true"
                        />
                        <a
                          href="#"
                          className="text-black hover:text-[#EAB308] transition-colors p-1"
                          aria-label={`${trainer.name} LinkedIn`}
                        >
                          <RenderSocialIcon platform="linkedin" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
