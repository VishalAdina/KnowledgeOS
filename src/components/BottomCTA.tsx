import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface BottomCTAProps {
  onOpenLiveDemo: () => void;
  onOpenContact: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOpenLiveDemo, onOpenContact }) => {
  return (
    <section className="py-16 bg-[#fcfdfe]" data-purpose="bottom-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fffbeb] border border-amber-200/70 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-8">
              <span className="text-[11.5px] font-bold tracking-wider uppercase text-amber-700/80 mb-2 block">
                READY TO BUILD YOUR AI ASSISTANT?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug mb-3">
                Turn your knowledge into a powerful AI assistant.
              </h2>
              <p className="text-[14px] text-slate-600 max-w-xl leading-relaxed">
                Get started in minutes and experience production-grade agentic RAG with observability, guardrails and evals.
              </p>
            </div>

            {/* Right CTAs & Trust Badges */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                <button 
                  onClick={onOpenLiveDemo}
                  className="inline-flex items-center justify-center gap-2 bg-[#091529] hover:bg-slate-900 text-white text-[13.5px] font-semibold px-5 py-3 rounded-lg shadow-sm transition-all w-full sm:w-auto cursor-pointer hover:shadow-md"
                >
                  <span>Get started free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button 
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 text-[13.5px] font-medium px-5 py-3 rounded-lg transition-all shadow-sm w-full sm:w-auto cursor-pointer hover:border-slate-300"
                >
                  Talk to sales
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11.5px] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                  Setup in minutes
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
