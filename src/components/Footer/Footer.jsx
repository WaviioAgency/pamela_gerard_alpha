import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import AdminLogin from '../Admin/AdminLogin';
import AdminDashboard from '../Admin/AdminDashboard';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setShowAdminDashboard(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.leftSection}>
              <div className={styles.logo}>
                <h3>Pamela GERARD</h3>
                <p>Artiste Peintre</p>
              </div>
            </div>

            <div className={styles.centerSection}>
              <p className={styles.copyright}>
                {t('footer.copyright').replace('2024', currentYear.toString())}
              </p>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.phoneSection}>
                <p className={styles.phoneLabel}>{t('footer.phone')}:</p>
                <a href="tel:+33761063736" className={styles.phoneLink}>
                  +33 7 61 06 37 36
                </a>
              </div>
              <button
                className={styles.adminButton}
                onClick={handleAdminClick}
                aria-label={isAuthenticated ? "Ouvrir le dashboard admin" : "Se connecter en tant qu'admin"}
              >
                {isAuthenticated ? '⚙️' : '🔐'} {t('footer.adminLogin')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Modals */}
      {showAdminLogin && (
        <AdminLogin
          onClose={() => setShowAdminLogin(false)}
          onSuccess={handleAdminLoginSuccess}
        />
      )}

      {showAdminDashboard && (
        <AdminDashboard
          onClose={() => setShowAdminDashboard(false)}
        />
      )}
    </>
  );
};

export default Footer;