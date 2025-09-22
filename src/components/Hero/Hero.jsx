import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Hero.module.css';

const Hero = () => {
  const { t } = useLanguage();

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              {t('hero.title')}
            </h1>
            <h2 className={styles.subtitle}>
              {t('hero.subtitle')}
            </h2>
            <p className={styles.description}>
              {t('hero.description')}
            </p>
            <div className={styles.actions}>
              <button 
                className={styles.ctaButton}
                onClick={() => smoothScrollTo('gallery')}
                aria-label="Découvrir la galerie"
              >
                {t('nav.gallery')}
              </button>
              <button 
                className={styles.secondaryButton}
                onClick={() => smoothScrollTo('about')}
                aria-label="En savoir plus sur l'artiste"
              >
                {t('nav.about')}
              </button>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.heroImage}>
              <img 
                src="https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=600" 
              src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600" 
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  );
};

export default Hero;