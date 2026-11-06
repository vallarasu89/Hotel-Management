import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowLeft, Share2, Tag, ChevronRight } from 'lucide-react';
import { blogsData } from '../../data/blogs';

export const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogsData.find(b => b.id === id) || blogsData[0];

  return (
    <>
      <Helmet>
        <title>{blog.title} | MGM Travel Journal</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-[#DCE2E9]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
              <Link to="/" className="hover:text-[#C90028]">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link to="/blog" className="hover:text-[#C90028]">Travel Journal</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-[#20262D] font-bold truncate max-w-xs">{blog.title}</span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          
          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <span className="bg-[#C90028] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {blog.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#20262D] leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between py-4 border-y border-[#DCE2E9] text-xs text-gray-500 gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-[#20262D]">{blog.author.name}</div>
                  <div className="text-gray-400">{blog.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C90028]" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C90028]" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl mb-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE2E9] shadow-sm space-y-6 text-gray-700 leading-relaxed text-base">
            <p className="text-lg font-serif italic text-gray-800 border-l-4 border-[#C90028] pl-4 py-1">
              "{blog.excerpt}"
            </p>

            <div className="space-y-4 whitespace-pre-line text-sm sm:text-base">
              {blog.content}
            </div>

            {/* Tags */}
            <div className="pt-8 border-t border-gray-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#C90028]" />
                Tags:
              </span>
              {blog.tags.map((t, i) => (
                <span key={i} className="text-xs font-semibold bg-[#F2F5F9] text-gray-700 px-3 py-1 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C90028] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Travel Journal</span>
            </Link>
          </div>

        </article>

      </div>
    </>
  );
};

export default BlogDetails;

