import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Camera, Eye, X, Sparkles } from 'lucide-react';
import { galleryData } from '../../data/blogs';
import { GallerySkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const Gallery = () => {
  const { loading } = useAsyncData(galleryData, 400);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Resort', 'Rooms', 'Dining', 'Wellness', 'Events'];

  const filteredItems = activeCategory === 'All'
    ? galleryData
    : galleryData.filter(i => i.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <Helmet>
        <title>Photography Gallery | MGM Hotels & Resorts India</title>
        <meta name="description" content="View high-resolution photography of MGM Beach Resorts, private beachfront villas, swimming pools, dining halls, and wellness spas." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Hero Header */}
        <div className="bg-[#15191E] text-white py-16 sm:py-20 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Camera className="w-3.5 h-3.5 text-[#C90028]" />
              Visual Showcase
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              MGM Hotels & Resorts Gallery
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              A curated photographic retrospective of our beachfront properties, heritage havelis, and tranquil gardens.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#C90028] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#DCE2E9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <GallerySkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-bold leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#15191E] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C90028] transition-colors z-10 cursor-pointer"
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
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Gallery;

