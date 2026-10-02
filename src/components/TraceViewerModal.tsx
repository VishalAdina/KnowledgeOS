import React from 'react';
import { X, CheckCircle, ShieldCheck, Zap, Database, ArrowRight } from 'lucide-react';
import { RECENT_TRACES_TABLE } from '../data/mockData';

interface TraceViewerModalProps {
  traceId: string | null;
  onClose: () => void;
  onLaunchInStudio: (query: string) => void;
}

export const TraceViewerModal: React.FC<TraceViewerModalProps> = ({
  traceId,
  onClose,
  onLaunchInStudio
}) => {
  if (!traceId) return null;

  const trace = RECENT_TRACES_TABLE.find(t => t.id === traceId) || RECENT_TRACES_TABLE[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">
            Trace #{trace.id}
          </span>
          <span className="text-xs text-slate-400">• {trace.time}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">{trace.fullQuery}</h3>

        <div className="grid grid-cols-4 gap-2 mb-5">
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="text-[10px] text-slate-500 font-medium">Steps</div>
            <div className="text-sm font-bold text-slate-900">{trace.steps}</div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="text-[10px] text-slate-500 font-medium">Total Latency</div>
            <div className="text-sm font-bold text-slate-900 font-mono">{trace.latency}</div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="text-[10px] text-slate-500 font-medium">Tokens</div>
            <div className="text-sm font-bold text-slate-900 font-mono">{trace.tokens}</div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="text-[10px] text-slate-500 font-medium">Eval Score</div>
            <div className="text-sm font-bold text-emerald-600 font-mono">{trace.evalScore}</div>
          </div>
        </div>

        {/* Steps breakdown list */}
        <div className="text-xs font-bold text-slate-800 mb-2">Pipeline Execution Steps:</div>
        <div className="space-y-1.5 mb-5 max-h-48 overflow-y-auto pr-1">
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-800">1. Intent Classification</span>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">89 ms</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-800">2. NeMo Guardrails Policy Check</span>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">Passed • 76 ms</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="font-semibold text-slate-800">3. LangGraph Plan & Route</span>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">290 ms</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <span className="font-semibold text-slate-800">4. Hybrid Retrieval + Flash Reranker</span>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">Top 6 chunks</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-800">5. Portkey LLM Gateway Stream</span>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">{trace.latency}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
          <button
            onClick={() => {
              onLaunchInStudio(trace.fullQuery);
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <span>Inspect in Live Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
