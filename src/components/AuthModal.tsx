import React, { useState } from 'react';
import { X, Check, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { KnowledgeOSLogo } from './KnowledgeOSLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('adivishal@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onClose();
    }, 700);
  };

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
          <KnowledgeOSLogo size={24} />
          <span className="font-bold text-slate-900 text-lg">KnowledgeOS</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-1">Sign in to your console</h3>
        <p className="text-xs text-slate-500 mb-4">
          Access your RAG pipelines, NeMo guardrails, and real-time telemetry.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-1.5 text-slate-600">
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign in with SSO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Demo sandbox: Any valid credentials grant instant telemetry access.
        </div>
      </div>
    </div>
  );
};
