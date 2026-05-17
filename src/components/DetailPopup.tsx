'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { SectionType, ProjectStat, SkillBadge, ArchitectureCard, Phase, Decision, CostSection, RecruiterCard, TimelineEntry } from '@/data/projects';
import VanGoghArtViewer from './VanGoghArtViewer';
import RolodexScroll from './RolodexScroll';

interface DetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sections: SectionType[];
  link?: string;
  githubLink?: string;
}

export default function DetailPopup({ isOpen, onClose, title, sections, link, githubLink }: DetailPopupProps) {
  const { isDark } = useTheme();
  const backdropRef = useRef<HTMLDivElement>(null);
  const [timelinePage, setTimelinePage] = useState(0);
  const [flipDir, setFlipDir] = useState<'next' | 'prev' | null>(null);

  const borderColor = isDark ? 'rgba(255,255,240,0.7)' : 'rgba(0,0,0,0.6)';
  const popupBg = isDark ? '#161616' : '#DADADA';
  const textColor = isDark ? '#DADADA' : '#161616';
  const mutedColor = isDark ? 'rgba(255,255,240,0.5)' : 'rgba(0,0,0,0.5)';
  const accentBg = isDark ? 'rgba(255,255,240,0.1)' : 'rgba(0,0,0,0.05)';
  const highlightBg = isDark ? '#E3DACC' : '#333333';
  const highlightText = isDark ? '#161616' : '#DADADA';

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);

      const backdrop = backdropRef.current;
      const preventBgScroll = (e: WheelEvent | TouchEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.popup-scroll')) {
          e.preventDefault();
        }
      };
      if (backdrop) {
        backdrop.addEventListener('wheel', preventBgScroll, { passive: false });
        backdrop.addEventListener('touchmove', preventBgScroll, { passive: false });
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        if (backdrop) {
          backdrop.removeEventListener('wheel', preventBgScroll);
          backdrop.removeEventListener('touchmove', preventBgScroll);
        }
      };
    }
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const renderStatCard = (stat: ProjectStat, index: number) => (
    <div
      key={index}
      style={{
        background: popupBg,
        border: `1px solid ${borderColor}`,
        padding: '0.75rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
      }}
    >
      <span style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 800, color: textColor, lineHeight: 1 }}>
        {stat.num}
      </span>
      <span style={{ fontSize: '0.7rem', color: mutedColor, textAlign: 'center' }}>{stat.label}</span>
    </div>
  );

  const renderSkillBadge = (badge: SkillBadge, index: number) => (
    <span
      key={index}
      style={{
        fontSize: '0.75rem',
        padding: '0.25rem 0.75rem',
        background: badge.highlight ? highlightBg : accentBg,
        color: badge.highlight ? highlightText : mutedColor,
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
      }}
    >
      {badge.text}
    </span>
  );

  const renderArchitectureCard = (card: ArchitectureCard, index: number) => (
    <div
      key={index}
      style={{
        background: popupBg,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: card.color || textColor,
        }}
      />
      <span style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'block' }}>{card.icon}</span>
      <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: textColor, marginBottom: '0.5rem', marginTop: '0.5rem' }}>
        {card.title}
      </h4>
      <p style={{ fontSize: '0.75rem', color: mutedColor, lineHeight: 1.5, marginBottom: '0.75rem' }}>
        {card.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {card.stack.map((tech, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.6rem',
              padding: '2px 6px',
              background: accentBg,
              color: mutedColor,
              borderRadius: '4px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  const renderPhase = (phase: Phase, index: number, isLast: boolean) => (
    <div key={index} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '1rem', marginBottom: isLast ? 0 : '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: popupBg,
            border: `2px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: mutedColor,
            flexShrink: 0,
          }}
        >
          {phase.num}
        </div>
        {!isLast && <div style={{ flex: 1, width: '2px', background: borderColor, marginTop: '0.5rem', opacity: 0.5 }} />}
      </div>
      <div
        style={{
          background: popupBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: textColor, margin: 0 }}>{phase.title}</h4>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
              background: accentBg,
              color: mutedColor,
              borderRadius: '4px',
            }}
          >
            {phase.badge}
          </span>
        </div>
        <p style={{ fontSize: '0.75rem', color: mutedColor, lineHeight: 1.6, marginBottom: '0.75rem' }}>
          {phase.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {phase.outcomes.map((outcome, i) => (
            <span
              key={i}
              style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
                background: isDark ? 'rgba(78, 170, 120, 0.2)' : 'rgba(78, 170, 120, 0.1)',
                color: '#4eaa78',
                borderRadius: '9999px',
                fontWeight: 500,
              }}
            >
              {outcome}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDecision = (decision: Decision, index: number) => (
    <div
      key={index}
      style={{
        background: popupBg,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <span style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800, color: borderColor, lineHeight: 1, opacity: 0.3 }}>
        {decision.num}
      </span>
      <span
        style={{
          fontSize: '0.65rem',
          padding: '2px 8px',
          background: isDark ? 'rgba(224, 122, 58, 0.2)' : 'rgba(224, 122, 58, 0.1)',
          color: '#e07a3a',
          borderRadius: '9999px',
          fontWeight: 600,
          alignSelf: 'flex-start',
        }}
      >
        {decision.badge}
      </span>
      <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: textColor, margin: 0 }}>{decision.title}</h4>
      <p style={{ fontSize: '0.75rem', color: mutedColor, lineHeight: 1.6 }}>{decision.description}</p>
    </div>
  );

  const renderCostSection = (section: CostSection) => (
    <div
      key={section.title}
      style={{
        background: popupBg,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: textColor, marginBottom: '0.75rem' }}>{section.title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {section.items.map((item, i) => (
          <li key={i} style={{ fontSize: '0.75rem', color: mutedColor, display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: '#4eaa78', fontWeight: 700 }}>→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderRecruiterCard = (card: RecruiterCard, index: number) => (
    <div
      key={index}
      style={{
        background: popupBg,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <span style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'block' }}>{card.icon}</span>
      <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: textColor, marginBottom: '0.5rem' }}>{card.title}</h4>
      <p style={{ fontSize: '0.75rem', color: mutedColor, lineHeight: 1.6 }}>{card.description}</p>
    </div>
  );

  const renderSection = (section: SectionType, index: number) => {
    switch (section.type) {
      case 'hero':
        return (
          <p key={index} style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)', color: mutedColor, lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {section.subtitle}
          </p>
        );
      case 'stats':
        return (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {section.items.map((stat, i) => renderStatCard(stat, i))}
          </div>
        );
      case 'text':
        return (
          <p key={index} style={{ fontSize: '0.8rem', color: textColor, lineHeight: 1.8, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
            <span dangerouslySetInnerHTML={{ __html: section.content || '' }} />
          </p>
        );
      case 'section':
        return (
          <div key={index} style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: 700, color: textColor, marginBottom: section.content ? '0.5rem' : 0, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              {section.title}
            </h3>
            {section.content && (
              <p style={{ fontSize: '0.75rem', color: mutedColor, lineHeight: 1.6 }}>{section.content}</p>
            )}
          </div>
        );
      case 'skill-badges':
        return (
          <div key={index} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
            {section.items.map((badge, i) => renderSkillBadge(badge, i))}
          </div>
        );
      case 'architecture-cards':
        return (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {section.items.map((card, i) => renderArchitectureCard(card, i))}
          </div>
        );
      case 'phases':
        return (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            {section.items.map((phase, i) => renderPhase(phase, i, i === section.items.length - 1))}
          </div>
        );
      case 'decisions':
        return (
          <div key={index} style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            {section.items.map((decision, i) => renderDecision(decision, i))}
          </div>
        );
      case 'cost':
        return (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {section.sections.map((s, i) => renderCostSection(s))}
          </div>
        );
      case 'recruiter-cards':
        return (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {section.items.map((card, i) => renderRecruiterCard(card, i))}
          </div>
        );
      case 'videos':
        return (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {section.sources.map((src, i) => (
              <video
                key={i}
                src={src}
                controls
                style={{ width: '100%', border: `1px solid ${borderColor}` }}
              />
            ))}
          </div>
        );
      case 'embed':
        return (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <iframe
              src={section.url}
              style={{
                width: '100%',
                height: section.height || '400px',
                border: `1px solid ${borderColor}`,
              }}
              title="Embedded content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case 'paper-button':
        return (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <a
              href={section.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                border: `1px solid ${borderColor}`,
                background: accentBg,
                color: textColor,
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,240,0.15)' : 'rgba(0,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = accentBg)}
            >
              <span style={{ fontSize: '1rem' }}>📄</span>
              {section.label}
            </a>
          </div>
        );
      case 'art-viewer':
        return <VanGoghArtViewer key={index} />;
      case 'timeline':
        const timelineEntries = (section as { type: 'timeline'; entries: TimelineEntry[] }).entries;
        return <RolodexScroll key={index} items={timelineEntries.map(e => ({ image: e.imageUrl, title: e.title, year: e.year, category: e.category }))} />;
      default:
        return null;
    }
  };

  // GitHub icon SVG
  const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  return (
    <div
      ref={backdropRef}
      className="detail-popup-backdrop"
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
    >
      <div
        className="detail-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: popupBg,
          border: `1px solid ${borderColor}`,
          width: '100%',
          maxWidth: '900px',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            borderBottom: `1px solid ${borderColor}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <h2
              style={{
                color: textColor,
                fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'none',
                  border: `1px solid ${borderColor}`,
                  color: textColor,
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  textDecoration: 'none',
                }}
                aria-label="View on GitHub"
              >
                <GitHubIcon />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'none',
                  border: `1px solid ${borderColor}`,
                  color: textColor,
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                  textDecoration: 'none',
                }}
                aria-label="Open live site"
              >
                &#x2197;
              </a>
            )}
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: `1px solid ${borderColor}`,
                color: textColor,
                width: '44px',
                height: '44px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0,
              }}
              aria-label="Close popup"
            >
              ×
            </button>
          </div>
        </div>
        <div
          className="popup-scroll"
          style={{
            padding: '1.5rem',
            overflowY: 'scroll',
            flex: '1 1 0',
            minHeight: 0,
          }}
        >
          {sections.map((section, index) => renderSection(section, index))}
        </div>
      </div>
    </div>
  );
}
