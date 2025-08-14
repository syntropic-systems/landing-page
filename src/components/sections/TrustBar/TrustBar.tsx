import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './TrustBar.module.css';

export const TrustBar: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const clients = [
    'Meta',
    'Microsoft',
    'OpenAI',
    'Adept',
    'General Motors',
    'Toyota',
    'Flexport',
    'Samsung'
  ];

  return (
    <section className={styles.trustBar} ref={ref}>
      <div className={styles.container}>
        <motion.p
          className={styles.trustText}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Scale works with <span className={styles.highlight}>Generative AI Companies</span>, U.S. Government Agencies & Enterprises
        </motion.p>
        
        <motion.div
          className={styles.logoGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {clients.map((client, index) => (
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