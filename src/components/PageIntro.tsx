'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

const PIXEL_SIZE = 16;

export default function PageIntro() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroLoaded = useRef(false);
  const started = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed')) {
      setVisible(false);
      return;
    }
    if (started.current) return;
    started.current = true;

    const textColor = isDark ? '#DADADA' : '#161616';
    const bgColor = isDark ? '#161616' : '#DADADA';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = ctx;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Fill canvas fully with textColor (hides the page)
    c.fillStyle = textColor;
    c.fillRect(0, 0, w, h);

    // Preload hero image
    const img = new Image();
    img.onload = () => { heroLoaded.current = true; };
    img.src = '/images/hero-image.png';
    if (img.complete) heroLoaded.current = true;

    // Pixel man shape (3 wide × 5 tall, each cell is PIXEL_SIZE)
    const MAN_W = 3;
    const MAN_H = 5;
    // [col, row] offsets of filled cells relative to man's top-left
    const manTorso = [
      [1, 0],       // head
      [1, 1],       // neck
      [1, 2],       // body
      [0, 3], [2, 3], // arms
    ];
    const legLeft  = [[0, 4]];  // left leg forward
    const legRight = [[2, 4]];  // right leg forward

    // Loading bar
    const barW = Math.min(w * 0.6, 480);
    const barH = PIXEL_SIZE * 2;
    const barX = (w - barW) / 2;
    const barY = h * 0.72;
    const manY = barY - MAN_H * PIXEL_SIZE;

    // Build pixel grid for dissolve (same pattern as HeroAnimation)
    const cols = Math.ceil(w / PIXEL_SIZE);
    const rows = Math.ceil(h / PIXEL_SIZE);
    const ox = cols / 2;
    const oy = rows / 2;
    const cells: { c: number; r: number; d: number; j: number }[] = [];
    let maxDist = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.hypot(c + 0.5 - ox, r + 0.5 - oy);
        if (dist > maxDist) maxDist = dist;
        cells.push({ c, r, d: dist, j: (Math.random() - 0.5) * 0.12 });
      }
    }

    let progress = 0;
    const LOAD_MS = 2500;
    let loadStart = performance.now();
    let frameId: number;
    let dissolveFrame: number | null = null;

    function drawMan(manX: number, frame: boolean) {
      const legs = frame ? legLeft : legRight;
      const allCells = [...manTorso, ...legs];
      for (const [col, row] of allCells) {
        c.fillStyle = bgColor;
        c.fillRect(manX + col * PIXEL_SIZE, manY + row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }

    function drawScene(pct: number) {
      // Erase previous frame in the animation area
      const areaX = barX - PIXEL_SIZE * 4;
      const areaY = manY - PIXEL_SIZE * 2;
      const areaW = barW + PIXEL_SIZE * 8;
      const areaH = MAN_H * PIXEL_SIZE + barH + PIXEL_SIZE * 4;
      c.fillStyle = textColor;
      c.fillRect(areaX, areaY, areaW, areaH);

      // Bar fill
      const fillW = (barW * pct) / 100;
      c.fillStyle = bgColor;
      c.fillRect(barX, barY, fillW, barH);

      // Bar border
      c.strokeStyle = bgColor;
      c.lineWidth = 2;
      c.strokeRect(barX, barY, barW, barH);

      // Pixel man on top of bar
      const manX = barX + (barW * pct) / 100 - (MAN_W * PIXEL_SIZE) / 2;
      const clampedManX = Math.max(barX - PIXEL_SIZE, Math.min(barX + barW - MAN_W * PIXEL_SIZE + PIXEL_SIZE, manX));
      const legFrame = Math.floor(pct / 4) % 2 === 0;
      drawMan(clampedManX, legFrame);

      // Percentage text
      const displayPct = Math.floor(pct);
      c.fillStyle = bgColor;
      c.font = `bold ${PIXEL_SIZE * 1.25}px "Courier New", monospace`;
      c.textAlign = 'center';
      c.fillText(`${displayPct}%`, w / 2, barY - MAN_H * PIXEL_SIZE - PIXEL_SIZE);
    }

    // --- Phase 1: Loading animation ---
    function animate() {
      const elapsed = performance.now() - loadStart;
      progress = Math.min((elapsed / LOAD_MS) * 100, 100);
      drawScene(progress);

      if (progress >= 100 && heroLoaded.current) {
        startPixelClear();
      } else {
        frameId = requestAnimationFrame(animate);
      }
    }

    // --- Phase 2: Pixel dissolve (matches HeroAnimation's doClear) ---
    function startPixelClear() {
      const cleared = new Uint8Array(cells.length);
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const CLEAR_MS = 1200;

      function doClear(start: number) {
        return function frame(ts: number) {
          const elapsed = ts - start;
          const pct = Math.min(elapsed / CLEAR_MS, 1);
          const waveFront = easeOut(pct) * maxDist * 1.15;
          let allDone = true;

          for (let i = 0; i < cells.length; i++) {
            if (cleared[i]) continue;
            const cell = cells[i];
            if (waveFront >= cell.d + cell.j * maxDist) {
              c.clearRect(cell.c * PIXEL_SIZE, cell.r * PIXEL_SIZE, PIXEL_SIZE + 1, PIXEL_SIZE + 1);
              cleared[i] = 1;
            } else {
              allDone = false;
            }
          }

          if (!allDone) {
            dissolveFrame = requestAnimationFrame(frame);
          } else {
            sessionStorage.setItem('introPlayed', 'true');
            setVisible(false);
          }
        };
      }

      dissolveFrame = requestAnimationFrame(doClear(performance.now()));
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      if (dissolveFrame !== null) cancelAnimationFrame(dissolveFrame);
    };
  }, [isDark]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: isDark ? '#161616' : '#DADADA',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div>
  );
}
