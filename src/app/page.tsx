import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import DesktopApp from "@/components/DesktopApp";
import VoiceAnalysis from "@/components/VoiceAnalysis";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Testimonial from "@/components/Testimonial";
import Pricing from "@/components/Pricing";
import WaitlistForm from "@/components/WaitlistForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoCarousel />
      <StatsBar />
      <Features />
      <DesktopApp />
      <VoiceAnalysis />
      <HowItWorks />
      <UseCases />
      <Testimonial />
      <Pricing />
      <WaitlistForm />
      <CTASection />
      <Footer />
    </>
  );
}
