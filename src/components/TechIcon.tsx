import React from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  GitBranch, 
  Cpu, 
  Cloud
} from 'lucide-react';

interface TechIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({ 
  name, 
  size = 'md', 
  showLabel = true 
}) => {
  const norm = name.toLowerCase().trim();

  const sizeMap = {
    sm: { icon: 'w-3.5 h-3.5', box: 'p-1', text: 'text-[11px]' },
    md: { icon: 'w-4 h-4', box: 'p-1.5', text: 'text-xs' },
    lg: { icon: 'w-5 h-5', box: 'p-2', text: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  // Specific rendering with official SVG colors or high-fidelity vector icons
  if (norm.includes('react')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 font-medium ${currentSize.text}`}>
        <svg className={`${currentSize.icon} shrink-0`} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
          <circle cx="0" cy="0" r="2.05" fill="#00D8FF"/>
          <g stroke="#00D8FF" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
        {showLabel && <span>React</span>}
      </div>
    );
  }

  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-medium ${currentSize.text}`}>
        <div className="w-4 h-4 rounded-xs bg-[#3178C6] text-white flex items-center justify-center font-bold text-[9px] leading-none shrink-0">
          TS
        </div>
        {showLabel && <span>TypeScript</span>}
      </div>
    );
  }

  if (norm.includes('vite')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 font-medium ${currentSize.text}`}>
        <svg className={`${currentSize.icon} shrink-0`} viewBox="0 0 32 32" fill="none">
          <path d="M29.7 5.3L16.8 28.5c-.3.6-1.2.6-1.5 0L2.3 5.3c-.4-.7.1-1.5.9-1.4l13 1.8 12.6-1.8c.8-.1 1.3.7.9 1.4z" fill="#BD34FE"/>
          <path d="M20.2 2.8L12 17.5l-3.8-6.8c-.3-.5.1-1.1.7-1l6.1.9 4.4-8.1c.4-.7 1.4-.4 1.4.3z" fill="#FFD62E"/>
        </svg>
        {showLabel && <span>Vite</span>}
      </div>
    );
  }

  if (norm.includes('tailwind')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 font-medium ${currentSize.text}`}>
        <svg className={`${currentSize.icon} shrink-0 text-[#38BDF8]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
        {showLabel && <span>Tailwind CSS</span>}
      </div>
    );
  }

  if (norm.includes('node')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium ${currentSize.text}`}>
        <Server className={`${currentSize.icon} text-emerald-600 shrink-0`} />
        {showLabel && <span>Node.js</span>}
      </div>
    );
  }

  if (norm.includes('express')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-800 font-medium ${currentSize.text}`}>
        <Cpu className={`${currentSize.icon} text-neutral-600 shrink-0`} />
        {showLabel && <span>Express</span>}
      </div>
    );
  }

  if (norm.includes('mysql')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-medium ${currentSize.text}`}>
        <Database className={`${currentSize.icon} text-[#00758F] shrink-0`} />
        {showLabel && <span>MySQL</span>}
      </div>
    );
  }

  if (norm.includes('mongo')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium ${currentSize.text}`}>
        <Database className={`${currentSize.icon} text-[#47A248] shrink-0`} />
        {showLabel && <span>MongoDB</span>}
      </div>
    );
  }

  if (norm.includes('postgres') || norm.includes('sql') || norm.includes('database')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 font-medium ${currentSize.text}`}>
        <Database className={`${currentSize.icon} text-[#336791] shrink-0`} />
        {showLabel && <span>PostgreSQL</span>}
      </div>
    );
  }

  if (norm.includes('git')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 font-medium ${currentSize.text}`}>
        <GitBranch className={`${currentSize.icon} text-[#F05032] shrink-0`} />
        {showLabel && <span>{name}</span>}
      </div>
    );
  }

  if (norm.includes('cloudinary')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 font-medium ${currentSize.text}`}>
        <Cloud className={`${currentSize.icon} text-[#3448C5] shrink-0`} />
        {showLabel && <span>Cloudinary</span>}
      </div>
    );
  }

  if (norm.includes('hostinger')) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 font-medium ${currentSize.text}`}>
        <Server className={`${currentSize.icon} text-[#673DE6] shrink-0`} />
        {showLabel && <span>Hostinger</span>}
      </div>
    );
  }

  // Fallback
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium ${currentSize.text}`}>
      <Code2 className={`${currentSize.icon} text-[#2C4A6F] shrink-0`} />
      {showLabel && <span>{name}</span>}
    </div>
  );
};
