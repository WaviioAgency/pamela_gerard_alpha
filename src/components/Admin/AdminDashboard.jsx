import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import AdminOverview from './AdminOverview';
import ImageUpload from './ImageUpload';
import { createMultilingualText, getTranslatedText } from '../../utils/translator';
import styles from './AdminDashboard.module.css';

const AdminDashboard = ({ onClose }) => {
  const { t, language } = useLanguage();
  const { logout, categories, paintings, addCategory, updateCategory, deleteCategory, addPainting, updatePainting, deletePainting } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [categoryModalData, setCategoryModalData] = useState({ name: '', description: '' });
  const [paintingModalData, setPaintingModalData] = useState({
    title: '',
    description: '',
    dimensions: '',
    price: '',
    poem: { fr: '', en: '', hu: '' },
    categoryId: '',
    image: ''
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Painting form state
  const [paintingForm, setPaintingForm] = useState({
    title: '',
    description: '',
    dimensions: '',
    price: '',
    poem: { fr: '', en: '', hu: '' },
    categoryId: '',
    image: '',
    imageFile: null
  });

  const handleLogout = () => {
    logout();
    onClose();
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: ''
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
      image: '',
      imageFile: null
    });
    setIsEditing(false);
    setEditingItem(null);
  };

  const handlePaintingSubmit = async (e) => {
    e.preventDefault();

    const paintingData = {
      title: paintingForm.title,
      description: paintingForm.description,
      poem: paintingForm.poem,
      dimensions: paintingForm.dimensions,
      price: paintingForm.price,
      categoryId: paintingForm.categoryId,
      image: paintingForm.image,
      imageFile: paintingForm.imageFile
    };

    try {
      if (isEditing) {
        await updatePainting(editingItem.id, paintingData);
      } else {
        await addPainting(paintingData);
      }
      resetPaintingForm();
    } catch (error) {
      alert('Erreur lors de l\'enregistrement du tableau');
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    let categoryData;
    
    if (isEditing) {
      // When editing, preserve existing translations and update current language
      categoryData = {
        name: {
          ...editingItem.name,
          [language]: categoryForm.name
        },
        description: {
          ...editingItem.description,
          [language]: categoryForm.description
        }
      };
      updateCategory(editingItem.id, categoryData);
    } else {
      // When creating new category, auto-translate from French
      categoryData = {
        name: createMultilingualText(categoryForm.name),
        description: createMultilingualText(categoryForm.description)
      };
      addCategory(categoryData);
    }
    
    resetCategoryForm();
  };

  const handleCategoryModalSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      name: {
        ...editingItem.name,
        [language]: categoryModalData.name
      },
      description: {
        ...editingItem.description,
        [language]: categoryModalData.description
      }
    };
    updateCategory(editingItem.id, categoryData);
    setShowCategoryModal(false);
    setCategoryModalData({ name: '', description: '' });
    setEditingItem(null);
  };

  const handlePaintingModalSubmit = (e) => {
    e.preventDefault();
    
    const paintingData = {
      title: createMultilingualText(paintingModalData.title),
      description: createMultilingualText(paintingModalData.description),
      poem: paintingModalData.poem,
      dimensions: paintingModalData.dimensions,
      price: paintingModalData.price,
      categoryId: parseInt(paintingModalData.categoryId),
      image: paintingModalData.image
    };
    
    updatePainting(editingItem.id, paintingData);
    setShowPaintingModal(false);
    setPaintingModalData({
      title: '',
      description: '',
      dimensions: '',
      price: '',
      poem: '',
      categoryId: '',
      image: ''
    });
    setEditingItem(null);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setCategoryModalData({ name: '', description: '' });
    setEditingItem(null);
  };

  const closePaintingModal = () => {
    setShowPaintingModal(false);
    setPaintingModalData({
      title: '',
      description: '',
      dimensions: '',
      price: '',
      poem: '',
      categoryId: '',
      image: ''
    });
    setEditingItem(null);
  };

  const startEditCategory = (category) => {
    setCategoryModalData({
      name: getTranslatedText(category.name, language),
      description: getTranslatedText(category.description, language)
    });
    setEditingItem(category);
    setShowCategoryModal(true);
  };

  const startEditPainting = (painting) => {
    setPaintingModalData({
      title: getTranslatedText(painting.title, 'fr'),
      description: getTranslatedText(painting.description, 'fr'),
      poem: {
        fr: getTranslatedText(painting.poem, 'fr') || '',
        en: getTranslatedText(painting.poem, 'en') || '',
        hu: getTranslatedText(painting.poem, 'hu') || ''
      },
      dimensions: painting.dimensions || '',
      price: painting.price || '',
      categoryId: painting.categoryId,
      image: painting.image || '',
      imageFile: null
    });
    setEditingItem(painting);
    setShowPaintingModal(true);
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
        return (
          <AdminOverview 
            onNavigateToTab={setActiveTab}
            onAddCategory={() => resetCategoryForm()}
            onAddPainting={() => resetPaintingForm()}
          />
        );

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
                    <label className={styles.label}>Nom de la catégorie *</label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description de la catégorie *</label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm(prev => ({
                        ...prev,
                        description: e.target.value
                      }))}
                      className={styles.textarea}
                      rows="3"
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
                      <h5>{getTranslatedText(category.name, language)}</h5>
                      <p>{getTranslatedText(category.description, language)}</p>
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
                <div className={styles.multilingualRow}>
                  <div className={styles.formGroup}>
                    <h4 className={styles.languageHeader}>🇫🇷 Français</h4>
                    <label className={styles.label}>Titre *</label>
                    <input
                      type="text"
                      value={paintingForm.title?.fr || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        title: { ...prev.title, fr: e.target.value }
                      }))}
                      className={styles.input}
                      placeholder="ex: La Joconde"
                      required
                    />
                    <label className={styles.label}>Description *</label>
                    <textarea
                      value={paintingForm.description?.fr || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        description: { ...prev.description, fr: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="3"
                      placeholder="Description du tableau en français"
                      required
                    />
                    <label className={styles.label}>Poème</label>
                    <textarea
                      value={paintingForm.poem?.fr || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        poem: { ...prev.poem, fr: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="2"
                      placeholder="Saisissez le poème en français"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <h4 className={styles.languageHeader}>🇬🇧 English</h4>
                    <label className={styles.label}>Title *</label>
                    <input
                      type="text"
                      value={paintingForm.title?.en || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        title: { ...prev.title, en: e.target.value }
                      }))}
                      className={styles.input}
                      placeholder="ex: The Mona Lisa"
                      required
                    />
                    <label className={styles.label}>Description *</label>
                    <textarea
                      value={paintingForm.description?.en || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        description: { ...prev.description, en: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="3"
                      placeholder="Description of the painting in English"
                      required
                    />
                    <label className={styles.label}>Poem</label>
                    <textarea
                      value={paintingForm.poem?.en || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        poem: { ...prev.poem, en: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="2"
                      placeholder="Enter the poem in English"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <h4 className={styles.languageHeader}>🇭🇺 Magyar</h4>
                    <label className={styles.label}>Cím *</label>
                    <input
                      type="text"
                      value={paintingForm.title?.hu || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        title: { ...prev.title, hu: e.target.value }
                      }))}
                      className={styles.input}
                      placeholder="ex: Mona Lisa"
                      required
                    />
                    <label className={styles.label}>Leírás *</label>
                    <textarea
                      value={paintingForm.description?.hu || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        description: { ...prev.description, hu: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="3"
                      placeholder="A festmény leírása magyarul"
                      required
                    />
                    <label className={styles.label}>Vers</label>
                    <textarea
                      value={paintingForm.poem?.hu || ''}
                      onChange={(e) => setPaintingForm(prev => ({
                        ...prev,
                        poem: { ...prev.poem, hu: e.target.value }
                      }))}
                      className={styles.textarea}
                      rows="2"
                      placeholder="Írja be a verset magyarul"
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
                      placeholder="ex: 350"
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
                          {getTranslatedText(category.name, language)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Image du tableau *</label>
                  <ImageUpload
                    initialImage={paintingForm.image}
                    onImageSelect={(file) => setPaintingForm(prev => ({ ...prev, imageFile: file }))}
                  />
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
                          alt={getTranslatedText(painting.title, language)}
                          className={styles.paintingImage}
                        />
                        <div className={styles.itemContent}>
                          <h5>{getTranslatedText(painting.title, language)}</h5>
                          <p>{painting.dimensions} - {painting.price}</p>
                          <p><small>Catégorie: {category ? getTranslatedText(category.name, language) : 'Non trouvée'}</small></p>
                        </div>
                      </div>
                      <div className={styles.itemActions}>
                        <button
                          onClick={() => startEditPainting(painting)}
                          className={styles.editButton}
                          title="Modifier"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDeletePainting(painting.id)}
                          className={styles.deleteButton}
                          title="Supprimer"
                        >
                          ✕
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

        {/* Category Edit Modal */}
        {showCategoryModal && (
          <div className={styles.modalOverlay} onClick={closeCategoryModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Modifier la catégorie</h3>
                <button
                  className={styles.modalCloseButton}
                  onClick={closeCategoryModal}
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCategoryModalSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nom de la catégorie *</label>
                  <input
                    type="text"
                    value={categoryModalData.name}
                    onChange={(e) => setCategoryModalData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description *</label>
                  <textarea
                    value={categoryModalData.description}
                    onChange={(e) => setCategoryModalData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    className={styles.textarea}
                    rows="3"
                    required
                  />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" onClick={closeCategoryModal} className={styles.cancelButton}>
                    Annuler
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Painting Edit Modal */}
        {showPaintingModal && (
          <div className={styles.modalOverlay} onClick={closePaintingModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Modifier le tableau</h3>
                <button
                  className={styles.modalCloseButton}
                  onClick={closePaintingModal}
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handlePaintingModalSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Titre du tableau (en français) *</label>
                  <input
                    type="text"
                    value={paintingModalData.title}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      title: e.target.value
                    }))}
                    className={styles.input}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description (en français) *</label>
                  <textarea
                    value={paintingModalData.description}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    className={styles.textarea}
                    rows="3"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Dimensions *</label>
                  <input
                    type="text"
                    value={paintingModalData.dimensions}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      dimensions: e.target.value
                    }))}
                    className={styles.input}
                    placeholder="ex: 50x70 cm"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Prix *</label>
                  <input
                    type="text"
                    value={paintingModalData.price}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      price: e.target.value
                    }))}
                    className={styles.input}
                    placeholder="ex: 350€"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Catégorie *</label>
                  <select
                    value={paintingModalData.categoryId}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      categoryId: e.target.value
                    }))}
                    className={styles.select}
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {getTranslatedText(category.name, language)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>URL de l'image *</label>
                  <input
                    type="url"
                    value={paintingModalData.image}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      image: e.target.value
                    }))}
                    className={styles.input}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Poème (en français)</label>
                  <textarea
                    value={paintingModalData.poem?.fr || ''}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      poem: { ...prev.poem, fr: e.target.value }
                    }))}
                    className={styles.textarea}
                    rows="2"
                    placeholder="Saisissez le poème en français"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Poème (en anglais)</label>
                  <textarea
                    value={paintingModalData.poem?.en || ''}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      poem: { ...prev.poem, en: e.target.value }
                    }))}
                    className={styles.textarea}
                    rows="2"
                    placeholder="Enter the poem in English"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Poème (en hongrois)</label>
                  <textarea
                    value={paintingModalData.poem?.hu || ''}
                    onChange={(e) => setPaintingModalData(prev => ({
                      ...prev,
                      poem: { ...prev.poem, hu: e.target.value }
                    }))}
                    className={styles.textarea}
                    rows="2"
                    placeholder="Írja be a verset magyarul"
                  />
                </div>
                
                <div className={styles.modalActions}>
                  <button type="button" onClick={closePaintingModal} className={styles.cancelButton}>
                    Annuler
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;