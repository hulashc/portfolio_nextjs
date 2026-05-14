'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const GRID = 3;
const ASSETS = [
  '/images/art-1.jpeg',
  '/images/art-2.jpg',
  '/images/art-3.jpg',
  '/images/art-4.jpg',
  '/images/art-5.jpg',
  '/images/art-6.jpg',
  '/images/art-7.jpg',
  '/images/art-8.jpg',
  '/images/art-9.jpg',
];

export default function VanGoghArtViewer() {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(0);
  const [sel, setSel] = useState(4);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready >= ASSETS.length) {
      const t = setTimeout(() => setLoaded(true), 600);
      return () => clearTimeout(t);
    }
  }, [ready]);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <style>{`
        :root { --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); }

        .vav-wrap { position: relative; width: 100%; background: #111; overflow: hidden; border-radius: 2rem; }
        .vav-open .vav-wrap { border-radius: 0; }

        .vav-grid { display: grid; grid-template-columns: repeat(${GRID}, 1fr); gap: 0.5rem; padding: 0.5rem; }

        .vav-cell { border-radius: 2rem; overflow: hidden; background: #fff; cursor: pointer; position: relative; padding-top: 75%; opacity: 0.25; transition: opacity 0.6s var(--ease-in-out); }
        .vav-cell.selected { opacity: 1; pointer-events: none; }
        .vav-cell img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale3d(2, 2, 2); transition: transform 1s var(--ease-in-out); user-select: none; pointer-events: none; }
        .vav-open .vav-cell.selected img { transform: scale3d(1, 1, 1); }

        .vav-focus { position: absolute; inset: 0; z-index: 6; pointer-events: none; display: flex; }
        .vav-focus button { pointer-events: all; width: 100%; height: 100%; margin: auto; border-radius: 2rem; border: 2px solid whitesmoke; cursor: zoom-in; background: transparent; }
        .vav-open .vav-focus { opacity: 0; }

        .vav-back { position: absolute; top: 1rem; left: 1rem; padding: 0.5rem 1.5rem; backdrop-filter: blur(5px); background: rgba(14,13,13,0.4); border-radius: 2rem; color: whitesmoke; opacity: 0; transition: opacity 0.6s var(--ease-in-out); text-transform: uppercase; font-size: 12px; letter-spacing: 0.03em; z-index: 8; border: none; cursor: pointer; pointer-events: none; }
        .vav-open .vav-back { opacity: 1; pointer-events: all; }

        .vav-mas { position: absolute; inset: 0; margin: auto; width: 2rem; height: 2rem; z-index: 10; pointer-events: none; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
        .vav-loading .vav-mas { opacity: 1; }
        .vav-loaded .vav-mas { opacity: 0; }
        .vav-mas .r { width: 5px; height: 5px; background: #fff; position: absolute; z-index: 1; }
        .vav-mas .v, .vav-mas .h { background: #fff; position: absolute; margin: auto; }
        .vav-mas .v { width: 1px; height: 100%; left: calc(1rem - 0.5px); }
        .vav-mas .h { width: 100%; height: 1px; top: calc(1rem - 0.5px); }

        .vav-map { opacity: 1; transition: opacity 0.6s; position: absolute; bottom: 0.5rem; right: 0.5rem; width: 5rem; height: 5rem; backdrop-filter: blur(5px); background: rgba(34,34,34,0.1); padding: 0.35rem; z-index: 7; display: grid; grid-template: repeat(${GRID}, 1fr) / repeat(${GRID}, 1fr); gap: 3px; border-radius: 0.5rem; }
        .vav-open .vav-map { opacity: 0; pointer-events: none; }
        .vav-map div { background: whitesmoke; border-radius: 2px; opacity: 0.1; transition: opacity 0.3s; cursor: pointer; }
        .vav-map div:hover { opacity: 0.5; }
        .vav-map .vav-map-sel { opacity: 1 !important; }
      `}</style>

      <div className={`${loaded ? 'vav-loaded' : 'vav-loading'} ${open ? 'vav-open' : ''}`}>
        <div className="vav-wrap">
          <div className="vav-mas"><div className="v" /><div className="h" /><div className="r" /></div>

          <div className="vav-grid">
            {ASSETS.map((src, i) => (
              <div
                key={i}
                className={`vav-cell ${i === sel ? 'selected' : ''}`}
                onClick={() => { setSel(i); }}
              >
                <Image
                  src={src}
                  alt={`Art ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 200px"
                  style={{ objectFit: 'cover', transform: 'scale3d(2, 2, 2)', transition: 'transform 1s var(--ease-in-out)', userSelect: 'none', pointerEvents: 'none' }}
                  onLoad={() => setReady(p => Math.min(p + 1, ASSETS.length))}
                  onError={() => setReady(p => Math.min(p + 1, ASSETS.length))}
                />
              </div>
            ))}
          </div>

          <div className="vav-focus" onClick={() => !open && setOpen(true)}>
            <button aria-label="expand image" />
          </div>

          <div className="vav-map">
            {Array.from({ length: GRID * GRID }).map((_, i) => (
              <div key={i} className={i === sel ? 'vav-map-sel' : ''} onClick={() => setSel(i)} />
            ))}
          </div>
        </div>

        <button className="vav-back" onClick={() => setOpen(false)}>close</button>
      </div>
    </div>
  );
}
