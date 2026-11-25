"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import contentData from "@/data/content.json";
import { ContentData } from "@/data/type";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const data = contentData as unknown as ContentData;
  const footerData = data.Repzon.sections.Footer.variants.RepzonFooter1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0c0d0e] text-white pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={footerData.backgroundImage}
          alt="Repzon Gym Background"
          fill
          className="object-cover object-right md:object-center opacity-30 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/75" />
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="#home"
              className="inline-block relative w-60 sm:w-72 md:w-80 h-16 sm:h-20 mb-5"
            >
              <Image
                src={footerData.logo}
                alt={footerData.brandName || "Repzon"}
                fill
                className="object-contain object-left"
                priority={false}
              />
            </a>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-6 font-medium">
              {footerData.description}
            </p>

            <div className="flex items-center gap-3">
              {footerData.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#E99B12] text-[#E99B12] flex items-center justify-center hover:bg-[#E99B12] hover:text-black transition-all duration-300 shadow-sm"
                  aria-label={social.platform}
                >
                  {social.platform === "instagram" && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  )}
                  {social.platform === "facebook" && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                    </svg>
                  )}
                  {social.platform === "linkedin" && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  )}
                  {social.platform === "youtube" && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-52 bg-neutral-800" />
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg tracking-wide">
              {footerData.quickLinks.title}
            </h3>
            <div className="h-[2.5px] w-8 bg-[#E99B12] mt-2 mb-6"></div>

            <ul className="space-y-3">
              {footerData.quickLinks.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-neutral-300 hover:text-[#E99B12] transition-colors duration-200"
                  >
                    <span className="text-[#E99B12] font-black text-sm mr-2.5 transition-transform duration-200 group-hover:translate-x-1">
                      &gt;
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-52 bg-neutral-800" />
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg tracking-wide">
              {footerData.contactInfo.title}
            </h3>
            <div className="h-[2.5px] w-8 bg-[#E99B12] mt-2 mb-6"></div>

            <ul className="space-y-5">
              {footerData.contactInfo.items.map((item, idx) => (
                <li key={idx} className="group flex items-start gap-4">
                  {item.type === "location" && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(item.text.replace(/\s+/g, " "))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                      aria-label="View location on map"
                    >
                      <svg
                        className="w-5 h-5 text-[#E99B12] shrink-0 mt-0.5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </a>
                  )}
                  {item.type === "email" && (
                    <a
                      href={`mailto:${item.text}`}
                      className="hover:scale-110 transition-transform"
                      aria-label="Send email"
                    >
                      <svg
                        className="w-5 h-5 text-[#E99B12] shrink-0 fill-current mt-0.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  )}
                  {item.type === "phone" && (
                    <a
                      href={`tel:${item.text.replace(/[^+\d]/g, "")}`}
                      className="hover:scale-110 transition-transform"
                      aria-label="Call phone"
                    >
                      <svg
                        className="w-5 h-5 text-[#E99B12] shrink-0 fill-current mt-0.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.5 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-.99-1.11z" />
                      </svg>
                    </a>
                  )}
                  <div className="text-sm text-neutral-300 font-medium whitespace-pre-line leading-relaxed">
                    {item.type === "email" ? (
                      <a
                        href={`mailto:${item.text}`}
                        className="hover:text-[#E99B12] transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : item.type === "phone" ? (
                      <a
                        href={`tel:${item.text.replace(/[^+\d]/g, "")}`}
                        className="hover:text-[#E99B12] transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(item.text.replace(/\s+/g, " "))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#E99B12] transition-colors"
                      >
                        {item.text}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-[2.5px] bg-[#E99B12] mt-8 sm:mt-12 lg:mt-14 mb-5 sm:mb-6"></div>

        <div className="w-full">
          <p className="text-xs sm:text-sm font-medium text-neutral-400 text-center sm:text-left">
            <span>{footerData.bottomBar.copyright}</span>
            <span className="mx-2 text-neutral-600">|</span>
            <span>Powered by </span>
            <a
              href={footerData.bottomBar.poweredByUrl || "https://lestow.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E99B12] font-bold hover:underline transition-colors"
            >
              Lestow
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
