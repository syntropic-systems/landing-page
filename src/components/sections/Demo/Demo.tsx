import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Demo.module.css';

export const Demo: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const demoImages = [
    {
      src: '/src/assets/demo/Gemini_Generated_Image_29z3xp29z3xp29z3.png',
      title: 'Real-time Dashboard',
      description: 'Monitor your entire cloud infrastructure from a single, intuitive dashboard'
    },
    {
      src: '/src/assets/demo/Gemini_Generated_Image_d2s6dud2s6dud2s6.png', 
      title: 'Advanced Analytics',
      description: 'Get deep insights with AI-powered analytics and predictive monitoring'
    }
  ];

  return (
    <section className={styles.demo} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>
            See Cloud Glance in Action
          </h2>
          <p className={styles.sectionSubtitle}>
            Experience the power of intelligent cloud monitoring
          </p>
        </motion.div>

        <div className={styles.demoGrid}>
          {demoImages.map((demo, index) => (
            <motion.div
              key={demo.title}
              className={styles.demoCard}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={demo.src}
                  alt={demo.title}
                  className={styles.demoImage}
                />
              </div>
              <div className={styles.demoContent}>
                <h3 className={styles.demoTitle}>{demo.title}</h3>
                <p className={styles.demoDescription}>{demo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};