import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechStack } from './components/TechStack';
import { WhyAgentOS } from './components/WhyAgentOS';
import { HowItWorks } from './components/HowItWorks';
import { TelemetryDashboard } from './components/TelemetryDashboard';
import { Testimonial } from './components/Testimonial';
import { BottomCTA } from './components/BottomCTA';
import { Footer } from './components/Footer';
import { TelemetryStudio } from './components/TelemetryStudio';
import { CommandPalette } from './components/CommandPalette';
import { TraceViewerModal } from './components/TraceViewerModal';
import { ContactSalesModal } from './components/ModalDialogs';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'studio'>('landing');
  const [selectedChatId, setSelectedChatId] = useState<string>('k8s-query');
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactSalesOpen, setContactSalesOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTraceId, setActiveTraceId] = useState<string | null>(null);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLiveStudioWithQuery = (queryText?: string) => {
    if (queryText) {
      if (queryText.toLowerCase().includes('langgraph')) {
        setSelectedChatId('langgraph-query');
      } else if (queryText.toLowerCase().includes('rag work')) {
        setSelectedChatId('rag-query');
      } else if (queryText.toLowerCase().includes('portkey')) {
        setSelectedChatId('portkey-query');
      } else if (queryText.toLowerCase().includes('nemo') || queryText.toLowerCase().includes('colang')) {
        setSelectedChatId('nemo-query');
      } else if (queryText.toLowerCase().includes('vector')) {
        setSelectedChatId('vector-query');
      } else if (queryText.toLowerCase().includes('aws')) {
        setSelectedChatId('aws-query');
      } else {
        setSelectedChatId('k8s-query');
      }
    }
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {currentView === 'landing' ? (
        <>
          {/* Main Navigation Header */}
          <Navbar
            onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenAuth={() => setAuthOpen(true)}
            onOpenContact={() => setContactSalesOpen(true)}
            onNavigateSection={handleNavigateSection}
            activeView={currentView}
            onToggleView={setCurrentView}
          />

          {/* Hero Section */}
          <HeroSection
            onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
            onOpenAuth={() => setAuthOpen(true)}
            onSelectSampleQuery={(query) => handleOpenLiveStudioWithQuery(query)}
          />

          {/* Tech Stack Partner Ribbon */}
          <TechStack />

          {/* Why KnowledgeOS Feature Cards */}
          <WhyAgentOS
            onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
          />

          {/* How It Works Architecture Pipeline */}
          <HowItWorks
            onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
          />

          {/* Telemetry Dashboard (See It In Action) */}
          <TelemetryDashboard
            onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
            onOpenTraceDetail={(traceId) => setActiveTraceId(traceId)}
            onOpenDocs={() => handleOpenLiveStudioWithQuery()}
          />

          {/* Testimonial Quote Carousel & Architecture Card */}
          <Testimonial />

          {/* Bottom Conversion CTA Banner */}
          <BottomCTA
            onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
            onOpenContact={() => setContactSalesOpen(true)}
          />

          {/* Comprehensive Footer */}
          <Footer
            onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
            onOpenContact={() => setContactSalesOpen(true)}
          />

          {/* Floating Live Studio Switcher Tag */}
          <div className="fixed bottom-6 right-6 z-30">
            <button
              onClick={() => handleOpenLiveStudioWithQuery()}
              className="bg-[#091529] hover:bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg border border-slate-700/50 flex items-center gap-2.5 text-xs font-semibold transition-all hover:scale-105 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Launch Telemetry Studio</span>
            </button>
          </div>
        </>
      ) : (
        /* Full Telemetry Studio & Orchestrator Console (Screen 2 / App Mode) */
        <TelemetryStudio
          onBackToLanding={() => setCurrentView('landing')}
          selectedChatId={selectedChatId}
          onOpenSearch={() => setSearchOpen(true)}
        />
      )}

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectChat={(chatId) => {
          setSelectedChatId(chatId);
          setCurrentView('studio');
        }}
        onNavigateSection={handleNavigateSection}
        onOpenLiveDemo={() => handleOpenLiveStudioWithQuery()}
      />

      {/* Trace Inspector Modal */}
      <TraceViewerModal
        traceId={activeTraceId}
        onClose={() => setActiveTraceId(null)}
        onLaunchInStudio={(query) => handleOpenLiveStudioWithQuery(query)}
      />

      {/* Contact Sales Form Modal */}
      <ContactSalesModal
        isOpen={contactSalesOpen}
        onClose={() => setContactSalesOpen(false)}
      />

      {/* Sign In SSO Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => handleOpenLiveStudioWithQuery()}
      />
    </div>
  );
}
