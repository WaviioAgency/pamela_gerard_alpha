import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import PaintingCard from './PaintingCard';
import styles from './Gallery.module.css';

const Gallery = () => {
  const { t } = useLanguage();
  const { categories, paintings } = useAdmin();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = useMemo(() => {
    const allFilter = { id: 'all', name: { fr: t('gallery.allPaintings'), en: t('gallery.allPaintings'), hu: t('gallery.allPaintings') } };
    return [allFilter, ...categories];
  }, [categories, t]);

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
              {filter.name[t.language] || filter.name.fr || filter.name}
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
      </div>
    </section>
  );
};

export default Gallery;