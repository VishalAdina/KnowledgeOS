import React, { useState } from 'react';
import { BarChart3, ShieldCheck, Database, Award, ArrowRight, X, CheckCircle2 } from 'lucide-react';

interface WhyAgentOSProps {
  onOpenLiveDemo: () => void;
}

export const WhyAgentOS: React.FC<WhyAgentOSProps> = ({ onOpenLiveDemo }) => {
  const [activeFeature, setActiveFeature] = useState<{
    title: string;
    description: string;
    points: string[];
    tag: string;
  } | null>(null);

  const features = [
    {
      id: 'observability',
      title: 'Real-time observability',
      description: 'Trace every request, token, model call, and agent decision in real time.',
      icon: BarChart3,
      color: 'blue',
      tag: 'Latency & Tokens',
      points: [
        'Span-level breakdown from user prompt to final streamed byte.',
        'Track token consumption, compute costs, and TTFT (time to first token).',
        'Inspect intermediate state payloads across LangGraph cycles.',
        'Export OpenTelemetry compliant traces to Datadog or Prometheus.'
      ]
    },
    {
      id: 'guardrails',
      title: 'Safety with guardrails',
      description: 'Use NVIDIA NeMo Guardrails to detect risks, enforce policies, and keep responses safe.',
      icon: ShieldCheck,
      color: 'emerald',
      tag: 'NVIDIA NeMo',
      points: [
        'Colang 2.0 programmable input/output policies.',
        'Pre-retrieval prompt injection and jailbreak blocking.',
        'Automated PII detection and regex-based redaction.',
        'Strict topical boundaries and domain-grounding validation.'
      ]
    },
    {
      id: 'rag',
      title: 'Advanced RAG pipeline',
      description: 'Vector search, Flash Reranker, hybrid search, and custom knowledge sources.',
      icon: Database,
      color: 'purple',
      tag: 'Hybrid Search',
      points: [
        'Dense vector embeddings combined with BM25 sparse keyword ranking.',
        'Flash Cross-Encoder reranker to filter out irrelevant chunks.',
        'Document chunk hierarchy with parent-child chunk mapping.',
        'Multi-vector metadata filtering in PostgreSQL pgvector.'
      ]
    },
    {
      id: 'evaluation',
      title: 'Continuous evaluation',
      description: 'Evaluate answers with RAGAS (golden datasets, LLM-as-a-judge, metrics and dashboards).',
      icon: Award,
      color: 'amber',
      tag: 'RAGAS & CI/CD',
      points: [
        'Faithfulness scoring to measure groundedness against context.',
        'Answer Relevancy to verify direct alignment with query intent.',
        'Context Precision and Recall metrics for chunk retrieval quality.',
        'Automated pull-request blockers for regression detection.'
      ]
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-24 border-t border-slate-100" id="why-agent-os" data-purpose="why-agent-os">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Copy & Link */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            <span className="text-[11.5px] font-bold tracking-wider uppercase text-slate-400 mb-3">
              WHY KNOWLEDGEOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-5">
              Full control over your<br className="hidden sm:inline" /> AI assistant.
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-7 max-w-md">
              Everything you need to build reliable, safe, and high-performing agentic RAG applications — with complete visibility into what your AI is doing.
            </p>
            <button 
              onClick={onOpenLiveDemo}
              className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
            >
              <span>Explore all features</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat) => {
              const Icon = feat.icon;
              const isBlue = feat.color === 'blue';
              const isEmerald = feat.color === 'emerald';
              const isPurple = feat.color === 'purple';
              const isAmber = feat.color === 'amber';

              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveFeature({
                    title: feat.title,
                    description: feat.description,
                    points: feat.points,
                    tag: feat.tag
                  })}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${
                      isBlue ? 'bg-blue-50 border border-blue-100/80 text-blue-600' :
                      isEmerald ? 'bg-emerald-50 border border-emerald-100/80 text-emerald-600' :
                      isPurple ? 'bg-purple-50 border border-purple-100/80 text-purple-600' :
                      'bg-amber-50 border border-amber-100/80 text-amber-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-[15.5px] font-bold text-slate-900 mb-2">{feat.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">{feat.tag}</span>
                    <span className={`text-base font-semibold group-hover:translate-x-1 transition-all ${
                      isBlue ? 'text-slate-400 group-hover:text-blue-600' :
                      isEmerald ? 'text-slate-400 group-hover:text-emerald-600' :
                      isPurple ? 'text-slate-400 group-hover:text-purple-600' :
                      'text-slate-400 group-hover:text-amber-600'
                    }`}>
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Feature Deep Dive Modal */}
      {activeFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveFeature(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1">
              {activeFeature.tag}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{activeFeature.title}</h3>
            <p className="text-sm text-slate-600 mb-5">{activeFeature.description}</p>
            
            <div className="space-y-2.5 mb-6">
              {activeFeature.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveFeature(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveFeature(null);
                  onOpenLiveDemo();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <span>Try in Live Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
