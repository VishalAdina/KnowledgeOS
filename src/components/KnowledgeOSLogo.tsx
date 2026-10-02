import React from 'react';

interface KnowledgeOSLogoProps {
  className?: string;
  size?: number;
}

export const KnowledgeOSLogo: React.FC<KnowledgeOSLogoProps> = ({ className = 'w-7 h-7', size = 28 }) => {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* 
        KnowledgeOS Signature Mark:
        Isometric Knowledge Prism / Book + Neural 'K' Core
      */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform hover:scale-105"
      >
        <defs>
          <linearGradient id="kos-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="kos-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="kos-grad-top" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>

        {/* Isometric Knowledge Cube / Open Prism Layers */}
        {/* Top facet: Knowledge Plane */}
        <path 
          d="M16 2.5 L28 9 L16 15.5 L4 9 Z" 
          fill="url(#kos-grad-top)" 
        />
        
        {/* Left facet: Operating System Foundation (Slate Obsidian) */}
        <path 
          d="M4 9 L16 15.5 L16 29 L4 22.5 Z" 
          fill="url(#kos-grad-left)" 
        />

        {/* Right facet: Agentic Intelligence (Electric Cobalt) */}
        <path 
          d="M16 15.5 L28 9 L28 22.5 L16 29 Z" 
          fill="url(#kos-grad-right)" 
        />

        {/* Inner Stylized 'K' & Synaptic Core */}
        {/* Left vertical stem of 'K' */}
        <path 
          d="M10 13.5 L12.5 14.8 L12.5 24 L10 22.7 Z" 
          fill="#FFFFFF" 
          opacity="0.95"
        />
        {/* Upper diagonal arm of 'K' */}
        <path 
          d="M12.5 18.2 L19.5 13 L21.5 14.2 L14.5 19.5 Z" 
          fill="#FFFFFF" 
          opacity="0.95"
        />
        {/* Lower diagonal arm of 'K' */}
        <path 
          d="M14 19 L21.5 24 L19.5 25.2 L12.5 20.3 Z" 
          fill="#FFFFFF" 
          opacity="0.95"
        />

        {/* Center Illuminated Neural Core Dot */}
        <circle cx="16" cy="15.5" r="1.8" fill="#FFFFFF" />
        <circle cx="16" cy="15.5" r="3.2" stroke="#60A5FA" strokeWidth="0.8" opacity="0.8" />
      </svg>
    </div>
  );
};
