import React from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  GitBranch, 
  Layers, 
  Cpu, 
  Globe, 
  Cloud, 
  ShieldCheck, 
  Smartphone, 
  Wrench 
} from 'lucide-react';

interface SkillMiniIconProps {
  name: string;
  className?: string;
}

export const SkillMiniIcon: React.FC<SkillMiniIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const norm = name.toLowerCase().trim();

  // 1. React (Official Cyan Atom)
  if (norm.includes('react')) {
    return (
      <svg className={`${className} shrink-0 text-[#00D8FF]`} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF"/>
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  // 2. Tailwind CSS (Official Tailwind Wave Logo)
  if (norm.includes('tailwind')) {
    return (
      <svg className={`${className} shrink-0 text-[#38BDF8]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    );
  }

  // 3. MongoDB (Official Green Leaf Logo)
  if (norm.includes('mongo')) {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 1.5C11.5 1.5 11.2 2 11 2.5C9.5 6 7 9.8 7 13.5C7 16.5 9 19.5 11.2 21.2C11.6 21.5 11.9 22 12 22.5C12.1 22 12.4 21.5 12.8 21.2C15 19.5 17 16.5 17 13.5C17 9.8 14.5 6 13 2.5C12.8 2 12.5 1.5 12 1.5Z"
          fill="#47A248"
        />
        <path
          d="M12 2.5C12 2.5 12 10 12 22C12.4 21.5 12.7 21.1 13 20.8C15 19.1 16.8 16.3 16.8 13.5C16.8 10 14.5 6.4 13.1 3.2C12.8 2.6 12.4 2.5 12 2.5Z"
          fill="#499D4A"
        />
        <path
          d="M11.9 22.2C11.8 22.2 11.7 21.8 11.7 21.5C11.7 18 11.9 14.5 11.9 11C11.9 11 11.7 20 11.9 22.2Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 4. TypeScript (Official Blue Badge)
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <div className="w-3.5 h-3.5 rounded-xs bg-[#3178C6] text-white flex items-center justify-center font-bold text-[8px] leading-none shrink-0 shadow-xs">
        TS
      </div>
    );
  }

  // 5. JavaScript (Official Yellow Badge)
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <div className="w-3.5 h-3.5 rounded-xs bg-[#F7DF1E] text-black flex items-center justify-center font-black text-[8px] leading-none shrink-0 shadow-xs">
        JS
      </div>
    );
  }

  // 6. HTML & CSS (Combined or specific)
  if (norm.includes('html') && norm.includes('css')) {
    return (
      <div className="flex items-center -space-x-1 shrink-0">
        <svg className="w-3 h-3 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.852 4.41l.698 8.012h9.248l-.348 3.87-3.473.937-3.475-.938-.223-2.48H5.617l.438 4.908 5.922 1.644 5.923-1.64 1.018-11.238H8.531v2.265z"/>
        </svg>
        <svg className="w-3 h-3 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm14.195 9.75l.233-2.718H5.853l.23 2.718h9.612zm-.466 5.187l-3.252.88-3.25-.88-.208-2.32H5.853l.41 4.593 5.714 1.583 5.714-1.583.82-9.17H5.853l.23 2.718h8.895l-.297 3.279z"/>
        </svg>
      </div>
    );
  }

  if (norm.includes('html')) {
    return (
      <svg className={`${className} shrink-0 text-[#E34F26]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.852 4.41l.698 8.012h9.248l-.348 3.87-3.473.937-3.475-.938-.223-2.48H5.617l.438 4.908 5.922 1.644 5.923-1.64 1.018-11.238H8.531v2.265z"/>
      </svg>
    );
  }

  if (norm.includes('css')) {
    return (
      <svg className={`${className} shrink-0 text-[#1572B6]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm14.195 9.75l.233-2.718H5.853l.23 2.718h9.612zm-.466 5.187l-3.252.88-3.25-.88-.208-2.32H5.853l.41 4.593 5.714 1.583 5.714-1.583.82-9.17H5.853l.23 2.718h8.895l-.297 3.279z"/>
      </svg>
    );
  }

  // 7. Node.js (Official Green Hexagon)
  if (norm.includes('node')) {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2.5L28 9.5V23.5L16 30.5L4 23.5V9.5L16 2.5Z"
          fill="#339933"
        />
        <path
          d="M16 6.5L24.5 11.5V21.5L16 26.5L7.5 21.5V11.5L16 6.5Z"
          fill="#FFFFFF"
        />
        <path
          d="M16 9.5L21.5 13V19.5L16 23L10.5 19.5V13L16 9.5Z"
          fill="#339933"
        />
      </svg>
    );
  }

  // 8. Express (Minimalist Backend Server Badge)
  if (norm.includes('express')) {
    return (
      <div className="w-3.5 h-3.5 rounded-xs bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-[7.5px] leading-none shrink-0 shadow-xs border border-slate-700">
        ex
      </div>
    );
  }

  // 9. PostgreSQL (Official Blue Elephant Silhouette)
  if (norm.includes('postgres')) {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
          fill="#336791"
        />
        <path
          d="M16.5 13.5C16 11.5 14.5 10 12.5 9.5C12 9.3 11.5 9.3 11 9.5V8C11 7.2 11.7 6.5 12.5 6.5C13.3 6.5 14 7.2 14 8H15.5C15.5 6.3 14.2 5 12.5 5C10.8 5 9.5 6.3 9.5 8V10C8.5 10.8 8 12.2 8 13.5C8 15.5 9.5 17 11.5 17.5C12 17.6 12.5 17.6 13 17.5C15 17 16.5 15.5 16.5 13.5Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 10. MySQL (Official Dolphin / Blue-Orange Database)
  if (norm.includes('mysql')) {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00758F"/>
        <path
          d="M6 16C7.5 13 10 11 13 11C15 11 16.5 12 17.5 13.5C16.8 11.5 15 9.5 13 9C10.5 8.5 8 10 6 12V16Z"
          fill="#F29111"
        />
        <circle cx="8" cy="11" r="1" fill="#FFFFFF"/>
      </svg>
    );
  }

  // 11. Relational Databases (Generic RDBMS)
  if (norm.includes('relacional') || norm.includes('database')) {
    return (
      <Database className={`${className} text-indigo-600 shrink-0`} />
    );
  }

  // 12. Git (Official Git Orange Branch Logo)
  if (norm.includes('git')) {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F05032" />
        <path
          d="M17 10.5C16.2 10.5 15.5 11 15.2 11.7L12.7 9.2C12.8 8.9 12.9 8.7 12.9 8.4C12.9 7.4 12.1 6.6 11.1 6.6C10.1 6.6 9.3 7.4 9.3 8.4C9.3 8.7 9.4 9 9.5 9.3L7.7 11.1C7.4 11 7.1 10.9 6.8 10.9C5.8 10.9 5 11.7 5 12.7C5 13.7 5.8 14.5 6.8 14.5C7.7 14.5 8.5 13.8 8.6 12.9L10.3 11.2C10.6 11.3 10.8 11.3 11.1 11.3C11.4 11.3 11.6 11.3 11.8 11.2L14.3 13.7C14.2 14 14.1 14.2 14.1 14.5C14.1 15.5 14.9 16.3 15.9 16.3C16.9 16.3 17.7 15.5 17.7 14.5C17.7 13.5 16.9 12.7 15.9 12.7C15.6 12.7 15.4 12.8 15.1 12.9L12.7 10.5C12.7 10.3 12.7 10.1 12.7 10C13.2 9.6 13.5 9 13.5 8.4C13.5 7.1 12.4 6 11.1 6C9.8 6 8.7 7.1 8.7 8.4C8.7 9 9 9.6 9.5 10L7.7 11.8C7.4 11.7 7.1 11.6 6.8 11.6C6.2 11.6 5.7 12.1 5.7 12.7C5.7 13.3 6.2 13.8 6.8 13.8C7.4 13.8 7.9 13.3 7.9 12.7C7.9 12.5 7.8 12.3 7.7 12.1L9.5 10.3C9.8 10.5 10.1 10.6 10.5 10.6L10.5 13.5C10.1 13.7 9.8 14.1 9.8 14.6C9.8 15.4 10.4 16 11.2 16C12 16 12.6 15.4 12.6 14.6C12.6 14.1 12.3 13.7 11.9 13.5L11.9 10.5C12.2 10.4 12.5 10.2 12.7 10L15.1 12.4C15 12.6 15 12.8 15 13C15 13.8 15.6 14.4 16.4 14.4C17.2 14.4 17.8 13.8 17.8 13C17.8 12.2 17.2 11.6 16.4 11.6C16.2 11.6 16 11.6 15.8 11.7L13.4 9.3C13.5 9 13.6 8.7 13.6 8.4C13.6 7 12.5 5.9 11.1 5.9C9.7 5.9 8.6 7 8.6 8.4C8.6 9.1 8.9 9.7 9.4 10.2L7.3 12.3C7.1 12.2 7 12.1 6.8 12.1C6.5 12.1 6.2 12.4 6.2 12.7C6.2 13 6.5 13.3 6.8 13.3C7.1 13.3 7.4 13 7.4 12.7C7.4 12.6 7.4 12.5 7.3 12.4L9.4 10.3C9.9 10.6 10.5 10.8 11.1 10.8C11.7 10.8 12.3 10.6 12.8 10.3L15.2 12.7C15.1 12.8 15.1 12.9 15.1 13C15.1 13.7 15.7 14.3 16.4 14.3C17.1 14.3 17.7 13.7 17.7 13C17.7 12.3 17.1 11.7 16.4 11.7C16.3 11.7 16.2 11.7 16.1 11.7L13.7 9.3C13.8 9 13.9 8.7 13.9 8.4C13.9 6.8 12.6 5.5 11 5.5C9.4 5.5 8.1 6.8 8.1 8.4C8.1 9.2 8.4 10 9 10.5L6.9 12.6C6.7 12.5 6.5 12.4 6.3 12.4C5.7 12.4 5.2 12.9 5.2 13.5C5.2 14.1 5.7 14.6 6.3 14.6C6.9 14.6 7.4 14.1 7.4 13.5C7.4 13.3 7.3 13.1 7.2 13L9.3 10.9C9.8 11.2 10.4 11.4 11 11.4C11.6 11.4 12.2 11.2 12.7 10.9L15.1 13.3C15 13.4 15 13.6 15 13.7C15 14.4 15.6 15 16.3 15C17 15 17.6 14.4 17.6 13.7C17.6 13 17 12.4 16.3 12.4C16.1 12.4 15.9 12.4 15.8 12.5L13.4 10.1C13.5 9.8 13.6 9.5 13.6 9.2C13.6 7.8 12.4 6.7 11 6.7C9.6 6.7 8.5 7.8 8.5 9.2C8.5 9.8 8.7 10.4 9.1 10.8L7 12.9C6.8 12.8 6.6 12.7 6.3 12.7C5.6 12.7 5 13.3 5 14C5 14.7 5.6 15.3 6.3 15.3C7 15.3 7.6 14.7 7.6 14C7.6 13.8 7.5 13.6 7.4 13.4L9.5 11.3C10 11.6 10.5 11.8 11.1 11.8C11.7 11.8 12.2 11.6 12.7 11.3L15.1 13.7C15 13.8 15 14 15 14.1C15 14.9 15.6 15.5 16.4 15.5C17.2 15.5 17.8 14.9 17.8 14.1C17.8 13.3 17.2 12.7 16.4 12.7C16.2 12.7 16 12.8 15.9 12.8L13.5 10.4C13.6 10.1 13.7 9.8 13.7 9.5C13.7 8 12.5 6.8 11 6.8C9.5 6.8 8.3 8 8.3 9.5C8.3 10.2 8.6 10.8 9 11.3L7 13.3C6.8 13.2 6.6 13.1 6.3 13.1C5.6 13.1 5 13.7 5 14.4C5 15.1 5.6 15.7 6.3 15.7C7 15.7 7.6 15.1 7.6 14.4C7.6 14.2 7.5 14 7.4 13.8L9.4 11.8C9.9 12.1 10.4 12.3 11 12.3L11 14.2C10.6 14.4 10.3 14.8 10.3 15.3C10.3 16.1 10.9 16.7 11.7 16.7C12.5 16.7 13.1 16.1 13.1 15.3C13.1 14.8 12.8 14.4 12.4 14.2L12.4 11.8C12.6 11.7 12.8 11.5 13 11.3L15.4 13.7C15.3 13.9 15.3 14.1 15.3 14.2C15.3 15 15.9 15.6 16.7 15.6C17.5 15.6 18.1 15 18.1 14.2C18.1 13.4 17.5 12.8 16.7 12.8C16.5 12.8 16.3 12.9 16.1 13L13.7 10.6C13.8 10.3 13.9 10 13.9 9.7C13.9 8.1 12.6 6.8 11 6.8Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 13. REST APIs
  if (norm.includes('rest') || norm.includes('api')) {
    return (
      <div className="w-3.5 h-3.5 rounded-xs bg-sky-600 text-white flex items-center justify-center font-bold text-[7px] leading-none shrink-0 shadow-xs">
        API
      </div>
    );
  }

  // 14. Sequelize (Official Blue Layers Logo)
  if (norm.includes('sequelize')) {
    return (
      <svg className={`${className} shrink-0 text-[#52B0E7]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" />
        <path d="M2 12L12 17.5L22 12" stroke="#2563EB" strokeWidth="2" fill="none" />
        <path d="M2 16.5L12 22L22 16.5" stroke="#1D4ED8" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // 15. JWT (JSON Web Tokens Badge)
  if (norm.includes('jwt')) {
    return (
      <div className="w-3.5 h-3.5 rounded-xs bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 text-white flex items-center justify-center font-mono font-black text-[7px] leading-none shrink-0 shadow-xs">
        JWT
      </div>
    );
  }

  // 16. Cloudinary (Official Cloud Logo)
  if (norm.includes('cloudinary')) {
    return (
      <svg className={`${className} shrink-0 text-[#3448C5]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
      </svg>
    );
  }

  // 17. Hostinger (Official Purple H Logo)
  if (norm.includes('hostinger')) {
    return (
      <div className="w-3.5 h-3.5 rounded-xs bg-[#673DE6] text-white flex items-center justify-center font-bold text-[8.5px] leading-none shrink-0 shadow-xs">
        H
      </div>
    );
  }

  // 18. Responsive Design
  if (norm.includes('responsive')) {
    return (
      <Smartphone className={`${className} text-blue-600 shrink-0`} />
    );
  }

  // 19. Hardware / Reparación
  if (norm.includes('repair') || norm.includes('hardware') || norm.includes('reparación')) {
    return (
      <Wrench className={`${className} text-slate-600 shrink-0`} />
    );
  }

  // Fallback
  return <Code2 className={`${className} text-[#2C4A6F] shrink-0`} />;
};
