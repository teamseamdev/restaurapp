import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/homepage/HeroSection";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import AboutSection from "@/components/homepage/AboutSection";
import ContactSection from "@/components/homepage/ContactSection";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}