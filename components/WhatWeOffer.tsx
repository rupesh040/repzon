"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import type { WhatWeOfferVariant, WhatWeOfferItem } from "@/data/type";

interface WhatWeOfferProps {
  data?: WhatWeOfferVariant;
}

export default function WhatWeOffer({ data }: WhatWeOfferProps) {
  const offerData: WhatWeOfferVariant =
    data || contentData.Repzon.sections.WhatWeOffer.variants.RepzonOffer1;

  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-100"
    >
      <div className="max-w-[1320px] mx-auto">
        <div
          className={`flex items-center justify-center gap-3 sm:gap-6 mb-2.5 sm:mb-3 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="h-[2px] w-9 sm:w-[88px] bg-gradient-to-r from-transparent to-[#E99B12]" />

          <span className="text-[12px] sm:text-[17px] font-extrabold tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#171717] whitespace-nowrap">
            {offerData.tagline}
          </span>

          <span className="h-[2px] w-9 sm:w-[88px] bg-gradient-to-l from-transparent to-[#E99B12]" />
        </div>

        <h2
          className={`text-center text-[clamp(1.08rem,4.45vw,2rem)] leading-[1.15] sm:text-[38px] md:text-[46px] lg:text-[58px] font-black italic uppercase tracking-[-0.035em] mb-6 sm:mb-10 lg:mb-12 transition-all duration-700 delay-100 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <span className="text-[#171717] mr-1.5 sm:mr-2">
            {offerData.heading.line1}
          </span>

          <span className="text-[#E99B12] whitespace-nowrap">
            {offerData.heading.highlight}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {offerData.items.map((item: WhatWeOfferItem, index: number) => (
            <div
              key={item.title}
              style={{ transitionDelay: `${180 + index * 130}ms` }}
              className={`relative flex flex-col items-center text-center px-5 sm:px-5 lg:px-6 pt-4 pb-6 sm:py-6 lg:py-0 transition-all duration-700 ease-out ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${
                index !== offerData.items.length - 1
                  ? "after:content-[''] after:absolute after:bottom-0 after:left-[12%] after:right-[12%] after:h-px after:bg-neutral-200 lg:after:bottom-auto lg:after:top-[52px] lg:after:left-auto lg:after:right-0 lg:after:h-[230px] lg:after:w-px lg:after:bg-gradient-to-b lg:after:from-transparent lg:after:via-neutral-300 lg:after:to-transparent"
                  : ""
              }`}
            >
              <div className="w-[116px] h-[104px] sm:w-[130px] sm:h-[110px] lg:w-[140px] lg:h-[118px] rounded-[23px] border-[2.5px] border-[#E99B12] flex items-center justify-center mb-4 sm:mb-4 lg:mb-[15px] p-2.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_18px_rgba(233,155,18,0.15)] bg-white">
                <Image
                  src={item.image || `/what-${index + 1}.webp`}
                  alt={item.title}
                  width={96}
                  height={96}
                  sizes="96px"
                  className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] lg:w-[92px] lg:h-[92px] object-contain"
                />
              </div>

              <h3 className="text-[20px] sm:text-[21px] lg:text-[27px] leading-tight font-bold tracking-[-0.04em] text-[#171717] whitespace-nowrap">
                {item.title}
              </h3>

              <span className="block w-[72px] h-[3px] bg-[#E99B12] mt-[17px] mb-[13px] rounded-full" />

              <p className="max-w-[310px] text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.58] font-normal text-[#292929]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
