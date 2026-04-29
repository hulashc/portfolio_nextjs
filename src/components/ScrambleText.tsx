'use client';

import { useState, useEffect, useRef, CSSProperties, ElementType } from 'react';
import { useTextScramble } from './useTextScramble';

interface ScrambleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  onScroll?: boolean;
  onClick?: boolean;
  duration?: number;
}

export default function ScrambleText({ text, as: Tag = 'p', className = '', style, onScroll = false, onClick = false, duration }: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(!onScroll && !onClick);
  const display = useTextScramble({ text, trigger, duration });

  useEffect(() => {
    if (!onScroll || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTrigger(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onScroll]);

  const handleClick = () => {
    if (onClick) {
      setTrigger(false);
      setTimeout(() => setTrigger(true), 10);
    }
  };

  return (
    <Tag ref={ref} className={className} style={style} onClick={handleClick}>
      {display}
    </Tag>
  );
}