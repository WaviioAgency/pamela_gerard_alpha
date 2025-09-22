import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (let k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if translation not found
      }
    }
    
    if (typeof value === 'object' && value[language]) {
      return value[language];
    }
    
    return key;
  };

  const changeLanguage = (newLanguage) => {
    if (['fr', 'en', 'hu'].includes(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};