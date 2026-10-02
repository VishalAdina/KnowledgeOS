import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/mockData';
import { ArchitectureNode } from '../types';
import { ArrowDown, Cpu, ShieldCheck, Zap, Database, CheckCircle, Eye, Info, X, ExternalLink } from 'lucide-react';

interface HowItWorksProps {
  onOpenLiveDemo: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenLiveDemo }) => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(ARCHITECTURE_NODES[1]); // NeMo selected by default for interest

  const steps = [
    { num: 1, title: 'User query', desc: 'Ask a question in natural language.' },
    { num: 2, title: 'Guardrails (NeMo)', desc: 'Check input/output safety and policy compliance.' },
    { num: 3, title: 'Agent orchestration (LangGraph)', desc: 'Planner → Retrieval → Responder.' },
    { num: 4, title: 'Retrieval & reranking', desc: 'Vector search + Flash Reranker.' },
    { num: 5, title: 'LLM gateway (Portkey)', desc: 'Logging, cost tracking and model control.' },
    { num: 6, title: 'Evaluation (RAGAS)', desc: 'Automatic evals using test datasets and metrics.' }
  ];

  return (
    <section className="bg-[#fcfdfe] py-20 lg:py-24 border-t border-slate-100" id="how-it-works" data-purpose="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Copy & Steps */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11.5px] font-bold tracking-wider uppercase text-slate-400 mb-3">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-4">
              A modular pipeline<br />for production-grade AI.
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-md">
              A complete, production-ready architecture from query to response — with safety, control and observability at every step.
            </p>

            {/* Numbered Steps List */}
            <div className="space-y-6 w-full max-w-md mb-8">
              {steps.map((st) => (
                <div key={st.num} className="flex items-start gap-4 group">
                  <div className="w-7 h-7 rounded-full bg-blue-100/80 text-blue-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {st.num}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 leading-tight mb-0.5">{st.title}</h4>
                    <p className="text-[12.5px] text-slate-500">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture details link */}
            <button 
              onClick={onOpenLiveDemo}
              className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
            >
              <span>View architecture details in Live Console</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Right Column: Interactive Architecture Diagram */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-2xl p-6 sm:p-8 bg-[#f2f7fd] border border-blue-100/80 overflow-hidden shadow-sm">
              
              {/* Floating Telemetry Pills (Responsive layout) */}
              <div className="flex flex-wrap sm:flex-col gap-2 sm:absolute sm:top-6 sm:right-6 mb-6 sm:mb-0 z-10 w-full sm:w-auto">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-slate-700 text-[11px] font-medium">
                  <div className="w-5 h-5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-3 h-3" />
                  </div>
                  <span>Real-time traces</span>
                </div>
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-slate-700 text-[11px] font-medium">
                  <div className="w-5 h-5 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <span>Live evaluations</span>
                </div>
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-slate-700 text-[11px] font-medium">
                  <div className="w-5 h-5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3 h-3" />
                  </div>
                  <span>Cost & usage analytics</span>
                </div>
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-slate-700 text-[11px] font-medium">
                  <div className="w-5 h-5 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Database className="w-3 h-3" />
                  </div>
                  <span>Datasets & test sets</span>
                </div>
              </div>

              {/* Pipeline Architecture Diagram Central Column */}
              <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto pt-2 pb-2">
                
                {/* Node 1: User Query */}
                <button
                  onClick={() => setSelectedNode(ARCHITECTURE_NODES[0])}
                  className={`rounded-xl border shadow-xs px-5 py-2.5 flex items-center gap-3 w-52 justify-center transition cursor-pointer hover:scale-105 ${
                    selectedNode?.id === 'node-user' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white border-slate-200/90 text-slate-800'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedNode?.id === 'node-user' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold">User Query</span>
                </button>

                {/* Crisp downward arrow */}
                <div className="h-6 flex items-center justify-center text-blue-500">
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                </div>

                {/* Node 2: NeMo Guardrails */}
                <button
                  onClick={() => setSelectedNode(ARCHITECTURE_NODES[1])}
                  className={`border rounded-xl px-5 py-2.5 flex items-center gap-3 w-60 justify-center shadow-xs transition cursor-pointer hover:scale-105 ${
                    selectedNode?.id === 'node-nemo' 
                      ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300' 
                      : 'bg-emerald-50/80 border-emerald-200 text-slate-900'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedNode?.id === 'node-nemo' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[12.5px] font-bold leading-tight">NeMo Guardrails</div>
                    <div className={`text-[10px] font-medium ${selectedNode?.id === 'node-nemo' ? 'text-emerald-100' : 'text-slate-500'}`}>
                      (Safety & Policy)
                    </div>
                  </div>
                </button>

                {/* Crisp downward arrow */}
                <div className="h-6 flex items-center justify-center text-blue-500">
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                </div>

                {/* Node 3: LangGraph */}
                <button
                  onClick={() => setSelectedNode(ARCHITECTURE_NODES[2])}
                  className={`border rounded-xl px-5 py-2.5 flex items-center gap-3 w-64 justify-center shadow-xs transition cursor-pointer hover:scale-105 ${
                    selectedNode?.id === 'node-langgraph'
                      ? 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-300'
                      : 'bg-purple-50/80 border-purple-200 text-slate-900'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedNode?.id === 'node-langgraph' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[12.5px] font-bold leading-tight">LangGraph</div>
                    <div className={`text-[10px] font-medium ${selectedNode?.id === 'node-langgraph' ? 'text-purple-100' : 'text-slate-500'}`}>
                      (Agent Orchestrator)
                    </div>
                  </div>
                </button>

                {/* Clean Branching Connector Lines SVG */}
                <div className="w-full max-w-[360px] h-9 relative flex items-center justify-center">
                  <svg className="w-full h-full text-blue-300" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 360 36">
                    <path d="M180 0 L180 30" />
                    <path d="M180 12 H60 V30" />
                    <path d="M180 12 H300 V30" />
                    <path d="M56 26 L60 32 L64 26" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M176 24 L180 30 L184 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M296 26 L300 32 L304 26" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Branch Nodes: Retrieval, Portkey, RAGAS */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-[420px] items-stretch">
                  {/* Retrieval */}
                  <button
                    onClick={() => setSelectedNode(ARCHITECTURE_NODES[3])}
                    className={`rounded-xl p-2.5 flex items-start gap-2 shadow-xs transition text-left cursor-pointer hover:scale-105 border ${
                      selectedNode?.id === 'node-retrieval'
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-white border-blue-100 text-slate-900'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedNode?.id === 'node-retrieval' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold leading-tight">Retrieval</div>
                      <div className={`text-[9px] leading-tight mt-0.5 ${selectedNode?.id === 'node-retrieval' ? 'text-blue-100' : 'text-slate-500'}`}>
                        (Vector DB + Flash)
                      </div>
                    </div>
                  </button>

                  {/* Portkey */}
                  <button
                    onClick={() => setSelectedNode(ARCHITECTURE_NODES[4])}
                    className={`rounded-xl p-2.5 flex items-start gap-2 shadow-xs transition text-left cursor-pointer hover:scale-105 border ${
                      selectedNode?.id === 'node-portkey'
                        ? 'bg-amber-600 text-white border-amber-700'
                        : 'bg-amber-50/70 border-amber-200 text-slate-900'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedNode?.id === 'node-portkey' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-600'
                    }`}>
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold leading-tight">Portkey</div>
                      <div className={`text-[9px] leading-tight mt-0.5 ${selectedNode?.id === 'node-portkey' ? 'text-amber-100' : 'text-slate-500'}`}>
                        (LLM Gateway)
                      </div>
                    </div>
                  </button>

                  {/* RAGAS */}
                  <button
                    onClick={() => setSelectedNode(ARCHITECTURE_NODES[5])}
                    className={`rounded-xl p-2.5 flex items-start gap-2 shadow-xs transition text-left cursor-pointer hover:scale-105 border ${
                      selectedNode?.id === 'node-ragas'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedNode?.id === 'node-ragas' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold leading-tight">RAGAS</div>
                      <div className={`text-[9px] leading-tight mt-0.5 ${selectedNode?.id === 'node-ragas' ? 'text-emerald-100' : 'text-slate-500'}`}>
                        (Evaluation)
                      </div>
                    </div>
                  </button>
                </div>

                {/* Arrow down to LLM */}
                <div className="h-6 flex items-center justify-center text-blue-500">
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                </div>

                {/* Node 4: LLM */}
                <button
                  onClick={() => setSelectedNode(ARCHITECTURE_NODES[6])}
                  className={`rounded-xl border shadow-xs px-5 py-2.5 flex items-center gap-3 w-56 justify-center transition cursor-pointer hover:scale-105 ${
                    selectedNode?.id === 'node-llm'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white border-blue-100 text-slate-800'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedNode?.id === 'node-llm' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[12.5px] font-bold leading-tight">LLM</div>
                    <div className={`text-[10px] font-medium ${selectedNode?.id === 'node-llm' ? 'text-blue-100' : 'text-slate-500'}`}>
                      (Response Generation)
                    </div>
                  </div>
                </button>

                {/* Arrow down to Final Response */}
                <div className="h-6 flex items-center justify-center text-blue-500">
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                </div>

                {/* Node 5: Final Response */}
                <button
                  onClick={() => setSelectedNode(ARCHITECTURE_NODES[7])}
                  className={`rounded-xl border shadow-xs px-5 py-2.5 flex items-center gap-3 w-52 justify-center transition cursor-pointer hover:scale-105 ${
                    selectedNode?.id === 'node-response'
                      ? 'bg-slate-900 text-white border-slate-950'
                      : 'bg-white border-blue-100 text-slate-800'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedNode?.id === 'node-response' ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold">Final Response</span>
                </button>
              </div>

              {/* Interactive Node Telemetry Inspector Card */}
              {selectedNode && (
                <div className="mt-5 bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{selectedNode.name}</span>
                      <span className="text-[11px] text-slate-400">• {selectedNode.tool}</span>
                    </div>
                    <span className="text-[11px] font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      {selectedNode.telemetryMetric}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{selectedNode.description}</p>
                  <div className="bg-slate-900 text-slate-200 p-2 rounded-lg font-mono text-[10.5px] overflow-x-auto">
                    <code>{selectedNode.sampleTrace}</code>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
