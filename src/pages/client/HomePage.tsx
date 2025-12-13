import BlogsSection from "../../components/sectionsLayout/BlogsSection";
import HeroBanner from "../../components/sectionsLayout/HeroBanner";
import ReviewsSection from "../../components/sectionsLayout/ReviewsSection";
import ServicesSection from "../../components/sectionsLayout/ServicesSection";
import TopBarbers from "../../components/sectionsLayout/TopBarbers";

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
