import React, { useState, useEffect } from 'react';
import { CHAT_SESSIONS } from '../data/mockData';
import { ChatSession, RetrievalSource } from '../types';
import { 
  Plus, BarChart3, ShieldCheck, Database, Settings, BookOpen, 
  MessageSquare, Search, Bell, ChevronDown, Check, ThumbsUp, ThumbsDown, 
  Copy, ArrowRight, Zap, FileText, SlidersHorizontal, Lock, CheckCircle2,
  ExternalLink, Sparkles, RefreshCw, Eye, ArrowLeft, Clock, X, Paperclip, ChevronUp
} from 'lucide-react';
import { 
  SourceViewerModal, GuardrailsDetailModal, RagasEvaluationModal,
  TracesModal, DatasetsModal, AnalyticsModal, KnowledgeBaseModal, 
  SettingsModal, FilterSettingsModal, AttachmentModal
} from './ModalDialogs';
import { KnowledgeOSLogo } from './KnowledgeOSLogo';

interface TelemetryStudioProps {
  onBackToLanding: () => void;
  selectedChatId?: string;
  onOpenSearch: () => void;
}

export const TelemetryStudio: React.FC<TelemetryStudioProps> = ({
  onBackToLanding,
  selectedChatId = 'k8s-query',
  onOpenSearch
}) => {
  const [activeChatId, setActiveChatId] = useState<string>(selectedChatId);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [ragEnabled, setRagEnabled] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState('Production');
  const [copiedState, setCopiedState] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(null);

  // All Interactive Modals State
  const [viewingSource, setViewingSource] = useState<RetrievalSource | null>(null);
  const [guardrailsModalOpen, setGuardrailsModalOpen] = useState(false);
  const [ragasModalOpen, setRagasModalOpen] = useState(false);
  const [tracesModalOpen, setTracesModalOpen] = useState(false);
  const [datasetsModalOpen, setDatasetsModalOpen] = useState(false);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [knowledgeBaseModalOpen, setKnowledgeBaseModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [filterSettingsModalOpen, setFilterSettingsModalOpen] = useState(false);
  const [attachmentModalOpen, setAttachmentModalOpen] = useState(false);

  const [isExecuting, setIsExecuting] = useState(false);
  const [liveExecutionStep, setLiveExecutionStep] = useState(5);

  useEffect(() => {
    if (selectedChatId) {
      setActiveChatId(selectedChatId);
    }
  }, [selectedChatId]);

  const activeSession: ChatSession = 
    CHAT_SESSIONS.find((c) => c.id === activeChatId) || CHAT_SESSIONS[0];

  const handleCopyResponse = () => {
    const fullText = activeSession.answerText.join('\n\n');
    navigator.clipboard?.writeText(fullText);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleRunNewQuery = (queryText: string) => {
    if (!queryText.trim()) return;
    setIsExecuting(true);
    setLiveExecutionStep(1);

    // Live step-by-step pipeline execution animation
    setTimeout(() => setLiveExecutionStep(2), 400);
    setTimeout(() => setLiveExecutionStep(3), 900);
    setTimeout(() => setLiveExecutionStep(4), 1500);
    setTimeout(() => setLiveExecutionStep(5), 2300);
    setTimeout(() => {
      setIsExecuting(false);
      setCurrentPrompt('');
    }, 2800);
  };

  const handleNewChat = () => {
    setActiveChatId('k8s-query');
    setCurrentPrompt('');
    setAttachedFiles([]);
    setFeedbackGiven(null);
  };

  const todayChats = CHAT_SESSIONS.filter((c) => c.group === 'Today');
  const yesterdayChats = CHAT_SESSIONS.filter((c) => c.group === 'Yesterday');

  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-sans h-screen flex overflow-hidden antialiased select-none">
      
      {/* ===================== LEFT SIDEBAR ===================== */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-20" data-purpose="left-navigation">
        {/* Workspace Brand Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBackToLanding}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
              title="Return to Landing Page"
            >
              <KnowledgeOSLogo size={26} />
              <span className="font-bold text-slate-900 text-lg tracking-tight">KnowledgeOS</span>
            </button>

            <button 
              onClick={onBackToLanding}
              className="text-[11px] text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 cursor-pointer"
              title="Back to Landing Page"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Landing</span>
            </button>
          </div>

          {/* Workspace Selector Dropdown */}
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-0.5">
            Workspace
          </div>
          <div className="relative">
            <button 
              onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></span>
                <span>{activeWorkspace}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {workspaceDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 text-xs animate-in fade-in zoom-in-95">
                {['Production', 'Staging', 'Development'].map((ws) => (
                  <button
                    key={ws}
                    onClick={() => {
                      setActiveWorkspace(ws);
                      setWorkspaceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                      activeWorkspace === ws ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{ws}</span>
                    {activeWorkspace === ws && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Primary Action: New Chat (LIVE) */}
        <div className="px-4 py-1.5">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100/80 text-blue-600 rounded-xl font-medium text-sm border border-blue-100 transition shadow-2xs cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Navigation Menu Items (ALL LIVE) */}
        <nav className="mt-2 px-2.5 space-y-0.5 text-xs font-medium text-slate-600 border-b border-slate-100 pb-3">
          <button 
            onClick={() => setTracesModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            <span>Traces</span>
          </button>

          <button 
            onClick={() => setRagasModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            <span>Evaluations</span>
          </button>

          <button 
            onClick={() => setGuardrailsModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <Lock className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            <span>Guardrails</span>
          </button>

          <button 
            onClick={() => setDatasetsModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <Database className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            <span>Datasets</span>
          </button>

          <button 
            onClick={() => setAnalyticsModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            <span>Analytics</span>
          </button>

          <button 
            onClick={() => setKnowledgeBaseModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            <span>Knowledge Base</span>
          </button>

          <button 
            onClick={() => setSettingsModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition text-left cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Recent Chats Section (ALL LIVE) */}
        <div className="flex-1 overflow-y-auto px-3 py-3" data-purpose="chat-history-list">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Recent Chats
          </div>

          {/* Group: Today */}
          <div className="mb-3">
            <div className="text-[10px] font-medium text-slate-400 px-2 mb-1">Today</div>
            <div className="space-y-0.5">
              {todayChats.map((chat) => {
                const isActive = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer text-left truncate ${
                      isActive 
                        ? 'bg-blue-50/80 text-blue-700 font-medium border border-blue-100 shadow-2xs' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                    <span className="truncate">{chat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: Yesterday */}
          <div>
            <div className="text-[10px] font-medium text-slate-400 px-2 mb-1">Yesterday</div>
            <div className="space-y-0.5">
              {yesterdayChats.map((chat) => {
                const isActive = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer text-left truncate ${
                      isActive 
                        ? 'bg-blue-50/80 text-blue-700 font-medium border border-blue-100 shadow-2xs' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                    <span className="truncate">{chat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Profile Footer (LIVE Settings) */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSettingsModalOpen(true)}
              className="flex items-center gap-2.5 overflow-hidden text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-xs flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">Adina Vishal</div>
                <div className="text-[11px] text-slate-500 truncate">adivishal@example.com</div>
              </div>
            </button>
            <button 
              onClick={() => setSettingsModalOpen(true)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-100 transition cursor-pointer"
              title="Open Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ===================== MAIN CONVERSATION VIEW ===================== */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]" data-purpose="active-chat-area">
        
        {/* Top Global Header Bar */}
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 flex-shrink-0 z-10">
          {/* Search Input Container (LIVE: opens Ctrl+K Palette) */}
          <div className="relative w-80 md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              onClick={onOpenSearch}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-14 py-1.5 text-xs placeholder:text-slate-400 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer" 
              placeholder="Search conversations, traces, or documentation..." 
              readOnly 
              type="text" 
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2.5">
              <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-xs">
                Ctrl K
              </kbd>
            </span>
          </div>

          {/* Right Actions: Notification & Environment Selector */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onBackToLanding()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
            >
              <span>Back to Landing Page</span>
            </button>

            {/* Notification Button (LIVE dropdown) */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUnreadNotifications(0);
                }}
                className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer" 
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-30 text-xs animate-in fade-in zoom-in-95">
                  <div className="font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span>Active Telemetry Notifications</span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Live</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-700">
                      <div className="font-semibold text-slate-900 text-[11.5px]">Trace #tr-01 Completed</div>
                      <div className="text-[10.5px] text-slate-500">Latency: 342 ms • RAGAS Faithfulness: 0.92</div>
                    </div>
                    <div className="p-2 bg-emerald-50/70 border border-emerald-100 rounded-lg text-emerald-800">
                      <div className="font-semibold text-[11.5px]">NeMo Guardrail Check</div>
                      <div className="text-[10.5px]">0 policy violations detected across 42,207 requests.</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-700">
                      <div className="font-semibold text-slate-900 text-[11.5px]">pgvector Index Synced</div>
                      <div className="text-[10.5px] text-slate-500">14,280 chunks re-indexed under 1.8s.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Environment Indicator Badge Button (LIVE dropdown) */}
            <div className="relative">
              <button
                onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 shadow-2xs cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{activeWorkspace}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Chat Stream Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          
          {/* User Query Turn */}
          <div className="flex items-start gap-3.5 max-w-4xl" data-purpose="user-turn">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs flex-shrink-0 ring-2 ring-white shadow-2xs">
              A
            </div>
            <div className="flex-1">
              <div className="bg-blue-50/70 border border-blue-100 text-slate-900 rounded-2xl px-5 py-3.5 text-[14px] leading-relaxed font-normal shadow-2xs">
                {activeSession.userQuery}
              </div>
              <div className="text-[11px] text-slate-400 mt-1.5 pl-1">{activeSession.timestamp}</div>
            </div>
          </div>

          {/* Agent Response Turn */}
          <div className="flex items-start gap-3.5 max-w-4xl" data-purpose="assistant-turn">
            {/* Agent Avatar */}
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 4.8L18.4 19H5.6L12 6.8z" />
              </svg>
            </div>

            <div className="flex-1">
              {/* Metadata Pill Bar & Feedback Actions */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                    {isExecuting ? 'Streaming execution...' : 'Completed'}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {activeSession.totalTime}
                  </span>
                  <span className="text-slate-300">|</span>
                  <button 
                    onClick={() => setViewingSource(activeSession.sources[0])}
                    className="text-slate-500 hover:text-blue-600 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Database className="w-3 h-3 text-slate-400" />
                    {activeSession.sourcesCount} sources
                  </button>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 font-medium text-[11px]">RAG enabled</span>
                </div>

                {/* Feedback Buttons (LIVE) */}
                <div className="flex items-center gap-1 text-slate-400">
                  <button 
                    onClick={() => setFeedbackGiven(feedbackGiven === 'up' ? null : 'up')}
                    className={`p-1.5 rounded transition cursor-pointer ${feedbackGiven === 'up' ? 'text-blue-600 bg-blue-50' : 'hover:bg-slate-100 hover:text-slate-600'}`} 
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setFeedbackGiven(feedbackGiven === 'down' ? null : 'down')}
                    className={`p-1.5 rounded transition cursor-pointer ${feedbackGiven === 'down' ? 'text-rose-600 bg-rose-50' : 'hover:bg-slate-100 hover:text-slate-600'}`} 
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={handleCopyResponse}
                    className="p-1.5 hover:bg-slate-100 rounded transition cursor-pointer hover:text-slate-600 relative" 
                    title="Copy response"
                  >
                    {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Main Response Body Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-700 text-sm leading-relaxed space-y-4 shadow-xs">
                {activeSession.answerText.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {activeSession.keyCapabilities && (
                  <div className="pt-2">
                    <p className="font-bold text-slate-900 mb-2">Key capabilities:</p>
                    <ul className="space-y-2">
                      {activeSession.keyCapabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sources Carousel Section (LIVE: opens SourceViewerModal) */}
              <div className="mt-4" data-purpose="chat-sources-widget">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sources ({activeSession.sources.length})</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeSession.sources.map((src) => (
                    <div 
                      key={src.id}
                      onClick={() => setViewingSource(src)}
                      className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 hover:border-blue-400 hover:shadow-xs transition cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">{src.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{src.url}</div>
                      </div>
                    </div>
                  ))}

                  {/* View All Sources Button */}
                  <button 
                    onClick={() => setViewingSource(activeSession.sources[0])}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-700 transition cursor-pointer"
                  >
                    <span>View all sources</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Related Questions Section (LIVE: click loads query & runs) */}
              {activeSession.relatedQuestions.length > 0 && (
                <div className="mt-5" data-purpose="related-queries">
                  <div className="text-xs font-semibold text-slate-700 mb-2">Related questions</div>
                  <div className="space-y-1.5">
                    {activeSession.relatedQuestions.map((rq, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setCurrentPrompt(rq);
                          handleRunNewQuery(rq);
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 transition group shadow-2xs text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>{rq}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom Message Input Composer Bar (CLEANED UP: removed websearch & gpt-4o dropdown) */}
        <div className="p-6 pt-2 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent">
          
          {/* Display attached files if any */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 px-1">
              {attachedFiles.map((file, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-medium px-2.5 py-1 rounded-lg">
                  <Paperclip className="w-3 h-3 text-blue-600" />
                  <span>{file}</span>
                  <button 
                    onClick={() => setAttachedFiles(attachedFiles.filter((_, idx) => idx !== i))}
                    className="hover:text-rose-600 ml-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleRunNewQuery(currentPrompt);
            }}
            className="bg-white border-2 border-blue-500/80 rounded-2xl p-3 shadow-lg shadow-blue-500/5 focus-within:ring-2 focus-within:ring-blue-500/20 transition"
          >
            <textarea 
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleRunNewQuery(currentPrompt);
                }
              }}
              className="w-full bg-transparent border-0 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 p-1 resize-none focus:outline-none" 
              placeholder="Ask anything about your knowledge base..." 
              rows={2} 
            />

            {/* Action Toolbar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {/* Left Controls: Attachment (+), RAG toggle, Files, and Filter icon */}
              <div className="flex items-center gap-2">
                {/* Add Attachment (+) Button (LIVE) */}
                <button 
                  type="button"
                  onClick={() => setAttachmentModalOpen(true)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer" 
                  title="Add attachment / documentation"
                >
                  <Plus className="w-4 h-4 stroke-[2]" />
                </button>

                {/* RAG Pill (Active toggle - LIVE) */}
                <button 
                  type="button"
                  onClick={() => setRagEnabled(!ragEnabled)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                    ragEnabled 
                      ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Toggle Retrieval Augmented Generation"
                >
                  <Zap className={`w-3.5 h-3.5 ${ragEnabled ? 'text-blue-600 fill-blue-600/20' : 'text-slate-400'}`} />
                  <span>RAG</span>
                </button>

                {/* Files Pill (LIVE: opens Knowledge Base modal) */}
                <button 
                  type="button"
                  onClick={() => setKnowledgeBaseModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border border-transparent text-slate-600 hover:bg-slate-100"
                  title="Browse indexed documentation files"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Files</span>
                </button>

                {/* Filter settings icon (LIVE: opens FilterSettingsModal) */}
                <button 
                  type="button"
                  onClick={() => setFilterSettingsModalOpen(true)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                  title="RAG Retrieval & Guardrail Parameters"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Right Control: Send Action (LIVE) */}
              <div className="flex items-center">
                <button 
                  type="submit" 
                  disabled={isExecuting}
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-sm cursor-pointer disabled:opacity-50 active:scale-95" 
                  title="Run Query"
                >
                  {isExecuting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* ===================== RIGHT TELEMETRY SIDEBAR ===================== */}
      <aside className="w-96 bg-white border-l border-slate-200 flex flex-col flex-shrink-0 overflow-y-auto" data-purpose="right-telemetry-inspector">
        {/* Telemetry Main Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-slate-700" />
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              Agent Execution <span className="text-slate-400 font-normal">(Live)</span>
            </span>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Completed • {activeSession.totalTime}
          </span>
        </div>

        {/* Stepper / Execution Flow (LIVE: click any step to expand its payload) */}
        <div className="p-4 border-b border-slate-100" data-purpose="execution-timeline">
          <div className="space-y-4">
            {activeSession.steps.map((step, idx) => {
              const isExpanded = expandedStepIndex === idx;

              return (
                <div key={step.id} className="relative flex items-start gap-3 timeline-item">
                  <div className="timeline-line"></div>
                  
                  {/* Step status icon box */}
                  <button
                    onClick={() => setExpandedStepIndex(isExpanded ? null : idx)}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 z-10 cursor-pointer hover:scale-105 transition-transform ${
                      idx === 0 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : idx === 1 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : idx === 2 
                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                        : idx === 3 
                        ? 'bg-purple-50 border-purple-200 text-purple-600'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    }`}
                  >
                    {idx === 0 && <ShieldCheck className="w-3.5 h-3.5" />}
                    {idx === 1 && <Lock className="w-3.5 h-3.5" />}
                    {idx === 2 && <SlidersHorizontal className="w-3.5 h-3.5" />}
                    {idx === 3 && <Database className="w-3.5 h-3.5" />}
                    {idx >= 4 && <Sparkles className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <button 
                      onClick={() => setExpandedStepIndex(isExpanded ? null : idx)}
                      className="w-full flex items-center justify-between text-left cursor-pointer group"
                    >
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition">{step.name}</div>
                      <span className="text-[11px] text-slate-400 font-mono">{step.durationLabel}</span>
                    </button>
                    <div className="text-[11px] text-slate-500 truncate">{step.detail}</div>

                    {/* Expandable Step Payload (LIVE) */}
                    {isExpanded && step.payload && (
                      <div className="mt-2 p-2 bg-slate-900 text-slate-200 rounded-lg text-[10.5px] font-mono overflow-x-auto shadow-inner animate-in fade-in slide-in-from-top-1">
                        <pre>{JSON.stringify(step.payload, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 1: Guardrails Status (LIVE) */}
        <div className="p-4 border-b border-slate-100" data-purpose="guardrails-summary">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-800">Guardrails</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
              <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
              Passed
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {activeSession.guardrails.map((g, idx) => (
              <div key={idx} className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{g.name}</span>
                </div>
                <span className="font-medium text-slate-700 text-[11px]">{g.label}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setGuardrailsModalOpen(true)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 mt-2.5 cursor-pointer"
          >
            <span>View guardrails details →</span>
          </button>
        </div>

        {/* Section 2: Evaluation (RAGAS) (LIVE) */}
        <div className="p-4 border-b border-slate-100" data-purpose="ragas-metrics">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-800">Evaluation (RAGAS)</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
              <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
              Good
            </span>
          </div>

          {/* 2x2 Metric Matrix */}
          <div className="grid grid-cols-2 gap-3">
            {/* Metric 1 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="text-[10px] text-slate-500 font-medium truncate">Faithfulness</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">{activeSession.ragas.faithfulness}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${activeSession.ragas.faithfulness * 100}%` }}></div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="text-[10px] text-slate-500 font-medium truncate">Answer Relevancy</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">{activeSession.ragas.answerRelevancy}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${activeSession.ragas.answerRelevancy * 100}%` }}></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="text-[10px] text-slate-500 font-medium truncate">Context Precision</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">{activeSession.ragas.contextPrecision}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${activeSession.ragas.contextPrecision * 100}%` }}></div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="text-[10px] text-slate-500 font-medium truncate">Context Recall</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">{activeSession.ragas.contextRecall}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${activeSession.ragas.contextRecall * 100}%` }}></div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setRagasModalOpen(true)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 mt-2.5 cursor-pointer"
          >
            <span>View full evaluation →</span>
          </button>
        </div>

        {/* Section 3: Ranked Retrieval Sources (LIVE) */}
        <div className="p-4" data-purpose="retrieval-ranked-list">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-800">Retrieval Sources</span>
              <span className="text-xs font-medium text-slate-400">{activeSession.sources.length}</span>
            </div>
            <button 
              onClick={() => setViewingSource(activeSession.sources[0])}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              View all →
            </button>
          </div>

          <div className="space-y-2.5">
            {activeSession.sources.map((src, i) => (
              <div 
                key={src.id}
                onClick={() => setViewingSource(src)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-semibold text-slate-400 w-3">{i + 1}</span>
                  <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-medium text-slate-800 truncate">{src.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{src.url}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 pl-2 font-mono">{src.score}</span>
              </div>
            ))}
          </div>
        </div>

      </aside>

      {/* ALL LIVE INTERACTIVE MODALS */}
      <SourceViewerModal 
        source={viewingSource} 
        onClose={() => setViewingSource(null)} 
      />
      <GuardrailsDetailModal 
        isOpen={guardrailsModalOpen} 
        onClose={() => setGuardrailsModalOpen(false)} 
      />
      <RagasEvaluationModal 
        isOpen={ragasModalOpen} 
        onClose={() => setRagasModalOpen(false)} 
      />
      <TracesModal
        isOpen={tracesModalOpen}
        onClose={() => setTracesModalOpen(false)}
        onSelectTrace={(query) => handleRunNewQuery(query)}
      />
      <DatasetsModal
        isOpen={datasetsModalOpen}
        onClose={() => setDatasetsModalOpen(false)}
      />
      <AnalyticsModal
        isOpen={analyticsModalOpen}
        onClose={() => setAnalyticsModalOpen(false)}
      />
      <KnowledgeBaseModal
        isOpen={knowledgeBaseModalOpen}
        onClose={() => setKnowledgeBaseModalOpen(false)}
      />
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
      <FilterSettingsModal
        isOpen={filterSettingsModalOpen}
        onClose={() => setFilterSettingsModalOpen(false)}
      />
      <AttachmentModal
        isOpen={attachmentModalOpen}
        onClose={() => setAttachmentModalOpen(false)}
        onAttachFile={(fileName) => setAttachedFiles([...attachedFiles, fileName])}
      />

    </div>
  );
};
