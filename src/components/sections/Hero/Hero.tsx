import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../common/Button';
import { useContent } from '../../../hooks/useContent';
import type { HeroContent } from '../../../types/content';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const content = useContent<HeroContent>('hero.json');

  if (!content) {
    return <section className={styles.hero}>Loading...</section>;
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.heroTitle}>
            <span className={styles.gradientText}>{content.title.gradientText}</span>
            <br />
            <span className={styles.grayText}>{content.title.grayText}</span>
          </h1>

          <p className={styles.heroSubtitle}>
            {content.subtitle}
          </p>

          <div className={styles.heroActions}>
            {content.buttons.map((button, index) => (
              <Button 
                key={index} 
                variant={button.variant as any} 
                size={button.size as any}
                href={button.href}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.animatedBackground}>
            {/* Floating geometric shapes */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.floatingShape}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-30, 30, -30],
                  x: [-15, 15, -15],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};