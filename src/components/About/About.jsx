import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './About.module.css';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src="/5.jpg"
                alt="Portrait de Pamela GERARD"
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
          
          <div className={styles.textSection}>
            <h2 className={styles.title}>{t('about.title')}</h2>
            
            <div className={styles.visionBlock}>
              <blockquote className={styles.vision}>
                "{t('about.vision')}"
              </blockquote>
            </div>
            
            <p className={styles.description}>
              {t('about.experience')}
            </p>
            
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>🎨</div>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>{t('about.years')}</h3>
                  <p className={styles.highlightText}>{t('about.yearsText')}</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>❤️</div>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>{t('about.passion')}</h3>
                  <p className={styles.highlightText}>{t('about.passionText')}</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>🤝</div>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>{t('about.proximity')}</h3>
                  <p className={styles.highlightText}>{t('about.proximityText')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;