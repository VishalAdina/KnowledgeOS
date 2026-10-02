import React, { useState } from 'react';

export const TechStack: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'langchain',
      name: 'LangChain',
      role: 'Component primitives, document loaders & prompts',
      render: () => (
        <div className="flex items-center gap-3">
          {/* LangChain Official Icon (Enlarged) */}
          <svg className="h-7 w-7 text-slate-900 flex-shrink-0" viewBox="0 0 120 120" fill="currentColor">
            {/* Top-left wing */}
            <path d="M22 61c-8-7-9-19-3-27 8-9 20-8 27-2l11 11-14 14-21 4z" />
            {/* Top-right beak/crest */}
            <path d="M57 43l11-11c7-7 19-7 27 1 8 8 7 20 0 27l-11 11-27-28z" />
            {/* Bottom-right body wing */}
            <path d="M83 61c8 8 9 20 2 28-8 8-20 7-27 0L47 78l14-14 22-3z" />
            {/* Bottom-left tail */}
            <path d="M43 77l-11 11c-7 7-7 19 1 27 8 7 20 6 27-1l11-11-28-26z" />
          </svg>
          <span className="font-bold text-[15px] text-slate-900 tracking-tight">LangChain</span>
        </div>
      )
    },
    {
      id: 'langgraph',
      name: 'LangGraph',
      role: 'Stateful cyclic multi-agent graph orchestrator',
      render: () => (
        <div className="flex items-center gap-3">
          {/* LangGraph Official Logo (Enlarged) */}
          <svg className="w-7.5 h-7.5 flex-shrink-0" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#0f172a" />
            {/* 4 cyan corner brackets */}
            <path d="M9 13V10a1 1 0 0 1 1-1h3" stroke="#70b4f5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M23 13V10a1 1 0 0 0-1-1h-3" stroke="#70b4f5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M9 19v3a1 1 0 0 0 1 1h3" stroke="#70b4f5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M23 19v3a1 1 0 0 1-1 1h-3" stroke="#70b4f5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="font-mono text-[14.5px] font-bold text-slate-900 tracking-tight">langgraph</span>
        </div>
      )
    },
    {
      id: 'nemo',
      name: 'NVIDIA NeMo Guardrails',
      role: 'Programmable safety rails & Colang 2.0 policy checks',
      render: () => (
        <div className="flex items-center gap-2.5">
          {/* NVIDIA Official Green Eye (Enlarged) */}
          <div className="flex items-center gap-2">
            <svg className="h-7 w-auto flex-shrink-0" viewBox="0 0 120 90" fill="none">
              <rect x="38" y="8" width="46" height="52" fill="#76B900" />
              <path d="M12 40C24 20 48 16 68 16c20 0 42 10 52 24-10 14-32 24-52 24-20 0-44-4-56-24z" fill="#76B900" />
              <path d="M16 40C26 24 46 21 64 21c17 0 35 8 44 19-9 11-27 19-44 19-18 0-38-3-48-19z" fill="#fbfcfd" />
              <path d="M28 40c8-10 22-12 36-12 13 0 25 5 32 12-7 7-19 12-32 12-14 0-28-2-36-12z" fill="#76B900" />
              <circle cx="64" cy="40" r="7" fill="#fbfcfd" />
            </svg>
            <span className="font-black text-[#76B900] text-[15px] tracking-tight">NVIDIA</span>
          </div>
          <span className="font-medium text-slate-700 text-[14px] whitespace-nowrap">NeMo Guardrails</span>
        </div>
      )
    },
    {
      id: 'portkey',
      name: 'Portkey',
      role: 'AI Gateway for cost analytics, virtual keys & fallbacks',
      render: () => (
        <div className="flex items-center gap-2.5">
          {/* Portkey Hexagon Chevron Logo (Enlarged) */}
          <svg className="w-7.5 h-7.5 flex-shrink-0" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="portkey-grad-lg" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <path d="M50 8 L85 28 A12 12 0 0 1 91 38 L91 62 A12 12 0 0 1 85 72 L50 92 A12 12 0 0 1 40 92 L15 72 A12 12 0 0 1 9 62 L9 38 A12 12 0 0 1 15 28 L40 8 A12 12 0 0 1 50 8 Z" stroke="url(#portkey-grad-lg)" strokeWidth="11" strokeLinejoin="round" fill="none" />
            <path d="M44 34 L62 50 L44 66" stroke="url(#portkey-grad-lg)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="font-bold text-[15px] text-slate-900 tracking-tight">Portkey</span>
        </div>
      )
    },
    {
      id: 'pydantic',
      name: 'Pydantic AI',
      role: 'Type-safe structured schemas & JSON schema enforcement',
      render: () => (
        <div className="flex items-center gap-2.5">
          {/* Pydantic AI Wireframe Pyramid (Enlarged) */}
          <svg className="w-7.5 h-7.5 flex-shrink-0" viewBox="0 0 100 100" fill="none">
            <path d="M50 12 L14 74 L86 74 Z" stroke="#E92063" strokeWidth="8" strokeLinejoin="round" fill="none" />
            <path d="M50 12 L50 74" stroke="#E92063" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M14 74 L50 88 L86 74" stroke="#E92063" strokeWidth="8" strokeLinejoin="round" fill="none" />
            <path d="M50 74 L50 88" stroke="#E92063" strokeWidth="8" strokeLinecap="round" fill="none" />
          </svg>
          <span className="font-bold text-[15px] text-slate-900 tracking-tight">Pydantic AI</span>
        </div>
      )
    },
    {
      id: 'ragas',
      name: 'RAGAS',
      role: 'Evaluation framework for Faithfulness & Context Precision',
      render: () => (
        <div className="flex items-center gap-2.5">
          {/* RAGAS Set-square Ruler (Enlarged) */}
          <svg className="w-7.5 h-7.5 flex-shrink-0" viewBox="0 0 100 100" fill="none">
            <path d="M15 15 L15 85 L85 85 Z" fill="#FBBF24" stroke="#374151" strokeWidth="7" strokeLinejoin="round" />
            <path d="M30 52 L30 73 L51 73 Z" fill="#fbfcfd" stroke="#374151" strokeWidth="6" strokeLinejoin="round" />
            <line x1="28" y1="28" x2="35" y2="35" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
            <line x1="42" y1="42" x2="49" y2="49" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
            <line x1="56" y1="56" x2="63" y2="63" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
            <line x1="70" y1="70" x2="77" y2="77" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <span className="font-serif text-[17px] font-bold text-slate-900 tracking-tight">ragas</span>
        </div>
      )
    },
    {
      id: 'deepeval',
      name: 'DeepEval',
      role: 'Unit testing and CI/CD regression suites for LLMs',
      render: () => (
        <div className="flex items-center gap-2.5">
          {/* DeepEval Open Delta Triangle (Enlarged) */}
          <svg className="w-7 h-7 flex-shrink-0 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3L2 21h20L12 3z" />
          </svg>
          <span className="font-semibold text-[15px] text-slate-900 tracking-tight">DeepEval</span>
        </div>
      )
    },
    {
      id: 'pgvector',
      name: 'pgvector',
      role: 'High-performance vector similarity search engine for Postgres',
      render: () => (
        <div className="flex items-center gap-2.5">
          {/* pgvector Official Vector/Elephant Logo (Enlarged) */}
          <div className="relative flex items-center justify-center">
            <svg className="w-7.5 h-7.5 flex-shrink-0" viewBox="0 0 100 100" fill="none">
              {/* Elephant Head Silhouette in Postgres Blue */}
              <path d="M50 15 C30 15 16 30 16 52 C16 66 22 75 28 80 L35 72 C30 67 28 60 28 52 C28 36 38 25 50 25 C62 25 72 36 72 52 C72 60 70 67 65 72 L72 80 C78 75 84 66 84 52 C84 30 70 15 50 15 Z" fill="#336791" stroke="#0f172a" strokeWidth="4" />
              {/* Trunk */}
              <path d="M44 42 C44 56 46 72 48 85 C49 88 53 88 54 85 C56 72 58 56 58 42 Z" fill="#336791" stroke="#0f172a" strokeWidth="3" />
              {/* Tusks */}
              <path d="M38 68 C34 71 30 71 27 68" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M62 68 C66 71 70 71 73 68" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              {/* Ears */}
              <path d="M22 36 C16 42 14 52 18 62" stroke="#0f172a" strokeWidth="3" fill="none" />
              <path d="M78 36 C84 42 86 52 82 62" stroke="#0f172a" strokeWidth="3" fill="none" />
              {/* Eyes */}
              <ellipse cx="40" cy="44" rx="2.5" ry="4" fill="#0f172a" />
              <ellipse cx="60" cy="44" rx="2.5" ry="4" fill="#0f172a" />
            </svg>
            {/* Vector badge overlay */}
            <span className="absolute -bottom-1 -right-1 text-[8.5px] font-mono font-bold bg-[#336791] text-white px-1 rounded-sm shadow-xs">
              VEC
            </span>
          </div>
          <span className="font-bold text-[15.5px] text-slate-900 tracking-tight">pgvector</span>
        </div>
      )
    }
  ];

  return (
    <section className="border-t border-slate-100 bg-[#fbfcfd] py-11" id="partners-section" data-purpose="partners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Heading */}
        <p className="text-[12px] font-semibold tracking-wider uppercase text-slate-400 mb-8">
          BUILT WITH MODERN AI AND OPEN SOURCE TOOLS
        </p>

        {/* 
          Single continuous row spanning from left to right:
          - Spans horizontally across the container
          - Evenly spaced with justify-between
          - On narrower mobile screens, gracefully scrolls without breaking or wrapping
        */}
        <div className="w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center justify-between min-w-[1020px] lg:min-w-0 w-full gap-5 lg:gap-6 xl:gap-8 px-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
                className="flex items-center shrink-0 px-2.5 py-2 rounded-xl hover:bg-slate-100/80 transition-all cursor-pointer group hover:scale-[1.04] select-none"
                title={`${tool.name} — ${tool.role}`}
              >
                {tool.render()}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tool Role Explainer Callout */}
        {selectedTool && (
          <div className="mt-5 inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm rounded-xl px-4 py-2 text-xs text-slate-600 animate-in fade-in slide-in-from-top-1">
            <span className="font-bold text-slate-900">{selectedTool}:</span>
            <span>{tools.find(t => t.name === selectedTool)?.role}</span>
            <button 
              onClick={() => setSelectedTool(null)}
              className="ml-2 text-slate-400 hover:text-slate-600 text-[10px] font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
