import Header from "../components/common/Header";
import FeaturesSection from "../components/landing/FeaturesSection";
import HeroSection from "../components/landing/HeroSection";
import CTASection from "../components/landing/CTASection";
import TopButton from "../components/TopButton";
import Footer from "../components/common/Footer";

export default function Main() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
      <TopButton />
    </>
  );
}
