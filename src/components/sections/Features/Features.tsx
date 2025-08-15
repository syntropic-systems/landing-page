import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../../../hooks/useContent';
import type { FeaturesContent } from '../../../types/content';
import styles from './Features.module.css';

export const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const content = useContent<FeaturesContent>('features.json');

  if (!content) {
    return <section className={styles.features}>Loading...</section>;
  }

  return (
    <section className={styles.features} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>
            {content.sectionHeader.title}
          </h2>
          <p className={styles.sectionSubtitle}>
            {content.sectionHeader.subtitle}
          </p>
        </motion.div>

        {/* YouTube Video Demo */}
        <motion.div
          className={styles.videoContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.videoWrapper}>
            <iframe
              src={content.videoDemo.src}
              title={content.videoDemo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          </div>
        </motion.div>

        {/* Usage Graph and Benefits */}
        <div className={styles.benefitsSection}>
          <div className={styles.benefitsGrid}>
            <motion.div
              className={styles.benefitItem}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className={styles.benefitTitle}>{content.benefits.left.title}</h3>
              <p className={styles.benefitDescription}>
                {content.benefits.left.description}
              </p>
            </motion.div>

            <motion.div
              className={styles.overviewContainer}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Dynamic labels from content */}
              {content.overviewImage.labels.map((label, index) => (
                <div key={index} className={styles.overviewText} style={{ position: 'absolute', ...label.position }}>
                  <span className={styles.textLabel}>{label.text}</span>
                </div>
              ))}
              
              {/* Center Image */}
              <img 
                src={content.overviewImage.src}
                alt={content.overviewImage.alt}
                className={styles.overviewImage}
              />
            </motion.div>

            <motion.div
              className={styles.benefitItem}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className={styles.benefitTitle}>{content.benefits.right.title}</h3>
              <p className={styles.benefitDescription}>
                {content.benefits.right.description}
              </p>
            </motion.div>
          </div>

          <div className={styles.additionalBenefits}>
            {content.additionalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className={styles.smallBenefit}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <h4 className={styles.smallBenefitTitle}>{benefit.title}</h4>
                <p className={styles.smallBenefitDescription}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};