import React, { useState } from 'react';
import { HOURLY_HISTOGRAM_DATA, RECENT_TRACES_TABLE } from '../data/mockData';
import { ArrowRight, Check, ChevronDown, ExternalLink, Filter, TrendingUp, TrendingDown, Clock, ShieldAlert, DollarSign } from 'lucide-react';

interface TelemetryDashboardProps {
  onOpenLiveDemo: () => void;
  onOpenTraceDetail: (traceId: string) => void;
  onOpenDocs: () => void;
}

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({
  onOpenLiveDemo,
  onOpenTraceDetail,
  onOpenDocs
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'traces' | 'evaluations' | 'guardrails' | 'datasets'>('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [hoveredBar, setHoveredBar] = useState<{ hour: string; requests: number } | null>({
    hour: '12:00 - 13:00',
    requests: 42207
  });

  return (
    <section className="py-20 lg:py-24 bg-[#f8faff] border-t border-slate-100" id="see-it-action" data-purpose="see-it-in-action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Copy & Checklist */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11.5px] font-bold tracking-wider uppercase text-slate-400 mb-3">
              SEE IT IN ACTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
              Complete visibility from query to response.
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-lg">
              Inspect traces, guardrail decisions, retrieved sources, model calls, and evaluation results — all in one place.
            </p>

            {/* Checkmarks List */}
            <ul className="space-y-3.5 mb-9 text-[13.5px] text-slate-700 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Live trace timeline</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Token usage and latency</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Guardrail status and blocked content</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>RAGAS evaluation scores</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Retrieved sources with relevance scores</span>
              </li>
            </ul>

            {/* CTA Links */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onOpenLiveDemo}
                className="inline-flex items-center gap-2 bg-[#091529] hover:bg-slate-900 text-white text-[13.5px] font-semibold px-5 py-3 rounded-lg shadow-sm transition-all cursor-pointer hover:shadow-md"
              >
                <span>Try the live demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={onOpenDocs}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-800 hover:text-blue-600 transition-colors ml-2 cursor-pointer"
              >
                <span>View documentation</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Observability Dashboard Card */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08)] p-5">
              
              {/* Top Tab Navigation Bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
                <div className="flex items-center gap-1 sm:gap-2 text-[11.5px]">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1 rounded-md transition cursor-pointer font-semibold ${
                      activeTab === 'overview' ? 'bg-blue-50 text-blue-600 border border-blue-200/60' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('traces')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                      activeTab === 'traces' ? 'bg-blue-50 text-blue-600 border border-blue-200/60 font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Traces
                  </button>
                  <button 
                    onClick={() => setActiveTab('evaluations')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                      activeTab === 'evaluations' ? 'bg-blue-50 text-blue-600 border border-blue-200/60 font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Evaluations
                  </button>
                  <button 
                    onClick={() => setActiveTab('guardrails')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                      activeTab === 'guardrails' ? 'bg-blue-50 text-blue-600 border border-blue-200/60 font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Guardrails
                  </button>
                  <button 
                    onClick={() => setActiveTab('datasets')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                      activeTab === 'datasets' ? 'bg-blue-50 text-blue-600 border border-blue-200/60 font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Datasets
                  </button>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Production</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              </div>

              {/* Metric KPI Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition">
                  <div className="text-[11px] text-slate-500 font-medium mb-1">Total Requests</div>
                  <div className="text-lg font-bold text-slate-900 tabular-nums">1.24M</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" /> 10%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition">
                  <div className="text-[11px] text-slate-500 font-medium mb-1">Avg Latency</div>
                  <div className="text-lg font-bold text-slate-900 tabular-nums">342 ms</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
                    <TrendingDown className="w-2.5 h-2.5" /> 18%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition">
                  <div className="text-[11px] text-slate-500 font-medium mb-1">Guardrail Blocks</div>
                  <div className="text-lg font-bold text-slate-900 tabular-nums">0.08%</div>
                  <div className="text-[10px] text-rose-500 font-semibold mt-0.5 flex items-center gap-0.5">
                    <TrendingDown className="w-2.5 h-2.5" /> 42%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition">
                  <div className="text-[11px] text-slate-500 font-medium mb-1">Total Cost</div>
                  <div className="text-lg font-bold text-slate-900 tabular-nums">$2,483</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" /> 6%
                  </div>
                </div>
              </div>

              {/* Request Volume Chart Section */}
              <div className="border border-slate-100 rounded-xl p-3.5 mb-5 bg-[#fcfdfe]">
                <div className="flex items-center justify-between mb-3 text-[11.5px]">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800">Request volume</span>
                    {hoveredBar && (
                      <span className="hidden sm:inline-block bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] text-slate-600 shadow-2xs">
                        <strong className="text-slate-900 tabular-nums">{hoveredBar.requests.toLocaleString()} requests</strong> • {hoveredBar.hour}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/60 text-[10.5px]">
                    <button 
                      onClick={() => setTimeRange('24h')}
                      className={`px-2 py-0.5 rounded transition ${timeRange === '24h' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-500'}`}
                    >
                      24h
                    </button>
                    <button 
                      onClick={() => setTimeRange('7d')}
                      className={`px-2 py-0.5 rounded transition ${timeRange === '7d' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-500'}`}
                    >
                      7d
                    </button>
                    <button 
                      onClick={() => setTimeRange('30d')}
                      className={`px-2 py-0.5 rounded transition ${timeRange === '30d' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-500'}`}
                    >
                      30d
                    </button>
                  </div>
                </div>

                {/* Histogram SVG Mock with Interactive Hover */}
                <div className="h-20 w-full flex items-end gap-1 sm:gap-1.5 pt-2 px-1">
                  {HOURLY_HISTOGRAM_DATA.map((bar, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredBar({ hour: bar.hour, requests: bar.requests })}
                      className={`flex-1 rounded-t transition-all cursor-pointer ${
                        bar.isPeak
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-xs'
                          : bar.heightPct > 65
                          ? 'bg-blue-300 hover:bg-blue-500'
                          : 'bg-blue-100 hover:bg-blue-400'
                      }`}
                      style={{ height: `${bar.heightPct}%` }}
                      title={`${bar.hour}: ${bar.requests.toLocaleString()} requests`}
                    />
                  ))}
                </div>

                <div className="flex justify-between text-[9.5px] text-slate-400 mt-2 px-1 font-mono">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span className="font-bold text-blue-600">12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                </div>
              </div>

              {/* Recent Traces Table */}
              <div className="overflow-x-auto">
                <div className="flex items-center justify-between mb-2 text-[11.5px]">
                  <span className="font-bold text-slate-800">Recent traces</span>
                  <button 
                    onClick={onOpenLiveDemo}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all in Console</span>
                    <span>→</span>
                  </button>
                </div>

                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase font-semibold">
                      <th className="pb-1.5 font-medium">Query</th>
                      <th className="pb-1.5 font-medium">Steps</th>
                      <th className="pb-1.5 font-medium">Latency</th>
                      <th className="pb-1.5 font-medium">Guardrails</th>
                      <th className="pb-1.5 font-medium">Eval Score</th>
                      <th className="pb-1.5 font-medium text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                    {RECENT_TRACES_TABLE.map((row) => (
                      <tr 
                        key={row.id} 
                        onClick={() => onOpenTraceDetail(row.id)}
                        className="hover:bg-slate-50 transition cursor-pointer group"
                      >
                        <td className="py-2 text-slate-900 font-medium truncate max-w-[140px] group-hover:text-blue-600">
                          {row.query}
                        </td>
                        <td className="py-2 text-slate-500 tabular-nums">{row.steps}</td>
                        <td className="py-2 text-slate-500 font-mono text-[10px] tabular-nums">{row.latency}</td>
                        <td className="py-2">
                          {row.guardrailType === 'pass' ? (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-600 font-semibold border border-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-rose-50 text-rose-600 font-semibold border border-rose-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Flagged
                            </span>
                          )}
                        </td>
                        <td className="py-2 font-mono text-slate-700 tabular-nums">{row.evalScore}</td>
                        <td className="py-2 text-slate-400 text-right text-[10px]">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
