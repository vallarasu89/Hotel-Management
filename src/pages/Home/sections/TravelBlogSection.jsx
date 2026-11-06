import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogsData } from '../../../data/blogs';
import { BlogCardSkeleton } from '../../../components/skeletons';

export const TravelBlogSection = ({ loading = false }) => {
  return (
    <section className="py-20 bg-[#F2F5F9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              MGM Travel Journal
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Stories, Heritage & Coastal Secrets
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
              Curated insider guides, ancient wellness philosophies, and seaside celebration inspirations from our curators.
            </p>
          </div>

          <Link
            to="/blog"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C90028] hover:text-[#A50020] group self-start"
          >
            <span>Explore All Journal Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))
          ) : (
            blogsData.slice(0, 3).map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#DCE2E9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Article Image with Category */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#20262D]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C90028]" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors line-clamp-2 mb-3">
                      <Link to={`/blog/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author & Read More Footer */}
                <div className="p-6 pt-0 border-t border-[#F2F5F9] flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#20262D]">{blog.author.name}</div>
                      <div className="text-[10px] text-gray-500">{blog.author.role}</div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#C90028] hover:text-[#A50020] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </article>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default TravelBlogSection;

