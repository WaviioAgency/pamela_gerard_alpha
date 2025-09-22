import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import styles from './AdminLogin.module.css';

const AdminLogin = ({ onClose, onSuccess }) => {
  const { t } = useLanguage();
  const { login } = useAdmin();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    setTimeout(() => {
      if (login(formData.username, formData.password)) {
        setIsLoading(false);
        onSuccess();
      } else {
        setError(t('admin.login.error'));
        setIsLoading(false);
      }
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose} onKeyDown={handleKeyDown}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('admin.login.title')}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fermer la modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              {t('admin.login.username')}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="admin"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              {t('admin.login.password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="admin123"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className={styles.error}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              {t('admin.login.close')}
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.loader}></span>
                  Connexion...
                </>
              ) : (
                t('admin.login.loginButton')
              )}
            </button>
          </div>
        </form>

        <div className={styles.hint}>
          <p className={styles.hintText}>
            <strong>Demo:</strong> admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;