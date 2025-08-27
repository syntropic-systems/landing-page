import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../../../hooks/useContent';
import type { ComparisonContent } from '../../../types/content';
import styles from './Comparison.module.css';

// Icon mapping
const iconMap: { [key: string]: string } = {
  'clock': '⏱️',
  'trending-up': '📈',
  'file-search': '📄',
  'target': '🎯',
  'users': '👥',
  'shield-alert': '🛡️',
  'database': '💾',
  'git-branch': '🔀',
  'x-circle': '✕',
  'check-circle': '✓'
};

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
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            {content.sectionHeader.title}
          </h2>
          <p className={styles.subtitle}>{content.sectionHeader.subtitle}</p>
        </motion.div>

        <div className={styles.comparisonWrapper}>
          <motion.div
            className={styles.comparisonCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Headers */}
            <div className={styles.comparisonHeaders}>
              <div className={styles.processHeader}>
                <h3>Process</h3>
              </div>
              <div className={styles.withoutHeader}>
                <h3>{content.visualStyle.withoutSide.label}</h3>
              </div>
              <div className={styles.withHeader}>
                <span className={styles.bolt}>⚡</span>
                <h3>{content.visualStyle.withSide.label}</h3>
              </div>
            </div>

            {/* Comparison Items */}
            <div className={styles.comparisonItems}>
              {content.comparisons.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={styles.comparisonRow}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + (index * content.presentation.staggerDelay / 1000) 
                  }}
                >
                  {/* Process Column with Improvement Badge */}
                  <div className={styles.processCell}>
                    <div className={styles.processCellContent}>
                      <span className={styles.processIcon}>{iconMap[item.icon] || '📌'}</span>
                      <div className={styles.processTextWrapper}>
                        <span className={styles.processLabel}>{item.category}</span>
                        <div className={styles.improvementBadge}>{item.withUs.improvement}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Without Column */}
                  <div className={styles.withoutCell}>
                    <span className={styles.iconCross}>{iconMap[content.visualStyle.withoutSide.icon]}</span>
                    <div className={styles.cellContent}>
                      <span className={styles.cellValue}>{item.without.value}</span>
                      <span className={styles.cellDescription}>{item.without.description}</span>
                    </div>
                  </div>
                  
                  {/* With Column */}
                  <div className={styles.withCell}>
                    <span className={styles.iconCheck}>{iconMap[content.visualStyle.withSide.icon]}</span>
                    <div className={styles.cellContent}>
                      <span className={styles.cellValue}>{item.withUs.value}</span>
                      <span className={styles.cellDescription}>{item.withUs.description}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 