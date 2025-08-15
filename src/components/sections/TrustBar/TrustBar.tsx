import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../../../hooks/useContent';
import type { TrustBarContent } from '../../../types/content';
import styles from './TrustBar.module.css';

export const TrustBar: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const content = useContent<TrustBarContent>('trustbar.json');

  if (!content) {
    return <section className={styles.trustBar}>Loading...</section>;
  }

  return (
    <section className={styles.trustBar} ref={ref}>
      <div className={styles.container}>
        <motion.p
          className={styles.trustText}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {content.trustText.text} <span className={styles.highlight}>{content.trustText.highlight}</span>{content.trustText.suffix}
        </motion.p>
        
        <motion.div
          className={styles.logoGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.clients.map((client, index) => (
            <motion.div
              key={client}
              className={styles.logoItem}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              {client}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};