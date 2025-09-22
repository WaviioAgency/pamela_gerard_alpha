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
                src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600" 
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
                  <h3 className={styles.highlightTitle}>15+ ans</h3>
                  <p className={styles.highlightText}>d'expérience artistique</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>❤️</div>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>Passion</h3>
                  <p className={styles.highlightText}>pour les couleurs et émotions</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>🤝</div>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>Proximité</h3>
                  <p className={styles.highlightText}>avec mes clients</p>
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