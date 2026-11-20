export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
}

export interface HeaderContact {
  phone: string;
  email: string;
  tagline?: string;
  description?: string;
}

export interface HeaderVariant {
  logo: string;
  brandName?: string;
  links: NavLink[];
  button?: string;
  contact?: HeaderContact;
}

export interface HeaderSection {
  variants: {
    [variantKey: string]: HeaderVariant;
  };
}

export interface HeroSlide {
  tagline: string;
  line1: string;
  line2: string;
  image?: string;
}

export interface BannerVariant {
  tagline: string;
  heading: {
    line1: string;
    line2: string;
  };
  backgroundImage: string;
  slides?: HeroSlide[];
}

export interface BannerSection {
  variants: {
    [variantKey: string]: BannerVariant;
  };
}

export interface WhatWeOfferItem {
  icon?: string;
  image?: string;
  title: string;
  description: string;
}

export interface WhatWeOfferVariant {
  tagline: string;
  heading: {
    line1: string;
    highlight: string;
  };
  items: WhatWeOfferItem[];
}

export interface WhatWeOfferSection {
  variants: {
    [variantKey: string]: WhatWeOfferVariant;
  };
}

export interface AboutFeature {
  icon: string;
  title: string;
}

export interface AboutVariant {
  tagline: string;
  heading: {
    line1: string;
    line2: string;
  };
  description: string;
  mainImage: string;
  secondaryImage: string;
  features: AboutFeature[];
}

export interface AboutSection {
  variants: {
    [variantKey: string]: AboutVariant;
  };
}

export interface ClassItem {
  title: string;
  line1: string;
  line2: string;
  icon: string;
  image: string;
  href?: string;
}

export interface ClassesVariant {
  tagline: string;
  heading: {
    line1: string;
    highlight: string;
  };
  items: ClassItem[];
}

export interface ClassesSection {
  variants: {
    [variantKey: string]: ClassesVariant;
  };
}

export interface TrainerSocial {
  platform: string;
  href: string;
}

export interface TrainerItem {
  name: string;
  role: string;
  image: string;
  href?: string;
  socials?: TrainerSocial[];
}

export interface TrainersVariant {
  tagline: string;
  heading: {
    line1: string;
    highlight: string;
  };
  items: TrainerItem[];
}

export interface TrainersSection {
  variants: {
    [variantKey: string]: TrainersVariant;
  };
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface TestimonialsVariant {
  tagline: string;
  heading: {
    line1: string;
    highlight: string;
  };
  backgroundImage: string;
  items: TestimonialItem[];
}

export interface TestimonialsSection {
  variants: {
    [variantKey: string]: TestimonialsVariant;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQVariant {
  tagline: string;
  heading: {
    line1: string;
    highlight: string;
  };
  image: string;
  items: FAQItem[];
}

export interface FAQSection {
  variants: {
    [variantKey: string]: FAQVariant;
  };
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  detail: string;
}

export interface ContactSocial {
  platform: string;
  href: string;
}

export interface ContactVariant {
  tagline: string;
  heading: {
    line1: string;
    highlight: string;
  };
  description: string;
  items: ContactInfoItem[];
  socials: ContactSocial[];
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    buttonText: string;
  };
}

export interface ContactSection {
  variants: {
    [variantKey: string]: ContactVariant;
  };
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterContactItem {
  type: string;
  text: string;
}

export interface FooterVariant {
  logo: string;
  brandName?: string;
  description: string;
  backgroundImage: string;
  socials: { platform: string; href: string }[];
  quickLinks: {
    title: string;
    links: FooterLink[];
  };
  contactInfo: {
    title: string;
    items: FooterContactItem[];
  };
  bottomBar: {
    copyright: string;
    poweredBy?: string;
    poweredByUrl?: string;
  };
}

export interface FooterSection {
  variants: {
    [variantKey: string]: FooterVariant;
  };
}

export interface ComponentConfig {
  key: string;
  component: string;
}

export interface PageConfig {
  components: ComponentConfig[];
}

export interface TemplateComponentConfig {
  shared: {
    Header: string;
    Footer: string;
    [key: string]: string;
  };
  pages: {
    home: PageConfig;
    [pageKey: string]: PageConfig;
  };
}

export interface RepzonData {
  templateComponents: {
    [templateKey: string]: TemplateComponentConfig;
  };
  sections: {
    Header: HeaderSection;
    Banner: BannerSection;
    WhatWeOffer: WhatWeOfferSection;
    About: AboutSection;
    Classes: ClassesSection;
    Trainers: TrainersSection;
    Testimonials: TestimonialsSection;
    FAQ: FAQSection;
    Contact: ContactSection;
    Footer: FooterSection;
    [sectionKey: string]: {
      variants: {
        [variantKey: string]: any;
      };
    };
  };
}

export interface ContentData {
  Repzon: RepzonData;
}
