import React, { useState, useEffect } from 'react';
import { Search, X, MessageSquare, Terminal, Shield, BarChart2, Database, ArrowRight } from 'lucide-react';
import { CHAT_SESSIONS } from '../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenLiveDemo: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectChat,
  onNavigateSection,
  onOpenLiveDemo
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally or passed down
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredChats = CHAT_SESSIONS.filter(
    (c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.userQuery.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Search Input Field */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, query, or trace name..."
            className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestions & Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          
          {/* Quick Actions */}
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
            Quick Actions
          </div>

          <button
            onClick={() => {
              onOpenLiveDemo();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Open Live Telemetry Studio</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">App</span>
          </button>

          <button
            onClick={() => {
              onNavigateSection('how-it-works');
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Inspect NeMo & LangGraph Architecture</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onNavigateSection('see-it-action');
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <BarChart2 className="w-4 h-4 text-purple-600" />
              <span>View 24-Hour Telemetry Volume</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Recent Queries */}
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 mt-2">
            Recent Queries ({filteredChats.length})
          </div>

          {filteredChats.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onSelectChat(c.id);
                onOpenLiveDemo();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition text-left"
            >
              <div className="flex items-center gap-2.5 truncate">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{c.title}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 ml-2">{c.totalTime}</span>
            </button>
          ))}
        </div>

        <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400 flex justify-between items-center">
          <span>Search documentation, telemetry traces, and chat runs</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
