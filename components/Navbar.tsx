"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import contentData from "@/data/content.json";
import type { HeaderVariant } from "@/data/type";

interface NavbarProps {
  data?: HeaderVariant;
}

export default function Navbar({ data }: NavbarProps) {
  const headerData: HeaderVariant =
    data || contentData.Repzon.sections.Header.variants.RepzonHeader1;

  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("Home");

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 60) {
        const lastLink = headerData.links[headerData.links.length - 1];
        if (lastLink) {
          setActiveItem(lastLink.name);
          return;
        }
      }

      if (scrollY < 100) {
        const firstLink = headerData.links[0];
        if (firstLink) {
          setActiveItem(firstLink.name);
          return;
        }
      }

      const offset = 180;
      const currentPos = scrollY + offset;

      for (let i = headerData.links.length - 1; i >= 0; i--) {
        const link = headerData.links[i];
        const targetId = link.href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (currentPos >= top && currentPos < top + height) {
            setActiveItem(link.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerData.links]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-neutral-900/80 transition-all duration-700 ease-out transform ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[82px] sm:h-[88px]">
          <div className="flex items-center">
            <Link
              href="#home"
              className="flex items-center shrink-0 group focus:outline-none"
              aria-label={headerData.brandName || "Repzon Gym & Fitness"}
            >
              <Image
                src={headerData.logo}
                alt={headerData.brandName || "Repzon Gym & Fitness Logo"}
                width={260}
                height={78}
                priority
                className="h-14 sm:h-16 lg:h-[68px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>

            <div
              className="hidden md:block h-10 w-[1.5px] bg-neutral-700/60 ml-5 lg:ml-7 mr-2"
              aria-hidden="true"
            />
          </div>

          <nav
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
            aria-label="Main Navigation"
          >
            {headerData.links.map((link) => {
              const isActive =
                activeItem.toLowerCase() === link.name.toLowerCase();
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[15px] lg:text-[16px] font-semibold tracking-wide transition-colors duration-200 py-1.5 focus:outline-none ${
                    isActive
                      ? "text-[#EAB308]"
                      : "text-white hover:text-[#EAB308]"
                  }`}
                >
                  <span>{link.name}</span>

                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#EAB308] rounded-full transition-all duration-300"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6 text-[#EAB308]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 border-t border-neutral-900/90 px-4 pt-3 pb-6 space-y-2 shadow-2xl transition-all duration-200">
          {headerData.links.map((link) => {
            const isActive =
              activeItem.toLowerCase() === link.name.toLowerCase();
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-[#EAB308] bg-neutral-900/70 border-l-4 border-[#EAB308] pl-3"
                    : "text-neutral-200 hover:text-white hover:bg-neutral-900/40"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
