import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import styles from './AdminOverview.module.css';

const AdminOverview = () => {
  const { t } = useLanguage();
  const { categories, paintings } = useAdmin();

  const stats = [
    {
      label: 'Total Catégories',
      value: categories.length,
      icon: '📁',
      color: '#87ceeb'
    },
    {
      label: 'Total Tableaux',
      value: paintings.length,
      icon: '🎨',
      color: '#2c5aa0'
    },
    {
      label: 'Catégorie la plus utilisée',
      value: getMostUsedCategory(),
      icon: '🏆',
      color: '#ff9500'
    }
  ];

  function getMostUsedCategory() {
    if (paintings.length === 0 || categories.length === 0) return 'Aucune';
    
    const categoryCount = paintings.reduce((acc, painting) => {
      acc[painting.categoryId] = (acc[painting.categoryId] || 0) + 1;
      return acc;
    }, {});

    const mostUsedCategoryId = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    );

    const category = categories.find(cat => cat.id === parseInt(mostUsedCategoryId));
    return category ? category.name.fr : 'Aucune';
  }

  return (
    <div className={styles.overview}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Tableau de bord</h2>
        <p className={styles.welcomeText}>
          Gérez facilement vos catégories et tableaux depuis cette interface d'administration.
        </p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.quickActions}>
        <h3 className={styles.quickActionsTitle}>Actions rapides</h3>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>
            <span className={styles.actionIcon}>➕</span>
            Ajouter un tableau
          </button>
          <button className={styles.actionButton}>
            <span className={styles.actionIcon}>📁</span>
            Créer une catégorie
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;