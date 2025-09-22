import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './LanguageSelector.module.css';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hu', label: 'Magyar', flag: '🇭🇺' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const handleKeyDown = (event, langCode) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLanguageChange(langCode);
    }
  };

  return (
    <div className={styles.languageSelector} ref={dropdownRef}>
      <button
        className={styles.currentLanguage}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer de langue"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.flag}>{currentLanguage?.flag}</span>
        <span className={styles.code}>{currentLanguage?.code.toUpperCase()}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`${styles.languageOption} ${lang.code === language ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              onKeyDown={(e) => handleKeyDown(e, lang.code)}
              role="option"
              aria-selected={lang.code === language}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.label}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;