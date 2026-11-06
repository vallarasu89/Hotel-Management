import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, MapPin, Star, Sparkles, ArrowRight } from 'lucide-react';
import SearchWidget from '../../../components/booking/SearchWidget';
import SplitTextReveal from '../../../components/animations/SplitTextReveal';

// Lazy load Three.js Canvas for optimal initial page performance
const Hero3DCanvas = lazy(() => import('../../../components/animations/Hero3DCanvas'));

const heroSlides = [
  {
    id: 1,
    title: "Timeless Coastal Luxury on Chennai's Golden Shore",
    subtitle: "MGM Beach Resorts, Muttukadu ECR",
    tag: "Signature Beachfront Destination",
    description: "Immerse in 30 sprawling acres of swaying palms, private sea breezes, traditional cottages, and world-renowned South Indian warmth.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85",
    ctaText: "Explore Beach Resort",
    ctaLink: "/hotels/mgm-beach-resort",
    badge: "Bay of Bengal Views"
  },
  {
    id: 2,
    title: "Palatial Elegance & Metropolitan Grandeur",
    subtitle: "MGM Grand Palace, Bengaluru",
    tag: "Diplomatic Enclave Landmark",
    description: "Soaring skyline views, Michelin-inspired culinary artistry, and restorative luxury designed for the discerning global traveller.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85",
    ctaText: "Discover Palace Hotel",
    ctaLink: "/hotels/mgm-grand-bangalore",
    badge: "5-Star Luxury Stays"
  },
  {
    id: 3,
    title: "Royal Rajputana Romance & Regal Heritage",
    subtitle: "MGM Heritage Haveli, Jaipur",
    tag: "Historic Palatial Sanctuary",
    description: "Step into an era of courtyards, hand-carved jharokhas, candlelit sitar evenings, and timeless royal Rajasthani hospitality.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85",
    ctaText: "Explore Heritage Haveli",
    ctaLink: "/hotels/mgm-heritage-jaipur",
    badge: "Heritage Haven"
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative w-full min-h-[90vh] lg:min-h-[95vh] bg-[#15191E] text-white flex flex-col justify-between overflow-hidden">
      
      {/* Background Slides with smooth fade & subtle zoom */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[7000ms] ease-out"
          />
          {/* Deep dark gradient overlay for editorial contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15191E] via-[#15191E]/60 to-black/40" />
          <div className="absolute inset-0 bg-[#20262D]/30" />
        </div>
      ))}

      {/* 3D Gold Particles Ambient Canvas */}
      <Suspense fallback={null}>
        <Hero3DCanvas />
      </Suspense>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-12 w-full flex-1 flex flex-col justify-center">
        
        {/* Slide Indicators & Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C90028] text-white text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3 h-3" />
            {slide.tag}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-300 font-semibold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-400/20">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {slide.badge}
          </span>
        </div>

        {/* Big Bold Headline with Key-triggered Character/Word Reveal */}
        <h1 key={slide.id} className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-4">
          <SplitTextReveal text={slide.title} />
        </h1>

        {/* Subtitle / Location */}
        <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-200 mb-4">
          <MapPin className="w-4 h-4 text-[#C90028]" />
          <span>{slide.subtitle}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
          {slide.description}
        </p>

        {/* Hero CTAs & Slide Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Link
            to={slide.ctaLink}
            className="bg-[#C90028] hover:bg-[#A50020] text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/rooms"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all"
          >
            View Suites & Villas
          </Link>

          {/* Slide Arrow Navigators */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#C90028] text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-semibold px-2 text-gray-300">
              0{currentSlide + 1} / 0{heroSlides.length}
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#C90028] text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section 3: Floating Booking Search Widget */}
        <div className="w-full relative z-20">
          <SearchWidget isHero={true} />
        </div>

      </div>

      {/* Slide dots at bottom */}
      <div className="relative z-10 flex justify-center gap-2 pb-4">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === currentSlide ? 'w-8 bg-[#C90028]' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroBanner;
