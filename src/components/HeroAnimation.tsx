'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useTheme } from './ThemeProvider';

interface CarouselItem {
  type: 'project' | 'blog';
  title: string;
  tech: string;
  link?: string;
}

const items: CarouselItem[] = [
  { type: 'project', title: 'Real-Time Financial Analytics', tech: 'Kafka · Spark Streaming · AWS · PostgreSQL' },
  { type: 'project', title: 'Generative AI Data Pipeline', tech: 'LLM APIs · RAG · Python · AWS Lambda' },
  { type: 'blog', title: 'Building Scalable Data Pipelines', tech: 'Apache Spark · Airflow · Python' },
  { type: 'blog', title: 'LLM Integration Patterns', tech: 'RAG · Vector Databases · Prompt Engineering' },
];

export default function HeroAnimation() {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const borderColor = isDark ? 'rgba(255,255,240,0.7)' : 'rgba(0,0,0,0.6)';
  const heroBg = isDark ? '#161616' : '#DADADA';
  const textColor = isDark ? '#ffffff' : '#000000';
  const accentColor = isDark ? '#E3DACC' : '#333333';

  const nextIndex = useMemo(() => (current + 1) % items.length, [current]);
  const prevIndex = useMemo(() => (current - 1 + items.length) % items.length, [current]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, resetTimer]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = e.touches[0].clientX - touchStart;
    setTouchDelta(delta);
  };

  const handleTouchEnd = () => {
    if (touchDelta < -80) {
      setCurrent((prev) => (prev + 1) % items.length);
    } else if (touchDelta > 80) {
      setCurrent((prev) => (prev - 1 + items.length) % items.length);
    }
    setTouchStart(null);
    setTouchDelta(0);
    setIsDragging(false);
    resetTimer();
  };

  const goTo = (index: number) => {
    setCurrent(index);
    setTouchDelta(0);
    resetTimer();
  };

  const getItemStyle = (index: number) => {
    const activeItem = current;
    
    if (index === activeItem) {
      const progress = 1 - Math.abs(touchDelta) / 300;
      return {
        transform: `translateX(${-touchDelta}px) scale(${0.9 + progress * 0.1})`,
        opacity: progress,
        zIndex: 3,
      };
    }

    if (index === nextIndex && touchDelta < 0) {
      const slideProgress = Math.max(0, -touchDelta / 200);
      return {
        transform: `translateX(${200 + touchDelta}px) scale(${0.8 + slideProgress * 0.2})`,
        opacity: slideProgress,
        zIndex: 2,
      };
    }

    if (index === prevIndex && touchDelta > 0) {
      const slideProgress = Math.max(0, touchDelta / 200);
      return {
        transform: `translateX(${-200 + touchDelta}px) scale(${0.8 + slideProgress * 0.2})`,
        opacity: slideProgress,
        zIndex: 2,
      };
    }

    return {
      transform: 'translateX(0) scale(0.8)',
      opacity: 0,
      zIndex: 1,
    };
  };

  return (
    <div
      style={{
        height: '50vh',
        background: heroBg,
        borderBottom: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,
        borderRight: `1px solid ${borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'pan-y',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={(e) => {
        setTouchStart(e.clientX);
        setIsDragging(true);
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onMouseMove={(e) => {
        if (touchStart === null) return;
        setTouchDelta(e.clientX - touchStart);
      }}
      onMouseUp={(e) => {
        if (touchStart === null) return;
        const delta = e.clientX - touchStart;
        if (delta < -80) {
          setCurrent((prev) => (prev + 1) % items.length);
        } else if (delta > 80) {
          setCurrent((prev) => (prev - 1 + items.length) % items.length);
        }
        setTouchStart(null);
        setTouchDelta(0);
        setIsDragging(false);
        resetTimer();
      }}
      onMouseLeave={() => {
        setTouchStart(null);
        setTouchDelta(0);
        setIsDragging(false);
        resetTimer();
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease',
            pointerEvents: index === current ? 'auto' : 'none',
            ...getItemStyle(index),
          }}
        >
          <div
            style={{
              color: textColor,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              opacity: 0.6,
            }}
          >
            {item.type}
          </div>
          <h2
            style={{
              color: textColor,
              fontSize: 'clamp(1.25rem, 4vw, 2rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            {item.title}
          </h2>
          <p
            style={{
              color: accentColor,
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
              marginTop: '0.75rem',
              textAlign: 'center',
            }}
          >
            {item.tech}
          </p>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '0.5rem', position: 'absolute', bottom: '2rem', zIndex: 10 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i === current ? textColor : 'transparent',
              border: `1px solid ${textColor}`,
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      <button
        onClick={() => {
          setCurrent((prev) => (prev - 1 + items.length) % items.length);
          resetTimer();
        }}
        style={{
          position: 'absolute',
          left: '1rem',
          background: 'none',
          border: 'none',
          color: textColor,
          fontSize: '2rem',
          cursor: 'pointer',
          opacity: 0.5,
          zIndex: 10,
        }}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={() => {
          setCurrent((prev) => (prev + 1) % items.length);
          resetTimer();
        }}
        style={{
          position: 'absolute',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: textColor,
          fontSize: '2rem',
          cursor: 'pointer',
          opacity: 0.5,
          zIndex: 10,
        }}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}