import React from 'react';
import { KnowledgeOSLogo } from './KnowledgeOSLogo';

interface FooterProps {
  onOpenLiveDemo: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLiveDemo, onOpenContact }) => {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-14 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <KnowledgeOSLogo size={22} />
              <span className="font-bold text-slate-900 text-base">KnowledgeOS</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-4">
              The enterprise control plane for agentic RAG, real-time observability, guardrails, and automated evaluation metrics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All Systems Operational</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono">v2.4.0</span>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Product</div>
            <ul className="space-y-2">
              <li><button onClick={onOpenLiveDemo} className="hover:text-slate-950 transition cursor-pointer">Live Console</button></li>
              <li><a href="#why-agent-os" className="hover:text-slate-950 transition">Observability</a></li>
              <li><a href="#how-it-works" className="hover:text-slate-950 transition">NeMo Guardrails</a></li>
              <li><a href="#see-it-action" className="hover:text-slate-950 transition">RAGAS Evaluations</a></li>
              <li><a href="#how-it-works" className="hover:text-slate-950 transition">LangGraph Planner</a></li>
            </ul>
          </div>

          {/* Technology Col */}
          <div>
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Technology</div>
            <ul className="space-y-2">
              <li><span className="hover:text-slate-950 cursor-pointer">LangGraph Core</span></li>
              <li><span className="hover:text-slate-950 cursor-pointer">Portkey Gateway</span></li>
              <li><span className="hover:text-slate-950 cursor-pointer">pgvector Indexing</span></li>
              <li><span className="hover:text-slate-950 cursor-pointer">Flash Reranker v3</span></li>
              <li><span className="hover:text-slate-950 cursor-pointer">Colang 2.0 Rails</span></li>
            </ul>
          </div>

          {/* Company & Legal Col */}
          <div>
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Connect</div>
            <ul className="space-y-2">
              <li><button onClick={onOpenContact} className="hover:text-slate-950 transition cursor-pointer">Contact Enterprise</button></li>
              <li><span className="hover:text-slate-950 cursor-pointer">Documentation</span></li>
              <li><span className="hover:text-slate-950 cursor-pointer">Security & SOC2</span></li>
              <li><span className="hover:text-slate-950 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-slate-950 cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-4">
          <p>© 2026 KnowledgeOS Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Status</span>
            <span className="hover:text-slate-600 cursor-pointer">GitHub</span>
            <span className="hover:text-slate-600 cursor-pointer">Discord</span>
            <span className="hover:text-slate-600 cursor-pointer">Twitter / X</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
