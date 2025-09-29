import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import styles from './Header.module.css';

const Header = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img 
            src="/logo_pg_2.png" 
            alt="Pamela GERARD - Artiste Peintre"
            className={styles.logoImage}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.id} className={styles.navItem}>
                <button
                  onClick={() => smoothScrollTo(item.id)}
                  className={styles.navLink}
                  aria-label={`Aller à la section ${item.label}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language Selector */}
        <div className={styles.rightSection}>
          <LanguageSelector />
          
          {/* Mobile Menu Button */}
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu de navigation"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
          <ul className={styles.mobileNavList}>
            {navItems.map(item => (
              <li key={item.id} className={styles.mobileNavItem}>
                <button
                  onClick={() => smoothScrollTo(item.id)}
                  className={styles.mobileNavLink}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;