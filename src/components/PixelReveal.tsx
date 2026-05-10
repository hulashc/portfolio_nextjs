'use client';

import { useEffect, useRef } from 'react';

const PIXEL_SIZE = 16;
const REVEAL_DURATION = 1200;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

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

interface PixelRevealProps {
  children: React.ReactNode;
  bgColor: string;
  textColor: string;
  delay: number;
}

export default function PixelReveal({ children, bgColor, textColor, delay }: PixelRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return;

    canvas.width = w;
    canvas.height = h;

    const canvasEl = canvas;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;
    const nonNullCtx = ctx;

    const ox = (w / 2) / PIXEL_SIZE;
    const oy = (h / 2) / PIXEL_SIZE;
    const { cells, maxDist } = buildGrid(w, h, ox, oy);

    // Fill canvas with textColor instantly (card hidden from the start)
    nonNullCtx.fillStyle = textColor;
    for (const cell of cells) {
      nonNullCtx.fillRect(cell.c * PIXEL_SIZE, cell.r * PIXEL_SIZE, PIXEL_SIZE + 1, PIXEL_SIZE + 1);
    }

    // Schedule clear after delay
    const timer = setTimeout(() => {
      const cleared = new Uint8Array(cells.length);

      function doClear(startTime: number) {
        return function frame(ts: number) {
          const elapsed = ts - startTime;
          const progress = Math.min(elapsed / REVEAL_DURATION, 1);
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
            doneRef.current = true;
            if (canvasEl.parentNode) {
              canvasEl.parentNode.removeChild(canvasEl);
            }
          }
        };
      }

      rafRef.current = requestAnimationFrame(doClear(performance.now()));
    }, delay);

    return () => {
      clearTimeout(timer);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [bgColor, textColor, delay]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
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
      {children}
    </div>
  );
}
