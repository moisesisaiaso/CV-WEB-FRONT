import React from 'react';

interface RatingDotsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  inactiveColor?: string;
}

export const RatingDots: React.FC<RatingDotsProps> = ({
  rating,
  max = 5,
  size = 'md',
  activeColor = 'bg-[#2E4D71]',
  inactiveColor = 'bg-[#CBD5E1]',
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <div className="flex items-center gap-1.5" aria-label={`Nivel: ${rating} de ${max}`}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <span
            key={index}
            className={`rounded-full transition-transform duration-200 inline-block ${sizeClasses[size]} ${
              isFilled ? activeColor : inactiveColor
            }`}
          />
        );
      })}
    </div>
  );
};
