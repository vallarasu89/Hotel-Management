import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAsyncData from '../../hooks/useAsyncData';
import HeroBanner from './sections/HeroBanner';
import AboutSection from './sections/AboutSection';
import FeaturedHotelsSection from './sections/FeaturedHotelsSection';
import RoomsSuitesSection from './sections/RoomsSuitesSection';
import ExperiencesSection from './sections/ExperiencesSection';
import StatisticsSection from './sections/StatisticsSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import SpecialOffersSection from './sections/SpecialOffersSection';
import GuestTestimonialsSection from './sections/GuestTestimonialsSection';
import ImageGallerySection from './sections/ImageGallerySection';
import AwardsSection from './sections/AwardsSection';
import TravelBlogSection from './sections/TravelBlogSection';
import FinalCTASection from './sections/FinalCTASection';

export const Home = () => {
  // Use controlled async loading to demonstrate skeleton states seamlessly
  const { loading } = useAsyncData(true, 400);
  const isSimulatedLoading = loading;

  return (
    <>
      <Helmet>
        <title>MGM Hotels & Resorts India | Coastal Luxury, Heritage Haveli & Palace Stays</title>
        <meta
          name="description"
          content="Experience the warmth of true Indian hospitality at MGM Hotels & Resorts. Discover our luxury beachfront resorts in Chennai ECR, royal havelis, and 5-star city hotels with best rate direct guarantee."
        />
        <meta property="og:title" content="MGM Hotels & Resorts India | Luxury Beachfront Stays" />
        <meta property="og:description" content="Iconic coastal and heritage hospitality with direct private beach access, authentic South Indian cuisine, and award-winning service." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="w-full">
        {/* Section 2 & 3: Hero Banner + Search Widget */}
        <HeroBanner />

        {/* Section 4: About Our Hospitality */}
        <AboutSection />

        {/* Section 5: Featured Hotels */}
        <FeaturedHotelsSection loading={loading} />

        {/* Section 6: Rooms & Suites */}
        <RoomsSuitesSection loading={loading} />

        {/* Section 7: Experiences */}
        <ExperiencesSection />

        {/* Section 8: Statistics and Achievements */}
        <StatisticsSection loading={loading} />

        {/* Section 9: Why Choose Us */}
        <WhyChooseUsSection />

        {/* Section 10: Special Offers */}
        <SpecialOffersSection />

        {/* Section 11: Guest Testimonials */}
        <GuestTestimonialsSection loading={loading} />

        {/* Section 12: Image Gallery */}
        <ImageGallerySection loading={loading} />

        {/* Section 13: Awards & Recognition */}
        <AwardsSection />

        {/* Section 14: Travel Blog */}
        <TravelBlogSection loading={loading} />

        {/* Section 15: Final CTA */}
        <FinalCTASection />
      </main>
    </>
  );
};

export default Home;

