"use client";

import Ghost from "./Ghost";

interface FooterProps {
  isDark: boolean;
  text: string;
  borderColor: string;
}

export default function Footer({ isDark, text, borderColor }: FooterProps) {
  return (
    <div style={{ borderBottom: `1px solid ${borderColor}`, borderLeft: `1px solid ${borderColor}`, borderRight: `1px solid ${borderColor}` }} className="p-4">
      <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-3">
        <div className="text-center md:text-left">
          <p className="text-xs" style={{ color: text }}>London, UK · Open to work</p>
          <p className="text-xs" style={{ color: text }}>Built with Next.js · Vercel</p>
        </div>
        <div className="flex justify-center" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ transform: 'scale(0.35)', transformOrigin: 'center' }}>
            <Ghost isDark={isDark} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
          <a href="mailto:hulashc@gmail.com" style={{ border: `1px solid ${borderColor}`, padding: '8px', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={text}>
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/hulash/" target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${borderColor}`, padding: '8px', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={text}>
              <path d="M20.447 20.247h-3.054v-5.57c0-1.326-.022-3.031-1.847-3.031-1.847 0-2.13 1.445-2.13 2.943v5.658H9.351V9h2.936v1.531h.041c.415-.786 1.43-1.615 2.944-1.615 3.152 0 3.732 2.073 3.732 4.771v6.56zM5.337 7.433c-1.144 0-2.063-.938-2.063-2.095 0-1.157.92-2.096 2.064-2.096 1.145 0 2.064.939 2.064 2.096 0 1.157-.92 2.095-2.064 2.095zm1.527 12.814H3.81V9h2.054v5.247zm4.607 0h-3.53V9h3.53v12.814z"/>
            </svg>
          </a>
          <a href="https://github.com/hchand" target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${borderColor}`, padding: '8px', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={text}>
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.79 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.268 0 2.547.17 3.73.474 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.787 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://instagram.com/hulash__chand" target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${borderColor}`, padding: '8px', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={text}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="https://medium.com/@hulashc" target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${borderColor}`, padding: '8px', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={text}>
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
          </a>
          <a href="https://classical.music.apple.com/us/album/1670601344" target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${borderColor}`, padding: '8px 12px', cursor: 'pointer', textDecoration: 'none' }}>
            <p className="text-xs mb-1" style={{ color: text }}>NOW PLAYING</p>
            <div className="flex items-center gap-2">
              <div className="flex items-end h-5 gap-px">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1"
                    style={{
                      height: `${5 + Math.sin(i) * 8}px`,
                      backgroundColor: text,
                      animation: `psy ${1.2 + i * 0.15}s ease-in-out ${i * 0.18}s infinite`
                    }}
                  />
                ))}
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: text }}>Utopia</p>
                <p className="text-xs" style={{ color: text, opacity: 0.6 }}>Horacio Pagani</p>
              </div>
              <div className="w-10 h-1" style={{ backgroundColor: `${text}33` }}>
                <div className="h-full" style={{ backgroundColor: text, width: '35%', animation: 'progress 8s linear infinite' }} />
              </div>
              <div className="w-5 h-5 flex items-center justify-center" style={{ border: `1px solid ${text}` }}>
                <span style={{ color: text, fontSize: '10px' }}>▶</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <style>{`
        @keyframes psy {
          0% { transform: scaleY(0.3) rotate(0deg); height: 6px; }
          25% { transform: scaleY(1.2) rotate(2deg); height: 28px; }
          50% { transform: scaleY(0.5) rotate(-1deg); height: 14px; }
          75% { transform: scaleY(1.1) rotate(-2deg); height: 24px; }
          100% { transform: scaleY(0.3) rotate(0deg); height: 6px; }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
