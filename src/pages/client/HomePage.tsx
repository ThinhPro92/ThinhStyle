import BlogsSection from "../../components/sections/BlogsSection";
import HeroBanner from "../../components/sections/HeroBanner";
import ReviewsSection from "../../components/sections/ReviewsSection";
import ServicesSection from "../../components/sections/ServicesSection";
import TopBarbers from "../../components/sections/TopBarbers";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ReviewsSection />
      <TopBarbers />
      <ServicesSection />
      <BlogsSection />
    </>
  );
}
