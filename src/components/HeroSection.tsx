import React, { useState } from 'react';
import { ArrowRight, Check, Search, Bell, Plus, Play, Sparkles, Database, ShieldCheck, BarChart3, Settings, Sliders, ExternalLink } from 'lucide-react';
import { KnowledgeOSLogo } from './KnowledgeOSLogo';

interface HeroSectionProps {
  onOpenLiveDemo: () => void;
  onOpenAuth: () => void;
  onSelectSampleQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenLiveDemo,
  onOpenAuth,
  onSelectSampleQuery
}) => {
  const [heroTab, setHeroTab] = useState<'response' | 'sources' | 'traces' | 'evaluations'>('response');
  const [inputVal, setInputVal] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(5); // all completed initially

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      onOpenLiveDemo();
      return;
    }
    onSelectSampleQuery(inputVal);
    onOpenLiveDemo();
  };

  return (
    <main className="relative hero-glow overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* LEFT HERO COLUMN */}
          <div className="lg:col-span-5 pt-2 lg:pt-6 flex flex-col items-start" data-purpose="hero-copy">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100/90 text-[12.5px] font-medium text-slate-700 mb-6 shadow-2xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Production ready
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Agentic RAG Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-5">
              Production-Grade<br />
              <span className="text-[#1e50ff]">Agentic RAG</span><br />
              for Real-World Teams.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-[16.5px] text-slate-500 leading-relaxed max-w-lg mb-8">
              Build, deploy, and monitor AI assistants with advanced retrieval, guardrails, observability, evaluations, and enterprise controls — from first prompt to full-scale production.
            </p>

            {/* Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-7">
              <button 
                onClick={onOpenLiveDemo}
                className="inline-flex items-center justify-center gap-2 bg-[#091529] hover:bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-sm transition-all cursor-pointer hover:shadow-md hover:scale-[1.01]"
              >
                <span>Get started free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={onOpenLiveDemo}
                className="inline-flex items-center justify-center gap-2 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 text-sm font-medium px-5 py-3 rounded-lg transition-all shadow-sm cursor-pointer hover:border-slate-300"
              >
                <Play className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                <span>View live demo</span>
              </button>
            </div>

            {/* Trust Badges Checkmarks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[12.5px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                <span>Setup in minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                <span>Works with your data</span>
              </div>
            </div>

            {/* Quick Prompt Jump Pills */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 w-full max-w-lg">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Try a production test query
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['What is Kubernetes?', 'Explain LangGraph', 'How does RAG work?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInputVal(q);
                      onSelectSampleQuery(q);
                      onOpenLiveDemo();
                    }}
                    className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 px-2.5 py-1 rounded-md transition cursor-pointer shadow-2xs font-medium"
                  >
                    {q} →
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT MOCKUP COLUMN */}
          <div className="lg:col-span-7 w-full" data-purpose="dashboard-mockup">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08)] overflow-hidden transition-all hover:shadow-[0_16px_45px_-12px_rgba(0,0,0,0.12)]">
              
              {/* Dashboard Card Top Navbar */}
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
                {/* Dashboard Logo */}
                <div className="flex items-center gap-2 pl-1">
                  <KnowledgeOSLogo size={18} />
                  <span className="text-[13px] font-bold text-slate-900">KnowledgeOS</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono font-medium">v2.4</span>
                </div>

                {/* Top Right Controls */}
                <div className="flex items-center gap-2.5">
                  {/* Environment Indicator Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-50 border border-slate-200/80 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Production</span>
                  </div>

                  {/* Search Input Pill */}
                  <div className="relative hidden sm:block w-48 md:w-56">
                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Search className="w-3 h-3" />
                    </span>
                    <input 
                      className="w-full pl-7 pr-2 py-1 text-[11px] bg-slate-50/80 border border-slate-200 rounded-md placeholder-slate-400 text-slate-700 focus:outline-none" 
                      placeholder="Search traces, datasets..." 
                      readOnly 
                      type="text" 
                    />
                  </div>

                  {/* Notification Bell */}
                  <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <Bell className="w-3.5 h-3.5" />
                  </button>

                  {/* User Avatar Circle */}
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                    A
                  </div>
                </div>
              </div>

              {/* Inner Layout (Left Nav + Main Content) */}
              <div className="grid grid-cols-12 min-h-[385px]">
                
                {/* Mini Sidebar Navigation */}
                <aside className="col-span-3 border-r border-slate-100 p-3 bg-white flex flex-col justify-between" data-purpose="inner-sidebar">
                  <div className="space-y-1">
                    {/* New Chat Button */}
                    <button 
                      onClick={onOpenLiveDemo}
                      className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-50 text-blue-600 text-[11.5px] font-semibold mb-3 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-600" />
                      <span>New chat</span>
                    </button>

                    {/* Sidebar Links */}
                    <div className="space-y-0.5">
                      <button onClick={onOpenLiveDemo} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-left transition cursor-pointer">
                        <BarChart3 className="w-3 h-3 text-slate-400" />
                        <span>Traces</span>
                      </button>
                      <button onClick={onOpenLiveDemo} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-left transition cursor-pointer">
                        <ShieldCheck className="w-3 h-3 text-slate-400" />
                        <span>Evaluations</span>
                      </button>
                      <button onClick={onOpenLiveDemo} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-left transition cursor-pointer">
                        <ShieldCheck className="w-3 h-3 text-slate-400" />
                        <span>Guardrails</span>
                      </button>
                      <button onClick={onOpenLiveDemo} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-left transition cursor-pointer">
                        <Database className="w-3 h-3 text-slate-400" />
                        <span>Datasets</span>
                      </button>
                      <button onClick={onOpenLiveDemo} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-left transition cursor-pointer">
                        <BarChart3 className="w-3 h-3 text-slate-400" />
                        <span>Analytics</span>
                      </button>
                    </div>
                  </div>

                  {/* Settings Bottom Item */}
                  <button onClick={onOpenLiveDemo} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 pt-3 border-t border-slate-100 text-left transition cursor-pointer">
                    <Settings className="w-3 h-3 text-slate-400" />
                    <span>Settings</span>
                  </button>
                </aside>

                {/* Main Chat & Pipeline Area */}
                <section className="col-span-9 p-3.5 flex flex-col justify-between bg-white" data-purpose="chat-execution-panel">
                  <div>
                    {/* User Message Bubble */}
                    <div className="mb-3.5 flex items-center justify-between bg-[#f2f7fd] border border-blue-100/60 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 text-[10px] font-bold">
                          A
                        </div>
                        <span className="text-[12.5px] font-medium text-slate-800">What is Kubernetes?</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">12.4s</span>
                    </div>

                    {/* Tabs Row */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-1.5 mb-3 text-[11.5px]">
                      <button 
                        onClick={() => setHeroTab('response')}
                        className={`font-semibold pb-1.5 -mb-1.5 transition cursor-pointer ${
                          heroTab === 'response' 
                            ? 'text-blue-600 border-b-2 border-blue-600' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Response
                      </button>
                      <button 
                        onClick={() => setHeroTab('sources')}
                        className={`flex items-center gap-1 pb-1.5 -mb-1.5 transition cursor-pointer ${
                          heroTab === 'sources' 
                            ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Sources <span className="bg-slate-100 text-slate-600 text-[9px] px-1 rounded font-semibold">5</span>
                      </button>
                      <button 
                        onClick={() => setHeroTab('traces')}
                        className={`pb-1.5 -mb-1.5 transition cursor-pointer ${
                          heroTab === 'traces' 
                            ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Traces
                      </button>
                      <button 
                        onClick={() => setHeroTab('evaluations')}
                        className={`pb-1.5 -mb-1.5 transition cursor-pointer ${
                          heroTab === 'evaluations' 
                            ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Evaluations
                      </button>
                    </div>

                    {/* Tab Views */}
                    {heroTab === 'response' && (
                      <div className="grid grid-cols-12 gap-3 items-start text-[11px]">
                        {/* Left Execution Steps Timeline */}
                        <div className="col-span-5 border-r border-slate-100 pr-2 space-y-2.5" data-purpose="execution-timeline">
                          <div className="flex items-start gap-2 relative">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></div>
                            <div>
                              <p className="font-semibold text-slate-800 leading-tight text-[11px]">Intent classification</p>
                              <p className="text-[9.5px] text-slate-400 font-mono">120 ms</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 relative">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></div>
                            <div>
                              <p className="font-semibold text-slate-800 leading-tight text-[11px]">Guardrails check</p>
                              <p className="text-[9.5px] text-slate-400 font-mono">Passed • 89 ms</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 relative">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                            <div>
                              <p className="font-semibold text-slate-800 leading-tight text-[11px]">Planner</p>
                              <p className="text-[9.5px] text-slate-400 font-mono">Created plan • 342 ms</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 relative">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></div>
                            <div>
                              <p className="font-semibold text-slate-800 leading-tight text-[11px]">Retrieval (RAG)</p>
                              <p className="text-[9.5px] text-slate-400 font-mono">Top 5 docs • 612 ms</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 relative">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></div>
                            <div>
                              <p className="font-semibold text-slate-800 leading-tight text-[11px]">Reranker (Flash)</p>
                              <p className="text-[9.5px] text-slate-400 font-mono">Re-ranked • 214 ms</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 relative">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                            <div>
                              <p className="font-semibold text-slate-800 leading-tight text-[11px]">Response generation</p>
                              <p className="text-[9.5px] text-slate-400 font-mono">Streaming • 721 ms</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Generated Answer Body */}
                        <div className="col-span-7 pl-1 text-slate-600 leading-relaxed text-[11.5px]" data-purpose="answer-content">
                          <p className="mb-2 text-slate-700">
                            Kubernetes is an open-source container orchestration platform. It helps you automatically deploy, manage, and scale containerized applications across a cluster of servers.
                          </p>
                          <p className="font-bold text-slate-800 mb-1 text-[11px]">Key capabilities:</p>
                          <ul className="space-y-1 text-slate-600 text-[10.5px]">
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                              <span>Automated deployment and scaling</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                              <span>Self-healing and high availability</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                              <span>Load balancing and service discovery</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                              <span>Works across cloud, on-premise and hybrid environments</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {heroTab === 'sources' && (
                      <div className="space-y-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-slate-800">Kubernetes Official Documentation</div>
                            <div className="text-[10px] text-slate-400">kubernetes.io/docs/concepts/overview</div>
                          </div>
                          <span className="font-mono text-emerald-600 font-bold">0.92</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-slate-800">CNCF - What is Kubernetes?</div>
                            <div className="text-[10px] text-slate-400">cncf.io/reports/k8s-architecture</div>
                          </div>
                          <span className="font-mono text-emerald-600 font-bold">0.88</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-slate-800">Red Hat Kubernetes Architecture Guide</div>
                            <div className="text-[10px] text-slate-400">redhat.com/topics/containers</div>
                          </div>
                          <span className="font-mono text-emerald-600 font-bold">0.84</span>
                        </div>
                      </div>
                    )}

                    {heroTab === 'traces' && (
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                          <span className="font-medium text-slate-700">Total Tokens</span>
                          <span className="font-mono text-slate-900 font-bold">1,802 tokens</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                          <span className="font-medium text-slate-700">Estimated Cost</span>
                          <span className="font-mono text-slate-900 font-bold">$0.0084</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                          <span className="font-medium text-slate-700">Model Engine</span>
                          <span className="font-mono text-blue-600 font-bold">gpt-4o via Portkey</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                          <span className="font-medium text-slate-700">NeMo Policy Rules</span>
                          <span className="text-emerald-600 font-bold">Passed (0 blocks)</span>
                        </div>
                      </div>
                    )}

                    {heroTab === 'evaluations' && (
                      <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                        <div className="p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-500">Faithfulness</span>
                          <div className="text-sm font-bold text-slate-900">0.92</div>
                          <div className="w-full bg-slate-200 h-1 rounded mt-1 overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <div className="p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-500">Answer Relevancy</span>
                          <div className="text-sm font-bold text-slate-900">0.89</div>
                          <div className="w-full bg-slate-200 h-1 rounded mt-1 overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: '89%' }}></div>
                          </div>
                        </div>
                        <div className="p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-500">Context Precision</span>
                          <div className="text-sm font-bold text-slate-900">0.87</div>
                          <div className="w-full bg-slate-200 h-1 rounded mt-1 overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                        <div className="p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-500">Context Recall</span>
                          <div className="text-sm font-bold text-slate-900">0.85</div>
                          <div className="w-full bg-slate-200 h-1 rounded mt-1 overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Query Footer Field inside Mockup */}
                  <form onSubmit={handleSimulateSubmit} className="mt-4 pt-2 border-t border-slate-100 flex items-center gap-2">
                    <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-500 focus-within:border-blue-400 focus-within:bg-white transition">
                      <Sliders className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Ask anything about your documentation..."
                        className="bg-transparent border-0 text-[11px] text-slate-700 w-full focus:outline-none placeholder-slate-400"
                      />
                      <div className="ml-auto flex items-center gap-1 text-[10px] text-slate-600 bg-white border border-slate-200/80 px-1.5 py-0.5 rounded flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Production</span>
                      </div>
                    </div>

                    {/* Send Action Button */}
                    <button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-sm"
                      title="Run query"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </section>
              </div>
            </div>
          </div>
          {/* END RIGHT MOCKUP COLUMN */}

        </div>
      </div>
    </main>
  );
};
