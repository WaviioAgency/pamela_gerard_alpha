import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import AdminOverview from './AdminOverview';
import styles from './AdminDashboard.module.css';

const AdminDashboard = ({ onClose }) => {
  const { t, language } = useLanguage();
  const { logout, categories, paintings, addCategory, updateCategory, deleteCategory, addPainting, updatePainting, deletePainting } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: { fr: '', en: '', hu: '' }
  });

  // Painting form state
  const [paintingForm, setPaintingForm] = useState({
    title: { fr: '', en: '', hu: '' },
    description: { fr: '', en: '', hu: '' },
    dimensions: '',
    price: '',
    poem: { fr: '', en: '', hu: '' },
    categoryId: '',
    image: ''
  });

  const handleLogout = () => {
    logout();
    onClose();
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: { fr: '', en: '', hu: '' }
    });
    setIsEditing(false);
    setEditingItem(null);
  };

  const resetPaintingForm = () => {
    setPaintingForm({
      title: { fr: '', en: '', hu: '' },
      description: { fr: '', en: '', hu: '' },
      dimensions: '',
      price: '',
      poem: { fr: '', en: '', hu: '' },
      categoryId: '',
      image: ''
    });
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateCategory(editingItem.id, categoryForm);
    } else {
      addCategory(categoryForm);
    }
    resetCategoryForm();
  };

  const handlePaintingSubmit = (e) => {
    e.preventDefault();
    const paintingData = {
      ...paintingForm,
      categoryId: parseInt(paintingForm.categoryId)
    };
    
    if (isEditing) {
      updatePainting(editingItem.id, paintingData);
    } else {
      addPainting(paintingData);
    }
    resetPaintingForm();
  };

  const startEditCategory = (category) => {
    setCategoryForm(category);
    setIsEditing(true);
    setEditingItem(category);
  };

  const startEditPainting = (painting) => {
    setPaintingForm({
      ...painting,
      categoryId: painting.categoryId.toString()
    });
    setIsEditing(true);
    setEditingItem(painting);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Tous les tableaux associés seront également supprimés.')) {
      deleteCategory(categoryId);
    }
  };

  const handleDeletePainting = (paintingId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce tableau ?')) {
      deletePainting(paintingId);
    }
  };

  const tabs = [
    { id: 'overview', label: t('admin.dashboard.overview'), icon: '📊' },
    { id: 'categories', label: t('admin.dashboard.categories'), icon: '📁' },
    { id: 'paintings', label: t('admin.dashboard.paintings'), icon: '🎨' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;

      case 'categories':
        return (
          <div className={styles.tabContent}>
            <div className={styles.contentHeader}>
              <h3>Gestion des Catégories</h3>
              <button
                className={styles.addButton}
                onClick={resetCategoryForm}
              >
                + Nouvelle Catégorie
              </button>
            </div>

            <div className={styles.formSection}>
              <form onSubmit={handleCategorySubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nom (Français) *</label>
                    <input
                      type="text"
                      value={categoryForm.name.fr}
                      onChange={(e) => setCategoryForm(prev => ({
                        ...prev,
                        name: { ...prev.name, fr: e.target.value }
                      }))}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nom (English) *</label>
                    <input
                      type="text"
                      value={categoryForm.name.en}
                      onChange={(e) => setCategoryForm(prev => ({
                        ...prev,
                        name: { ...prev.name, en: e.target.value }
                      }))}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nom (Magyar) *</label>
                    <input
                      type="text"
                      value={categoryForm.name.hu}
                      onChange={(e) => setCategoryForm(prev => ({
                        ...prev,
                        name: { ...prev.name, hu: e.target.value }
                      }))}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formActions}>
                  {isEditing && (
                    <button type="button" onClick={resetCategoryForm} className={styles.cancelButton}>
                      Annuler
                    </button>
                  )}
                  <button type="submit" className={styles.submitButton}>
                    {isEditing ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.listSection}>
              <h4>Catégories existantes ({categories.length})</h4>
              <div className={styles.itemsList}>
                {categories.map(category => (
                  <div key={category.id} className={styles.item}>
                    <div className={styles.itemContent}>
                      <h5>{category.name[language] || category.name.fr}</h5>
                      <p>FR: {category.name.fr} | EN: {category.name.en} | HU: {category.name.hu}</p>
                    </div>
                    <div className={styles.itemActions}>
                      <button
                        onClick={() => startEditCategory(category)}
                        className={styles.editButton}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className={styles.deleteButton}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'paintings':
        return (
          <div className={styles.tabContent}>
            <div className={styles.contentHeader}>
              <h3>Gestion des Tableaux</h3>
              <button
                className={styles.addButton}
                onClick={resetPaintingForm}
              >
                + Nouveau Tableau
              </button>
            </div>

            <div className={styles.formSection}>
              <form onSubmit={handlePaintingSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Titre (Français) *</label>
                    <input
                      type="text"
                      value={paintingForm.title.fr}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        title: { ...prev.title, fr: e.target.value }
                      }))}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Titre (English) *</label>
                    <input
                      type="text"
                      value={paintingForm.title.en}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        title: { ...prev.title, en: e.target.value }
                      }))}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Titre (Magyar) *</label>
                    <input
                      type="text"
                      value={paintingForm.title.hu}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        title: { ...prev.title, hu: e.target.value }
                      }))}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description (Français) *</label>
                    <textarea
                      value={paintingForm.description.fr}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        description: { ...prev.description, fr: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="3"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description (English) *</label>
                    <textarea
                      value={paintingForm.description.en}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        description: { ...prev.description, en: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="3"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description (Magyar) *</label>
                    <textarea
                      value={paintingForm.description.hu}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        description: { ...prev.description, hu: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="3"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Dimensions *</label>
                    <input
                      type="text"
                      value={paintingForm.dimensions}
                      onChange={(e) => setPaintingForm(prev => ({ ...prev, dimensions: e.target.value }))}
                      className={styles.input}
                      placeholder="ex: 50x70 cm"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Prix *</label>
                    <input
                      type="text"
                      value={paintingForm.price}
                      onChange={(e) => setPaintingForm(prev => ({ ...prev, price: e.target.value }))}
                      className={styles.input}
                      placeholder="ex: 350€"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Catégorie *</label>
                    <select
                      value={paintingForm.categoryId}
                      onChange={(e) => setPaintingForm(prev => ({ ...prev, categoryId: e.target.value }))}
                      className={styles.select}
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name[language] || category.name.fr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>URL de l'image *</label>
                  <input
                    type="url"
                    value={paintingForm.image}
                    onChange={(e) => setPaintingForm(prev => ({ ...prev, image: e.target.value }))}
                    className={styles.input}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Poème (Français)</label>
                    <textarea
                      value={paintingForm.poem.fr}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        poem: { ...prev.poem, fr: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="2"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Poème (English)</label>
                    <textarea
                      value={paintingForm.poem.en}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        poem: { ...prev.poem, en: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="2"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Poème (Magyar)</label>
                    <textarea
                      value={paintingForm.poem.hu}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        poem: { ...prev.poem, hu: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="2"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  {isEditing && (
                    <button type="button" onClick={resetPaintingForm} className={styles.cancelButton}>
                      Annuler
                    </button>
                  )}
                  <button type="submit" className={styles.submitButton}>
                    {isEditing ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.listSection}>
              <h4>Tableaux existants ({paintings.length})</h4>
              <div className={styles.itemsList}>
                {paintings.map(painting => {
                  const category = categories.find(cat => cat.id === painting.categoryId);
                  return (
                    <div key={painting.id} className={styles.item}>
                      <div className={styles.paintingItem}>
                        <img
                          src={painting.image}
                          alt={painting.title[language] || painting.title.fr}
                          className={styles.paintingImage}
                        />
                        <div className={styles.itemContent}>
                          <h5>{painting.title[language] || painting.title.fr}</h5>
                          <p>{painting.dimensions} - {painting.price}</p>
                          <p><small>Catégorie: {category?.name[language] || category?.name.fr || 'Non trouvée'}</small></p>
                        </div>
                      </div>
                      <div className={styles.itemActions}>
                        <button
                          onClick={() => startEditPainting(painting)}
                          className={styles.editButton}
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeletePainting(painting.id)}
                          className={styles.deleteButton}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dashboard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Admin Dashboard</h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              title="Fermer"
            >
              ✕
            </button>
          </div>

          <nav className={styles.nav}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.navButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.navIcon}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              🚪 {t('admin.dashboard.logout')}
            </button>
          </div>
        </div>

        <div className={styles.main}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;