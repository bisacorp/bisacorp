
"use client";

import { useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = translations[language];

  return { language, toggleLanguage, t };
}
