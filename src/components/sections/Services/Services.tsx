import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '../../common/Button';
import { useContent } from '../../../hooks/useContent';
import type { ServicesContent } from '../../../types/content';
import styles from './Services.module.css';

export const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const content = useContent<ServicesContent>('services.json');

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on section visibility
      const scrollY = -rect.top;
      const progress = Math.max(0, Math.min(1, scrollY / (sectionHeight - windowHeight + 200)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) {
    return <section className={styles.services}>Loading...</section>;
  }

  // Calculate which image to show based on scroll progress
  const currentImageIndex = Math.min(
    content.scrollImages.length - 1, 
    Math.floor(scrollProgress * content.scrollImages.length)
  );

  return (
    <section className={styles.services} ref={(el) => { sectionRef.current = el; ref(el); }}>
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
          <Button variant={content.sectionHeader.button.variant as any} size={content.sectionHeader.button.size as any}>
            {content.sectionHeader.button.label}
          </Button>
        </motion.div>

        <div className={styles.servicesLayout}>
          {/* Left Half - Service Content */}
          <div className={styles.servicesContent}>
            {content.services.map((service, index) => (
              <motion.div
                key={service.title}
                className={styles.serviceRow}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className={styles.serviceInfo}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <ul className={styles.featureList}>
                    {service.features.map((feature, i) => (
                      <li key={i} className={styles.feature}>
                        <span className={styles.checkmark}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Half - Scroll-Triggered Animation */}
          <motion.div
            className={styles.animationContainer}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.scrollAnimation}>
              <img 
                src={content.scrollImages[currentImageIndex]}
                alt={`Cloud monitoring visualization ${currentImageIndex + 1}`}
                className={styles.scrollImage}
              />
              
              {/* Optional progress indicator */}
              <div className={styles.imageProgress}>
                {content.scrollImages.map((_, index) => (
                  <div 
                    key={index}
                    className={`${styles.progressDot} ${index === currentImageIndex ? styles.active : ''}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};