import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { ChevronLeft, ChevronRight, Building2, Shield, Sparkles } from 'lucide-react';

export const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 bg-white border-t border-slate-100" data-purpose="testimonial-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Quote Block */}
          <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11.5px] font-bold tracking-wider uppercase text-slate-400">
                  TRUSTED BY TEAMS BUILDING AI
                </span>

                {/* Carousel pagination dots */}
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`rounded-full transition-all cursor-pointer ${
                        currentIndex === i ? 'w-4 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-200 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-[1.25] mb-8 min-h-[90px] transition-all">
                {current.quote}
              </blockquote>
            </div>

            {/* Author Info & Navigation Arrows */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 border border-slate-200 flex-shrink-0">
                  <img 
                    alt={current.author} 
                    className="w-full h-full object-cover" 
                    src={current.avatar}
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Clean SVG Fallback behind image */}
                  <div className="w-full h-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                    {current.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-[14.5px] font-bold text-slate-900 leading-tight">{current.author}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[12px] text-slate-500">{current.title}</span>
                    <span className="text-slate-300">•</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {current.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Carousel Arrows */}
              <div className="flex items-center gap-2 text-slate-400">
                <button 
                  onClick={prev}
                  aria-label="Previous quote" 
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors text-sm font-semibold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={next}
                  aria-label="Next quote" 
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors text-sm font-semibold cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Architectural Feature Card */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[260px] bg-slate-900 border border-slate-200/80 p-8 flex flex-col justify-between text-white shadow-sm">
            {/* Elegant Architectural Geometric SVG Background pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8" />
                    <circle cx="20" cy="20" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#arch-grid)" />
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-blue-950/70"></div>

            <div className="relative z-10 flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Enterprise Infrastructure</span>
            </div>

            <div className="relative z-10 my-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Safer.<br />
                More reliable.<br />
                Production-ready.
              </h3>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[12.5px] text-slate-400 font-medium border-t border-slate-800 pt-3">
              <span>From docs to deployment.</span>
              <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 99.99% Uptime
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
