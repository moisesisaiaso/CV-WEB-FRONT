import React from 'react';
import {
  Headphones,
  Music,
  Dumbbell,
  Zap,
  Lightbulb,
  Puzzle,
  HeartHandshake,
  Sparkles,
  Heart,
} from 'lucide-react';

interface HobbyIconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const HobbyIcon: React.FC<HobbyIconProps> = ({ name, className = '', size = 'md' }) => {
  const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let IconComponent = Heart;
  let bgClass = 'bg-blue-50 text-[#2C4A6F] border-blue-100/90';

  if (normalized.includes('musica') || normalized.includes('music')) {
    IconComponent = Headphones;
    bgClass = 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
  } else if (normalized.includes('gimnasio') || normalized.includes('gym') || normalized.includes('deporte') || normalized.includes('fitness')) {
    IconComponent = Dumbbell;
    bgClass = 'bg-slate-100 text-slate-800 border-slate-200';
  }

  const containerSizes = size === 'sm' ? 'w-5 h-5 rounded' : 'w-6 h-6 rounded-lg';
  const iconSizes = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 border shadow-2xs ${containerSizes} ${bgClass} ${className}`}
      title={name}
      aria-hidden="true"
    >
      <IconComponent className={iconSizes} />
    </span>
  );
};

interface AptitudeIconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const AptitudeIcon: React.FC<AptitudeIconProps> = ({ name, className = '', size = 'md' }) => {
  const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let IconComponent = Sparkles;
  let bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';

  if (normalized.includes('adaptab') || normalized.includes('aprendizaje') || normalized.includes('rapido')) {
    IconComponent = Zap;
    bgClass = 'bg-amber-50 text-amber-700 border-amber-200/80';
  } else if (normalized.includes('creativid') || normalized.includes('innovac')) {
    IconComponent = Lightbulb;
    bgClass = 'bg-purple-50 text-purple-700 border-purple-200/80';
  } else if (normalized.includes('resolucion') || normalized.includes('problema')) {
    IconComponent = Puzzle;
    bgClass = 'bg-blue-50 text-blue-700 border-blue-200/80';
  } else if (normalized.includes('empatia') || normalized.includes('relacion') || normalized.includes('equipo')) {
    IconComponent = HeartHandshake;
    bgClass = 'bg-rose-50 text-rose-700 border-rose-200/80';
  }

  const containerSizes = size === 'sm' ? 'w-5 h-5 rounded' : 'w-6 h-6 rounded-lg';
  const iconSizes = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 border shadow-2xs ${containerSizes} ${bgClass} ${className}`}
      title={name}
      aria-hidden="true"
    >
      <IconComponent className={iconSizes} />
    </span>
  );
};
