import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Contact.module.css';

const Contact = () => {
  const { t } = useLanguage();

  const phoneNumber = '+33 07 61 06 37 36';
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, '');

  const handleCall = () => {
    window.location.href = `tel:${formattedPhoneNumber}`;
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{t('contact.title')}</h2>
            <h3 className={styles.subtitle}>{t('contact.subtitle')}</h3>
            <p className={styles.description}>{t('contact.description')}</p>
            
            <button
              className={styles.ctaButton}
              onClick={handleCall}
              aria-label={`Appeler Pamela GERARD au ${phoneNumber}`}
            >
              {t('contact.callButton')}
            </button>
          </div>

          <div className={styles.visualContent}>
            <div className={styles.artworkPreview}>
              <div className={styles.artwork}>
                <img
                  src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Œuvre d'art de Pamela GERARD"
                  loading="lazy"
                />
                <div className={styles.artworkOverlay}></div>
              </div>
              <div className={styles.artworkInfo}>
                <p className={styles.artworkText}>
                  "Chaque appel est le début d'une collaboration artistique unique."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;