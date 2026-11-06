import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { blogsData } from '../../data/blogs';
import { BlogCardSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const Blog = () => {
  const { loading } = useAsyncData(blogsData, 400);
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Chennai', 'ECR', 'Wellness', 'Ayurveda', 'Weddings'];

  const filteredBlogs = selectedTag === 'All'
    ? blogsData
    : blogsData.filter(b => b.tags.includes(selectedTag));

  return (
    <>
      <Helmet>
        <title>Travel Journal & Coastal Stories | MGM Hotels & Resorts</title>
        <meta name="description" content="Discover insider travel guides, Ayurvedic healing philosophy, culinary stories, and beachfront celebration guides." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Hero Header */}
        <div className="bg-[#15191E] text-white py-16 sm:py-20 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#C90028]" />
              Stories & Insights
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              The MGM Travel Journal
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Curated perspectives on coastal culture, time-honored Ayurvedic wellness, regional culinary secrets, and celebration ideas.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#C90028] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#DCE2E9]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-3xl border border-[#DCE2E9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 bg-[#20262D]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C90028]" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors mb-3 leading-snug">
                        <Link to={`/blog/${blog.id}`}>
                          {blog.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0 border-t border-[#F2F5F9] flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#20262D]">{blog.author.name}</div>
                        <div className="text-[10px] text-gray-400">{blog.author.role}</div>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#C90028] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </article>
              ))}
            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default Blog;

