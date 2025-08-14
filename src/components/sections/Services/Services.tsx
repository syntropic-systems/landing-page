import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import styles from './Services.module.css';

export const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Import scroll animation images
  const scrollImages = [
    '/src/assets/scroll-animation/Gemini_Generated_Image_kwvrw7kwvrw7kwvr.png',
    '/src/assets/scroll-animation/Gemini_Generated_Image_kwvrw7kwvrw7kwvr-2.png', 
    '/src/assets/scroll-animation/Gemini_Generated_Image_kwvrw7kwvrw7kwvr-3.png',
    '/src/assets/scroll-animation/Gemini_Generated_Image_kwvrw7kwvrw7kwvr-4.png',
    '/src/assets/scroll-animation/Gemini_Generated_Image_kwvrw7kwvrw7kwvr-5.png'
  ];

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

  // Calculate which image to show based on scroll progress
  const currentImageIndex = Math.min(
    scrollImages.length - 1, 
    Math.floor(scrollProgress * scrollImages.length)
  );

  const services = [
    {
      title: 'Cloud Monitoring',
      description: 'Real-time insights into cloud infrastructure performance, costs, and security across all major cloud providers.',
      features: ['Multi-cloud visibility', '24/7 automated monitoring', 'Cost optimization alerts']
    },
    {
      title: 'Predictive Analytics', 
      description: 'AI-powered forecasting and anomaly detection to prevent issues before they impact your business operations.',
      features: ['ML-based predictions', 'Anomaly detection', 'Capacity planning']
    },
    {
      title: 'Automated Optimization',
      description: 'Intelligent resource scaling and configuration optimization based on actual usage patterns and business needs.',
      features: ['Auto-scaling', 'Resource right-sizing', 'Configuration tuning']
    }
  ];

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
            Full-Stack Cloud Solutions
          </h2>
          <p className={styles.sectionSubtitle}>
            Complete cloud intelligence platform delivering monitoring, analytics, and optimization.
          </p>
          <Button variant="primary" size="medium">
            Get Started
          </Button>
        </motion.div>

        <div className={styles.servicesLayout}>
          {/* Left Half - Service Content */}
          <div className={styles.servicesContent}>
            {services.map((service, index) => (
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
                src={scrollImages[currentImageIndex]}
                alt={`Cloud monitoring visualization ${currentImageIndex + 1}`}
                className={styles.scrollImage}
              />
              
              {/* Optional progress indicator */}
              <div className={styles.imageProgress}>
                {scrollImages.map((_, index) => (
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