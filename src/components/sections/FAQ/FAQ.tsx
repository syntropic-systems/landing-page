import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '../../common/Button';
import { useContent } from '../../../hooks/useContent';
import type { FAQContent } from '../../../types/content';
import styles from './FAQ.module.css';

export const FAQ: React.FC = () => {
  const content = useContent<FAQContent>('faq.json');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!content) {
    return <section className={styles.faq}>Loading...</section>;
  }

  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section className={styles.faq} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{content.sectionHeader.title}</h2>
          <p className={styles.subtitle}>{content.sectionHeader.subtitle}</p>
        </motion.div>

        <motion.div
          className={styles.faqList}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className={`${styles.faqItem} ${expandedItem === faq.id ? styles.expanded : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleItem(faq.id)}
                aria-expanded={expandedItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <motion.span
                  className={styles.icon}
                  animate={{ rotate: expandedItem === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence>
                {expandedItem === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    className={styles.faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={styles.answerContent}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.contactSupport}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={styles.supportTitle}>{content.contactSupport.title}</h3>
          <p className={styles.supportSubtitle}>{content.contactSupport.subtitle}</p>
          <Button 
            variant="outline" 
            size="medium"
            href={content.contactSupport.ctaHref}
          >
            {content.contactSupport.ctaText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};