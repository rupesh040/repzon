"use client";

import { useEffect, useRef, useState } from "react";
import contentData from "@/data/content.json";
import { ContentData } from "@/data/type";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function getContactHref(icon: string, detail: string): {
  href: string;
  external: boolean;
  label: string;
} {
  if (icon === "phone") {
    return {
      href: `tel:${detail.replace(/[^+\d]/g, "")}`,
      external: false,
      label: "Call phone",
    };
  }
  if (icon === "mail") {
    return {
      href: `mailto:${detail}`,
      external: false,
      label: "Send email",
    };
  }
  return {
    href: `https://maps.google.com/?q=${encodeURIComponent(detail)}`,
    external: true,
    label: "View location on map",
  };
}

function RenderContactInfoIcon({ icon }: { icon: string }) {
  if (icon === "phone") {
    return (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    );
  }
  if (icon === "mail") {
    return (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }
  return (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactFormState>(INITIAL_FORM);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const data = contentData as unknown as ContentData;
  const contactData = data.Repzon.sections.Contact.variants.RepzonContact1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error" || status === "success") {
      setStatus("idle");
      setFeedbackMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
      setStatus("error");
      setFeedbackMessage("Please fill in your name, email, subject, and message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      setStatus("error");
      setFeedbackMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmed),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedbackMessage(
          result?.error || "Unable to send your message. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        result?.message ||
          "Thank you! Your message has been sent. We'll get back to you shortly."
      );
      setFormData(INITIAL_FORM);
    } catch {
      setStatus("error");
      setFeedbackMessage(
        "Something went wrong while sending your message. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-white text-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-[84px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          <div
            className={`lg:col-span-5 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-black font-extrabold uppercase tracking-widest text-xs sm:text-sm">
                {contactData.tagline}
              </span>
              <div className="h-[2px] w-12 bg-[#E99B12]"></div>
            </div>

            <h2 className="text-[clamp(1.65rem,7.2vw,2.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight uppercase leading-[1.05] mt-3 sm:mt-4 whitespace-nowrap">
              <span className="text-[#1c1c1c]">{contactData.heading.line1} </span>
              <span className="text-[#E99B12]">{contactData.heading.highlight}</span>
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md mt-4 sm:mt-5 mb-6 sm:mb-7 font-medium">
              {contactData.description}
            </p>

            <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
              {contactData.items.map((item, idx) => {
                const { href, external, label } = getContactHref(
                  item.icon,
                  item.detail
                );

                return (
                  <div key={idx} className="group flex items-center gap-4">
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="w-12 h-12 rounded-xl bg-[#1c1c1c] group-hover:bg-[#E99B12] hover:bg-[#E99B12] flex items-center justify-center text-white shrink-0 shadow-sm transition-colors"
                      aria-label={label}
                    >
                      <RenderContactInfoIcon icon={item.icon} />
                    </a>

                    <div className="h-9 w-[1.5px] bg-neutral-300"></div>

                    <div>
                      <h4 className="text-base font-bold text-[#1c1c1c] leading-tight">
                        {item.title}
                      </h4>
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="text-xs sm:text-sm text-neutral-600 group-hover:text-[#E99B12] hover:text-[#E99B12] font-medium mt-0.5 block transition-colors"
                      >
                        {item.detail}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {contactData.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1c1c1c] text-white flex items-center justify-center hover:bg-[#E99B12] hover:scale-105 transition-all duration-300 shadow-sm"
                  aria-label={social.platform}
                >
                  {social.platform === "instagram" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  )}
                  {social.platform === "facebook" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                    </svg>
                  )}
                  {social.platform === "linkedin" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  )}
                  {social.platform === "youtube" && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div
            className={`lg:col-span-7 p-3.5 sm:p-4 transition-all duration-700 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <div className="absolute -top-3.5 -left-3.5 w-14 h-14 sm:w-16 sm:h-16 border-t-[8px] border-l-[8px] border-[#E99B12] pointer-events-none z-0" />
              <div className="absolute -bottom-3.5 -right-3.5 w-14 h-14 sm:w-16 sm:h-16 border-b-[8px] border-r-[8px] border-[#E99B12] pointer-events-none z-0" />

              <div className="relative z-10 bg-white border border-neutral-200/90 rounded-xl p-5 sm:p-8 lg:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={contactData.form.namePlaceholder}
                        className="w-full bg-[#f6f6f8] border border-neutral-200/80 rounded-lg pl-12 pr-4 py-3.5 text-sm font-medium text-black placeholder-neutral-500 focus:bg-white focus:border-[#E99B12] focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={contactData.form.emailPlaceholder}
                        className="w-full bg-[#f6f6f8] border border-neutral-200/80 rounded-lg pl-12 pr-4 py-3.5 text-sm font-medium text-black placeholder-neutral-500 focus:bg-white focus:border-[#E99B12] focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={contactData.form.phonePlaceholder}
                        className="w-full bg-[#f6f6f8] border border-neutral-200/80 rounded-lg pl-12 pr-4 py-3.5 text-sm font-medium text-black placeholder-neutral-500 focus:bg-white focus:border-[#E99B12] focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={contactData.form.subjectPlaceholder}
                        className="w-full bg-[#f6f6f8] border border-neutral-200/80 rounded-lg pl-12 pr-4 py-3.5 text-sm font-medium text-black placeholder-neutral-500 focus:bg-white focus:border-[#E99B12] focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-4 text-neutral-500 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </span>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={contactData.form.messagePlaceholder}
                      className="w-full bg-[#f6f6f8] border border-neutral-200/80 rounded-lg pl-12 pr-4 py-3.5 text-sm font-medium text-black placeholder-neutral-500 focus:bg-white focus:border-[#E99B12] focus:outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {feedbackMessage && (
                    <div
                      role="status"
                      aria-live="polite"
                      className={`rounded-lg px-4 py-3 text-sm font-medium border ${
                        status === "success"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}
                    >
                      {feedbackMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full group bg-[#E99B12] hover:bg-[#d68a0a] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-white font-extrabold uppercase tracking-widest py-4 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span>
                      {status === "submitting"
                        ? "SENDING..."
                        : contactData.form.buttonText}
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
