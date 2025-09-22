import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './PaintingCard.module.css';

const PaintingCard = ({ painting }) => {
  const { t, language } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPoem, setShowPoem] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getTranslatedText = (textObj) => {
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj.fr || textObj.en || '';
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        {!imageLoaded && (
          <div className={styles.imagePlaceholder}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
        <img
          src={painting.image}
          alt={getTranslatedText(painting.title)}
          className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <button
            className={styles.poemButton}
            onClick={() => setShowPoem(!showPoem)}
            aria-label="Afficher le poème"
          >
            📝
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {getTranslatedText(painting.title)}
        </h3>
        
        <p className={styles.description}>
          {getTranslatedText(painting.description)}
        </p>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>{t('gallery.dimensions')}:</span>
            <span className={styles.detailValue}>{painting.dimensions}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>{t('gallery.price')}:</span>
            <span className={styles.detailValue}>{painting.price}</span>
          </div>
        </div>

        {showPoem && (
          <div className={styles.poemContainer}>
            <h4 className={styles.poemTitle}>{t('gallery.poem')}:</h4>
            <blockquote className={styles.poem}>
              "{getTranslatedText(painting.poem)}"
            </blockquote>
          </div>
        )}
      </div>
    </article>
  );
};

export default PaintingCard;