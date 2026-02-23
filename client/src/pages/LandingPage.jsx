import { Helmet } from "react-helmet";
import Header from "../components/common/Header";
import FeaturesSection from "../components/landing/FeaturesSection";
import HeroSection from "../components/landing/HeroSection";
import CTASection from "../components/landing/CTASection";
import TopButton from "../components/TopButton";
import Footer from "../components/common/Footer";

export default function Main() {
  return (
    <>
      <Helmet>
        <title>ICONDB - 아이콘 디자인 공유 플랫폼</title>
        <meta
          name="description"
          content="창의적인 아이콘 디자이너들과 함께 아이콘을 공유하고 발견해보세요. ICONDB는 아이콘 커뮤니티입니다."
        />
        <meta
          name="keywords"
          content="아이콘, 디자인, SVG, 공유, 커뮤니티, 디자이너"
        />
        <meta
          property="og:title"
          content="ICONDB - 아이콘 디자인 공유 플랫폼"
        />
        <meta
          property="og:description"
          content="창의적인 아이콘을 공유하고 발견하는 플랫폼"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
      <TopButton />
    </>
  );
}
