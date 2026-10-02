import React, { useState } from 'react';
import { Search, ChevronDown, ArrowRight, Menu, X, Terminal, BookOpen, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { KnowledgeOSLogo } from './KnowledgeOSLogo';

interface NavbarProps {
  onOpenLiveDemo: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenContact: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeView: 'landing' | 'studio';
  onToggleView: (view: 'landing' | 'studio') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLiveDemo,
  onOpenSearch,
  onOpenAuth,
  onOpenContact,
  onNavigateSection,
  activeView,
  onToggleView
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#fcfdfe]/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100" data-purpose="site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left: Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-8 lg:gap-10">
          {/* Brand Logo & Wordmark */}
          <button 
            onClick={() => {
              onToggleView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <KnowledgeOSLogo size={28} />
            <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">KnowledgeOS</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-7 text-[14.5px] font-medium text-slate-600">
            {/* Product Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('product')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => onNavigateSection('why-agent-os')}
                className="flex items-center gap-1 hover:text-slate-950 transition-colors py-2 cursor-pointer focus:outline-none"
              >
                <span>Product</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
              </button>

              {activeDropdown === 'product' && (
                <div className="absolute top-full left-0 w-72 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 space-y-1.5 z-50 animate-in fade-in zoom-in-95">
                  <button 
                    onClick={() => { onNavigateSection('how-it-works'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Agentic RAG Engine</div>
                      <div className="text-[11px] text-slate-500 font-normal">Stateful LangGraph planner & cyclical tools</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => { onNavigateSection('see-it-action'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">NeMo Guardrails & Safety</div>
                      <div className="text-[11px] text-slate-500 font-normal">Colang 2.0 active rail evaluation</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => { onOpenLiveDemo(); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 transition cursor-pointer flex items-start gap-3 border border-blue-100"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                        <span>Live Telemetry Studio</span>
                        <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">Try</span>
                      </div>
                      <div className="text-[11px] text-blue-700/80 font-normal">Inspect traces, token latencies & evals</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Features Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => onNavigateSection('why-agent-os')} 
                className="flex items-center gap-1 hover:text-slate-950 transition-colors py-2 cursor-pointer focus:outline-none"
              >
                <span>Features</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'features' && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 space-y-1 z-50 animate-in fade-in zoom-in-95">
                  <button 
                    onClick={() => { onNavigateSection('why-agent-os'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition text-xs font-medium text-slate-800 flex items-center justify-between"
                  >
                    <span>Real-time Observability</span>
                    <span className="text-slate-400">→</span>
                  </button>
                  <button 
                    onClick={() => { onNavigateSection('why-agent-os'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition text-xs font-medium text-slate-800 flex items-center justify-between"
                  >
                    <span>Safety with Guardrails</span>
                    <span className="text-slate-400">→</span>
                  </button>
                  <button 
                    onClick={() => { onNavigateSection('why-agent-os'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition text-xs font-medium text-slate-800 flex items-center justify-between"
                  >
                    <span>Advanced RAG Pipeline</span>
                    <span className="text-slate-400">→</span>
                  </button>
                  <button 
                    onClick={() => { onNavigateSection('why-agent-os'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition text-xs font-medium text-slate-800 flex items-center justify-between"
                  >
                    <span>Continuous Evaluation</span>
                    <span className="text-slate-400">→</span>
                  </button>
                </div>
              )}
            </div>

            {/* Technology Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('technology')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => onNavigateSection('how-it-works')} 
                className="flex items-center gap-1 hover:text-slate-950 transition-colors py-2 cursor-pointer focus:outline-none"
              >
                <span>Technology</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'technology' && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 space-y-1 z-50 animate-in fade-in zoom-in-95">
                  <button 
                    onClick={() => { onNavigateSection('how-it-works'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition text-xs font-medium text-slate-800"
                  >
                    Modular Architecture Pipeline
                  </button>
                  <button 
                    onClick={() => { onNavigateSection('partners-section'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition text-xs font-medium text-slate-800"
                  >
                    LangChain & LangGraph Core
                  </button>
                  <button 
                    onClick={() => { onNavigateSection('partners-section'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition text-xs font-medium text-slate-800"
                  >
                    Portkey Gateway & pgvector
                  </button>
                </div>
              )}
            </div>

            {/* Use Cases */}
            <button 
              onClick={() => onNavigateSection('partners-section')} 
              className="hover:text-slate-950 transition-colors cursor-pointer py-2"
            >
              Use Cases
            </button>

            {/* Pricing */}
            <button 
              onClick={() => onOpenContact()} 
              className="hover:text-slate-950 transition-colors cursor-pointer py-2"
            >
              Pricing
            </button>

            {/* Docs */}
            <button 
              onClick={() => onOpenLiveDemo()} 
              className="hover:text-slate-950 transition-colors cursor-pointer py-2"
            >
              Docs
            </button>
          </nav>
        </div>

        {/* Right: Search, Sign in, Get started CTA */}
        <div className="flex items-center gap-5 sm:gap-6">
          {/* Search Button */}
          <button 
            onClick={onOpenSearch}
            aria-label="Search" 
            className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
            title="Search traces, datasets, or docs (Ctrl+K)"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Sign in */}
          <button 
            onClick={onOpenAuth}
            className="hidden sm:inline-block text-[14.5px] font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
          >
            Sign in
          </button>

          {/* Get started free Button */}
          <button 
            onClick={onOpenLiveDemo}
            className="inline-flex items-center gap-2 bg-[#091529] hover:bg-slate-900 text-white text-[13.5px] font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01]"
          >
            <span className="whitespace-nowrap">Get started free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3">
          <div className="space-y-1 text-sm font-medium text-slate-700">
            <button 
              onClick={() => { onNavigateSection('why-agent-os'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Product
            </button>
            <button 
              onClick={() => { onNavigateSection('why-agent-os'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Features
            </button>
            <button 
              onClick={() => { onNavigateSection('how-it-works'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Technology
            </button>
            <button 
              onClick={() => { onNavigateSection('partners-section'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Use Cases
            </button>
            <button 
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Pricing
            </button>
            <button 
              onClick={() => { onOpenLiveDemo(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Docs
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full py-2 text-center text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg"
            >
              Sign in
            </button>
            <button
              onClick={() => { onOpenLiveDemo(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#091529] hover:bg-slate-900 rounded-lg shadow-sm"
            >
              Launch Telemetry Studio →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
