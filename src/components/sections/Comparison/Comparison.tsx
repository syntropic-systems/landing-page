import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../../../hooks/useContent';
import type { ComparisonContent } from '../../../types/content';
import styles from './Comparison.module.css';

export const Comparison: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const content = useContent<ComparisonContent>('comparison.json');

  if (!content) {
    return <section className={styles.comparison}>Loading...</section>;
  }

  return (
    <section className={styles.comparison} ref={ref}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {content.title}
        </motion.h2>

        <div className={styles.comparisonGrid}>
          {/* Without Us Column */}
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>{content.withoutUs.heading}</h3>
            </div>
            <div className={styles.itemsList}>
              {content.withoutUs.items.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <span className={styles.iconCross}>✕</span>
                  <span className={styles.itemText}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* With Us Column */}
          <motion.div
            className={`${styles.column} ${styles.highlighted}`}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.columnHeader}>
              <span className={styles.badge}>🚀</span>
              <h3 className={styles.columnTitle}>{content.withUs.heading}</h3>
            </div>
            <div className={styles.itemsList}>
              {content.withUs.items.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <span className={styles.iconCheck}>✓</span>
                  <span className={styles.itemText}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 