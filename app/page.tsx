import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeOffer from "@/components/WhatWeOffer";
import About from "@/components/About";
import Classes from "@/components/Classes";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhatWeOffer />
        <About />
        <Classes />
        <Trainers />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
