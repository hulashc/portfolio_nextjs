'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const names: Record<string, string> = {
  en: 'Donempudi Hulash Chand',
  te: 'దొనెంపూడి హుళష్ చంద్',
  hi: 'दोनेमपूड़ी हुलाश चंद',
  kn: 'ದೊನೆಂಪೂಡಿ ಹುಳಶ್ ಚಂದ್',
  ja: 'ドネンプディ フラシュ チャンド',
};

const langs = ['en', 'te', 'hi', 'kn', 'ja'];

interface LanguageContextValue {
  lang: string;
  cycleLang: () => void;
  getName: () => string;
  getFirstName: () => string;
  getLastName: () => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored && langs.includes(stored)) {
      setLang(stored);
    }
  }, []);

  const cycleLang = () => {
    const i = langs.indexOf(lang);
    const next = langs[(i + 1) % langs.length];
    setLang(next);
    localStorage.setItem('lang', next);
  };

  const getName = () => names[lang];
  const full = names[lang];
  const spaceIdx = full.indexOf(' ');
  const getFirstName = () => spaceIdx === -1 ? full : full.slice(0, spaceIdx);
  const getLastName = () => spaceIdx === -1 ? '' : full.slice(spaceIdx + 1);

  return (
    <LanguageContext.Provider value={{ lang, cycleLang, getName, getFirstName, getLastName }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
