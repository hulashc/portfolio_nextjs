'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function HeroAnimation() {
  const { isDark } = useTheme();
  const patternRef = useRef<HTMLDivElement>(null);

  const borderColor = isDark ? 'rgba(255,255,240,0.7)' : 'rgba(0,0,0,0.6)';
  const heroBg = isDark ? '#161616' : '#DADADA';

  useEffect(() => {
    const pattern = patternRef.current;
    if (!pattern) return;

    let lastScrollY = 0;
    let locked = true;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.5;
      const progress = Math.min(scrollY / maxScroll, 1);

      if (locked && progress < 1) {
        window.scrollTo(0, lastScrollY);
        return;
      }

      if (progress >= 1) {
        locked = false;
      }

      lastScrollY = scrollY;

      const scale = 0.5 + progress * 1.5;
      const rotate = progress * 360;
      const opacity = 0.3 + progress * 0.7;
      const translateY = progress * -30;

      pattern.style.transform = `scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`;
      pattern.style.opacity = String(opacity);
    };

    const handleWheel = (e: WheelEvent) => {
      if (locked) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      style={{
        height: '50vh',
        position: 'sticky',
        top: 0,
        background: heroBg,
        borderBottom: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,
        borderRight: `1px solid ${borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div
        ref={patternRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/seamless-pattern.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
          backgroundPosition: 'center center',
        }}
      />
    </div>
  );
}