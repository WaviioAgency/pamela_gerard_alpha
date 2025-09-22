import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './FAQ.module.css';

const FAQ = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: t('faq.question1'),
      answer: t('faq.answer1')
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFaq(id);
    }
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('faq.title')}</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map(faq => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(faq.id)}
                onKeyDown={(e) => handleKeyDown(e, faq.id)}
                aria-expanded={openFaq === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={`${styles.faqIcon} ${openFaq === faq.id ? styles.faqIconOpen : ''}`}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              
              <div
                id={`faq-answer-${faq.id}`}
                className={`${styles.faqAnswer} ${openFaq === faq.id ? styles.faqAnswerOpen : ''}`}
                aria-hidden={openFaq !== faq.id}
              >
                <div className={styles.answerContent}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;