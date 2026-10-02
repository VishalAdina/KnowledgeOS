import React, { useState } from 'react';
import { 
  X, CheckCircle, ShieldCheck, Database, Award, ExternalLink, Clock, Send, Check, 
  BarChart3, Settings, Sliders, Bell, FileText, Upload, Plus, AlertTriangle, Layers,
  Terminal, ArrowRight, Zap, Cpu
} from 'lucide-react';
import { RetrievalSource } from '../types';
import { RECENT_TRACES_TABLE } from '../data/mockData';

export const SourceViewerModal: React.FC<{
  source: RetrievalSource | null;
  onClose: () => void;
}> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            Retrieved Source
          </span>
          <span className="text-xs font-mono text-emerald-600 font-bold">
            Relevance Score: {source.score}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">{source.title}</h3>
        <a 
          href={`https://${source.url}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-4"
        >
          <span>{source.url}</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed font-sans mb-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Chunk Excerpt:</div>
          <p className="italic">{source.snippet}</p>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
          <span>Vector Similarity Algorithm: Cosine + Flash Cross-Encoder Reranker</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-900 text-white font-medium rounded-lg text-xs hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const GuardrailsDetailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">NVIDIA NeMo Guardrails Report</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Colang 2.0 active rail evaluation diagnostics and security posture.
        </p>

        <div className="space-y-3 mb-5">
          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-900">Input Safety Rail</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">PASSED</span>
            </div>
            <p className="text-[11.5px] text-emerald-800">
              Evaluated 0 jailbreak attempts, 0 prompt leaks, and 0 unauthorized privilege escalations.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-900">Sensitive Data (PII) Redaction</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">PASSED</span>
            </div>
            <p className="text-[11.5px] text-emerald-800">
              Scanned query and context with regex & NER models. 0 API keys, credentials, or PII exposed.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-900">Topic Steering & Domain Boundaries</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">WITHIN DOMAIN</span>
            </div>
            <p className="text-[11.5px] text-emerald-800">
              User inquiry falls strictly within authorized knowledge base parameters.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-900">Output Hallucination & Factuality</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">SAFE (100%)</span>
            </div>
            <p className="text-[11.5px] text-emerald-800">
              Generated tokens strictly substantiated by the 6 retrieved document chunks.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const RagasEvaluationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-slate-900">RAGAS Evaluation Deep-Dive</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Automated LLM-as-a-judge scores computed for the active execution trace.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="text-xs font-bold text-slate-800 mb-0.5">Faithfulness (0.92)</div>
            <p className="text-[10.5px] text-slate-500 mb-2">
              Measures the factual consistency of the generated answer against the retrieved context chunks.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="text-xs font-bold text-slate-800 mb-0.5">Answer Relevancy (0.89)</div>
            <p className="text-[10.5px] text-slate-500 mb-2">
              Assesses how directly and completely the synthesized answer addresses the user's initial question.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '89%' }}></div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="text-xs font-bold text-slate-800 mb-0.5">Context Precision (0.87)</div>
            <p className="text-[10.5px] text-slate-500 mb-2">
              Signal-to-noise ratio evaluating whether the ground truth relevant chunks were ranked at the top.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '87%' }}></div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="text-xs font-bold text-slate-800 mb-0.5">Context Recall (0.85)</div>
            <p className="text-[10.5px] text-slate-500 mb-2">
              Measures the proportion of required contextual knowledge successfully retrieved from the vector store.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span>Judge Model: gpt-4o-mini (Zero-shot)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const TracesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectTrace: (query: string) => void;
}> = ({ isOpen, onClose, onSelectTrace }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Execution Traces & Spans</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          OpenTelemetry distributed spans, model latency, and token cost breakdown.
        </p>

        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
          {RECENT_TRACES_TABLE.map((tr) => (
            <div key={tr.id} className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-blue-600 font-bold bg-blue-50 px-1.5 rounded">{tr.id}</span>
                  <span className="text-xs font-bold text-slate-900">{tr.fullQuery}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                  <span>Latency: <strong className="font-mono text-slate-700">{tr.latency}</strong></span>
                  <span>Tokens: <strong className="font-mono text-slate-700">{tr.tokens}</strong></span>
                  <span>Model: <strong className="text-slate-700">{tr.model}</strong></span>
                  <span>Score: <strong className="text-emerald-600 font-mono">{tr.evalScore}</strong></span>
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectTrace(tr.fullQuery);
                  onClose();
                }}
                className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const DatasetsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-900">Golden Test Datasets</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Curated evaluation datasets with ground truth context for synthetic regression testing.
        </p>

        <div className="space-y-3 mb-5">
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-900">k8s-production-qa-v1</span>
              <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">250 Q&A Pairs</span>
            </div>
            <p className="text-xs text-slate-500">
              Technical queries covering container lifecycle, ingress networking, statefulsets, and RBAC policies.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-900">adversarial-jailbreak-suite</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">120 Tests</span>
            </div>
            <p className="text-xs text-slate-500">
              Prompt injections, system prompt leak attempts, and roleplay bypass tests for NeMo Guardrails.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-900">ragas-golden-eval-synthetic</span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">500 Contexts</span>
            </div>
            <p className="text-xs text-slate-500">
              Synthetic benchmark data measuring context precision and recall under simulated noisy chunks.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Analytics & Latency Distribution</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Real-time compute performance, Portkey cache savings, and token utilization.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold">p50 Latency</span>
            <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">240 ms</div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold">p95 Latency</span>
            <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">1.1 s</div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Cache Hit Rate</span>
            <div className="text-lg font-bold text-emerald-600 font-mono mt-0.5">42.8%</div>
          </div>
        </div>

        <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 mb-5 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            Portkey Gateway Optimization
          </div>
          <p className="text-[11.5px] text-blue-700 leading-relaxed">
            Semantic caching prevented 18,290 duplicate LLM generations this week, saving an estimated $1,420 in API costs.
          </p>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const KnowledgeBaseModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-slate-900">Knowledge Base & Vector Indexes</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Active vector stores connected to your KnowledgeOS RAG pipeline.
        </p>

        <div className="space-y-3 mb-5">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">k8s-docs-v1.30</div>
              <div className="text-[11px] text-slate-500">14,280 chunks • 1536 dim • pgvector HNSW</div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Synced</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">cloud-reference-architecture</div>
              <div className="text-[11px] text-slate-500">8,940 chunks • Cohere Embed v3 • Hybrid BM25</div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Synced</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">enterprise-runbooks</div>
              <div className="text-[11px] text-slate-500">3,410 chunks • Parent-Child Chunking</div>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Live Watch</span>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const SettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">KnowledgeOS Platform Settings</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Cluster configuration, environment variables, and telemetry endpoints.
        </p>

        <div className="space-y-3.5 mb-5 text-xs text-slate-700">
          <div>
            <label className="font-semibold block mb-1 text-slate-800">Environment Target</label>
            <div className="px-3 py-2 bg-slate-100 rounded-lg font-mono text-slate-600 text-[11px]">
              production-us-east-1.knowledgeos.internal
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-800">NeMo Guardrails Policy Engine</label>
            <div className="px-3 py-2 bg-slate-100 rounded-lg font-mono text-slate-600 text-[11px]">
              colang-v2.0-secure-core
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-800">Telemetry Exporter (OTel)</label>
            <div className="px-3 py-2 bg-slate-100 rounded-lg font-mono text-slate-600 text-[11px]">
              grpc://otel-collector.prod:4317
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const FilterSettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [topK, setTopK] = useState(6);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.82);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">RAG Retrieval Parameters</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Adjust similarity threshold and reranking top-k for active session.
        </p>

        <div className="space-y-4 mb-5 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-slate-700">Top-K Reranked Docs</span>
              <span className="font-mono font-bold text-blue-600">{topK}</span>
            </div>
            <input 
              type="range" 
              min={3} 
              max={15} 
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-slate-700">Similarity Threshold</span>
              <span className="font-mono font-bold text-blue-600">{similarityThreshold}</span>
            </div>
            <input 
              type="range" 
              min={0.60} 
              max={0.95} 
              step={0.01}
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export const AttachmentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAttachFile: (fileName: string) => void;
}> = ({ isOpen, onClose, onAttachFile }) => {
  if (!isOpen) return null;

  const sampleFiles = [
    { name: 'kubernetes-architecture-overview.pdf', size: '2.4 MB' },
    { name: 'helm-values-production.yaml', size: '48 KB' },
    { name: 'agent-os-openapi-spec.json', size: '180 KB' },
    { name: 'nemo-guardrails-config.co', size: '12 KB' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">Attach Document or Context</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Select documentation from your workspace to inject into active prompt context.
        </p>

        <div className="space-y-2 mb-5">
          {sampleFiles.map((file, i) => (
            <button
              key={i}
              onClick={() => {
                onAttachFile(file.name);
                onClose();
              }}
              className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-800 truncate">{file.name}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{file.size}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactSalesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', scale: '100k-1M' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Request Received</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              An enterprise solutions architect will contact you within 2 business hours with custom pricing and private cloud sandbox credentials.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1">KnowledgeOS Enterprise</div>
              <h3 className="text-xl font-bold text-slate-900">Talk to Sales & Engineering</h3>
              <p className="text-xs text-slate-500 mt-1">
                Deploy KnowledgeOS in your VPC, AWS GovCloud, or on-premise Kubernetes cluster.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="Sarah Chen"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
              <input
                required
                type="email"
                placeholder="sarah@company.ai"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
              <input
                required
                type="text"
                placeholder="CloudScale Inc."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Monthly Query Volume</label>
              <select
                value={formData.scale}
                onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="10k-100k">10,000 – 100,000 queries / mo</option>
                <option value="100k-1M">100,000 – 1,000,000 queries / mo</option>
                <option value="1M-10M">1,000,000 – 10,000,000 queries / mo</option>
                <option value="10M+">10,000,000+ queries / mo (Dedicated cluster)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm cursor-pointer"
              >
                Request Enterprise Access
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
