'use client';

import { useState, useEffect, useRef } from 'react';

const GLITCH_CHARS = '!<>`-_/[]{}—=+*^?#';

interface UseTextScrambleOptions {
  text: string;
  trigger?: boolean;
  duration?: number;
  onComplete?: () => void;
}

export function useTextScramble({
  text,
  trigger = true,
  duration = 2000,
  onComplete,
}: UseTextScrambleOptions) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);
  const isCompleteRef = useRef(false);
  const triggerRef = useRef(trigger);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    triggerRef.current = trigger;
    if (!trigger) return;

    const original = text;
    const length = original.length;
    
    let queue: number[] = [];
    for (let i = 0; i < length; i++) {
      queue.push(Math.random() * 40);
    }

    isCompleteRef.current = false;
    startTimeRef.current = performance.now();

    const scramble = () => {
      if (!triggerRef.current) return;
      
      const elapsed = performance.now() - startTimeRef.current;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const chars: string[] = [];
        const currentLength = Math.floor(length * progress);
        
        for (let i = 0; i < length; i++) {
          if (i < currentLength) {
            chars.push(original[i]);
          } else if (queue[i] > 0) {
            queue[i] -= 0.05;
            chars.push(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
          } else {
            chars.push(original[i]);
          }
        }

        setDisplay(chars.join(''));
        frameRef.current = requestAnimationFrame(scramble);
      } else if (!isCompleteRef.current) {
        isCompleteRef.current = true;
        setDisplay(original);
        onComplete?.();
      }
    };

    frameRef.current = requestAnimationFrame(scramble);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, trigger, duration, onComplete]);

  return display;
}