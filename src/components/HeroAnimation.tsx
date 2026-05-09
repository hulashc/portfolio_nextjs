'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useTheme } from './ThemeProvider';
import { projects, Project } from '@/data/projects';
import { blogs, Blog } from '@/data/blogs';
import DetailPopup from './DetailPopup';

interface CarouselItem {
  type: 'project' | 'blog';
  id: string;
  title: string;
  tech: string;
  data: Project | Blog;
}

const PIXEL_SIZE = 16;
const FILL_DURATION = 1000;
const CLEAR_DURATION = 1200;

export default function HeroAnimation() {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Project | Blog | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentRef = useRef(current);
  const animatingRef = useRef(false);
  const swipeStartX = useRef(0);
  const rafRef = useRef<number | null>(null);

  currentRef.current = current;
  animatingRef.current = animating;

  const allItems = useMemo<CarouselItem[]>(() => [
    ...projects.map(p => ({ type: 'project' as const, id: p.id, title: p.title, tech: p.techStack.slice(0, 3).join(' · '), data: p })),
    ...blogs.map(b => ({ type: 'blog' as const, id: b.id, title: b.title, tech: b.subtitle || '', data: b })),
  ], []);

  const borderColor = isDark ? 'rgba(255,255,240,0.7)' : 'rgba(0,0,0,0.6)';
  const heroBg = isDark ? '#161616' : '#DADADA';
  const textColor = isDark ? '#ffffff' : '#000000';
  const accentColor = isDark ? '#E3DACC' : '#333333';

  // Cleanup raf on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const advanceToNextRef = useRef(() => {});
  advanceToNextRef.current = () => {
    transitionTo((currentRef.current + 1) % allItems.length);
  };

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!animatingRef.current) {
        advanceToNextRef.current();
      }
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, resetTimer]);

  const easeIn = (t: number) => t * t * t;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  function buildGrid(w: number, h: number, ox: number, oy: number) {
    const cols = Math.ceil(w / PIXEL_SIZE);
    const rows = Math.ceil(h / PIXEL_SIZE);
    const cells: { c: number; r: number; d: number; j: number }[] = [];
    let maxDist = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const d = Math.hypot(c + 0.5 - ox, r + 0.5 - oy);
        if (d > maxDist) maxDist = d;
        cells.push({ c, r, d, j: (Math.random() - 0.5) * 0.12 });
      }
    }
    return { cells, maxDist };
  }

  const transitionTo = useCallback((targetIndex: number) => {
    if (animatingRef.current || targetIndex === currentRef.current) return;
    setAnimating(true);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) { setAnimating(false); return; }

    const ctx = canvas.getContext('2d');
    if (!ctx) { setAnimating(false); return; }

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w;
    canvas.height = h;

    const ox = (w / 2) / PIXEL_SIZE;
    const oy = (h / 2) / PIXEL_SIZE;
    const { cells, maxDist } = buildGrid(w, h, ox, oy);

      const nonNullCtx = ctx;

    const filled = new Uint8Array(cells.length);
    const cleared = new Uint8Array(cells.length);

    // Phase 1: Fill with heroBg from center (easeIn)
    function doFill(startTime: number) {
      return function frame(ts: number) {
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / FILL_DURATION, 1);
        const waveFront = easeIn(progress) * maxDist * 1.15;
        let allDone = true;

        for (let i = 0; i < cells.length; i++) {
          if (filled[i]) continue;
          const cell = cells[i];
          if (waveFront >= cell.d + cell.j * maxDist) {
            nonNullCtx.fillStyle = textColor;
            nonNullCtx.fillRect(cell.c * PIXEL_SIZE, cell.r * PIXEL_SIZE, PIXEL_SIZE + 1, PIXEL_SIZE + 1);
            filled[i] = 1;
          } else {
            allDone = false;
          }
        }

        if (!allDone) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          // Swap card behind the solid canvas
          setCurrent(targetIndex);
          // Phase 2: Clear from center (easeOut)
          rafRef.current = requestAnimationFrame(doClear(performance.now()));
        }
      };
    }

    // Phase 2: Clear pixels from center (easeOut)
    function doClear(startTime: number) {
      return function frame(ts: number) {
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / CLEAR_DURATION, 1);
        const waveFront = easeOut(progress) * maxDist * 1.15;
        let allDone = true;

        for (let i = 0; i < cells.length; i++) {
          if (cleared[i]) continue;
          const cell = cells[i];
          if (waveFront >= cell.d + cell.j * maxDist) {
            nonNullCtx.clearRect(cell.c * PIXEL_SIZE, cell.r * PIXEL_SIZE, PIXEL_SIZE + 1, PIXEL_SIZE + 1);
            cleared[i] = 1;
          } else {
            allDone = false;
          }
        }

        if (!allDone) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          setAnimating(false);
        }
      };
    }

    rafRef.current = requestAnimationFrame(doFill(performance.now()));

    resetTimer();
  }, [resetTimer, heroBg]);

  const handlePrev = () => transitionTo((currentRef.current - 1 + allItems.length) % allItems.length);
  const handleNext = () => transitionTo((currentRef.current + 1) % allItems.length);

  const handlePointerDown = (clientX: number) => {
    if (animating) return;
    swipeStartX.current = clientX;
    setIsSwiping(true);
    setSwipeX(0);
    setSwipeDistance(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isSwiping || animating) return;
    const delta = clientX - swipeStartX.current;
    setSwipeX(delta);
    setSwipeDistance(Math.abs(delta));
  };

  const handlePointerUp = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    if (swipeDistance < 10) {
      const item = allItems[currentRef.current];
      setSelectedItem(item.data);
    } else if (swipeX < -80) {
      handleNext();
    } else if (swipeX > 80) {
      handlePrev();
    }
    setSwipeX(0);
    setSwipeDistance(0);
    resetTimer();
  };

  const handlePointerCancel = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    setSwipeX(0);
    setSwipeDistance(0);
    resetTimer();
  };

  const item = allItems[current];

  return (
    <>
      <div
        ref={containerRef}
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
          userSelect: 'none',
        }}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
        onTouchCancel={handlePointerCancel}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerCancel}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isSwiping ? `translateX(${swipeX}px)` : 'translateX(0)',
            transition: isSwiping ? 'none' : 'transform 0.3s ease',
            position: 'relative',
            zIndex: 2,
            pointerEvents: animating ? 'none' : 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              const i = allItems[currentRef.current];
              setSelectedItem(i.data);
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
        </div>

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        <button
          onClick={handlePrev}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            left: '1rem',
            background: 'none',
            border: 'none',
            color: textColor,
            fontSize: '2rem',
            cursor: animating ? 'default' : 'pointer',
            opacity: 0.5,
            zIndex: 10,
          }}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: textColor,
            fontSize: '2rem',
            cursor: animating ? 'default' : 'pointer',
            opacity: 0.5,
            zIndex: 10,
          }}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <DetailPopup
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || ''}
        sections={selectedItem?.sections || []}
        link={selectedItem?.link}
      />
    </>
  );
}
