import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Eye, X, ArrowRight } from 'lucide-react';
import { galleryData } from '../../../data/blogs';
import { GallerySkeleton } from '../../../components/skeletons';

export const ImageGallerySection = ({ loading = false }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Resort', 'Rooms', 'Dining', 'Wellness', 'Events'];

  const filteredItems = activeCategory === 'All'
    ? galleryData.slice(0, 6)
    : galleryData.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              Visual Journey
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Glimpses of MGM Coastal Splendor
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
              Immerse yourself in sun-soaked beachfront lawns, private plunge pools, and authentic royal hospitality.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#C90028] text-white shadow-sm'
                    : 'bg-[#F2F5F9] text-gray-600 hover:bg-[#E5EBF2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <GallerySkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Hover Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                    {item.category}
                  </span>
                  <div className="font-serif text-lg font-bold">
                    {item.title}
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Full Gallery Link */}
        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C90028] hover:text-[#A50020] group"
          >
            <span>View Complete Photography Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Image Modal Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#15191E] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C90028] transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              <div className="p-6 bg-[#20262D] text-white flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C90028] font-bold">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1">
                    {selectedImage.title}
                  </h3>
                </div>
                <Link
                  to="/booking"
                  className="bg-[#C90028] hover:bg-[#A50020] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Book This Experience
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ImageGallerySection;

