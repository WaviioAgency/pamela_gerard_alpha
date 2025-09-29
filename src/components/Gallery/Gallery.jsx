import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import { getTranslatedText } from '../../utils/translator';
import PaintingCard from './PaintingCard';
import styles from './Gallery.module.css';

const Gallery = () => {
  const { t, language } = useLanguage();
  const { categories, paintings } = useAdmin();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = useMemo(() => {
    const allFilter = { id: 'all', name: t('gallery.allPaintings') };
    return [allFilter, ...categories];
  }, [categories, t, language]);

  const filteredPaintings = useMemo(() => {
    if (activeFilter === 'all') {
      return paintings;
    }
    return paintings.filter(painting => painting.categoryId === activeFilter);
  }, [paintings, activeFilter]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('gallery.title')}</h2>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filters}>
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => handleFilterChange(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.id === 'all' ? filter.name : getTranslatedText(filter.name, language)}
            </button>
          ))}
        </div>

        {/* Paintings Grid */}
        <div className={styles.grid}>
          {filteredPaintings.length > 0 ? (
            filteredPaintings.map(painting => (
              <PaintingCard key={painting.id} painting={painting} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎨</div>
              <p className={styles.emptyText}>
                Aucune œuvre dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>

        {filteredPaintings.length > 0 && (
          <div className={styles.stats}>
            <p className={styles.statsText}>
              {filteredPaintings.length} œuvre{filteredPaintings.length > 1 ? 's' : ''} 
              {activeFilter !== 'all' && ' dans cette catégorie'}
            </p>
          </div>
        )}
        {activeFilter !== 'all' && (
          <div className={styles.categoryDescription}>
            <p className={styles.categoryDescriptionText}>
              {getTranslatedText(
                categories.find(cat => cat.id === activeFilter)?.description,
                language
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;