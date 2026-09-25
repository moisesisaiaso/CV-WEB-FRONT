import React, { useState, useEffect } from 'react';

interface FastTypewriterProps {
  text: string;
  speedMs?: number;
  delayMs?: number;
  className?: string;
  cursorColor?: string;
}

export const FastTypewriter: React.FC<FastTypewriterProps> = ({
  text,
  speedMs = 28,
  delayMs = 100,
  className = '',
  cursorColor = 'border-[#2C4A6F]',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, show immediately
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedText(text);
      setIsDone(true);
      return;
    }

    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));
        } else {
          clearInterval(timer);
          setIsDone(true);
        }
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timer);
    };
  }, [text, speedMs, delayMs]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {!isDone && (
        <span
          className={`inline-block w-[2px] h-[1em] ml-1 align-middle animate-pulse bg-current ${cursorColor}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};
