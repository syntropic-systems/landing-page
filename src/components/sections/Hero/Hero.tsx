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
        <div className={styles.heroWrapper}>
          {/* Left side - Content */}
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>
              <span className={styles.gradientText}>{content.title.gradientText}</span>
              <br />
              <span className={styles.normalText}>{content.title.grayText}</span>
            </h1>

            <p className={styles.heroSubtitle}>
              {content.subtitle}
            </p>

            <div className={styles.heroActions}>
              {content.buttons.map((button, index) => (
                <Button 
                  key={index} 
                  variant={button.variant as 'primary' | 'secondary' | 'outline' | 'ghost'} 
                  size={button.size as 'small' | 'medium' | 'large'}
                  href={button.href}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Right side - Video placeholder */}
          <motion.div
            className={styles.heroVideo}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.videoContainer}>
              <div className={styles.videoPlaceholder}>
                <div className={styles.playButton}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)"/>
                    <path d="M24 20L40 30L24 40V20Z" fill="#000"/>
                  </svg>
                </div>
                <div className={styles.videoText}>Demo Video</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Animation */}
        <div className={styles.animatedBackground}>
          {[...Array(8)].map((_, i) => (
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
      </div>
    </section>
  );
};