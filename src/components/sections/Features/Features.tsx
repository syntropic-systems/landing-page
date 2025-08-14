import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '../../common/Card';
import styles from './Features.module.css';

export const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: '🎯',
      title: 'Smart Detection',
      description:
        'AI-powered anomaly detection identifies issues before they impact performance, reducing downtime by up to 90%.',
    },
    {
      icon: '📈',
      title: 'Predictive Analytics',
      description:
        'Forecast resource usage and costs with machine learning models trained on your infrastructure patterns.',
    },
    {
      icon: '🔧',
      title: 'Auto-Optimization',
      description:
        'Automatically right-size resources and optimize configurations based on actual usage patterns.',
    },
    {
      icon: '🛡️',
      title: 'Security First',
      description:
        'Continuous compliance monitoring and automated security remediation across all cloud providers.',
    },
  ];

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
            Everything you need to manage cloud at scale
          </h2>
          <p className={styles.sectionSubtitle}>
            See how Cloud Glance transforms cloud infrastructure management
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
              src="https://www.youtube.com/embed/UYmvFzDuO5k?si=-nvI-kXmBZIoL4ZW"
              title="Cloud Glance Demo"
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
              <h3 className={styles.benefitTitle}>90% Faster Detection</h3>
              <p className={styles.benefitDescription}>
                AI-powered anomaly detection identifies issues before they impact performance
              </p>
            </motion.div>

            <motion.div
              className={styles.overviewContainer}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Top texts */}
              <div className={styles.overviewText} style={{ position: 'absolute', top: '10%', left: '10%' }}>
                <span className={styles.textLabel}>Real-time Alerts</span>
              </div>
              <div className={styles.overviewText} style={{ position: 'absolute', top: '10%', right: '10%' }}>
                <span className={styles.textLabel}>99.9% Uptime</span>
              </div>
              
              {/* Side texts */}
              <div className={styles.overviewText} style={{ position: 'absolute', left: '5%', top: '35%' }}>
                <span className={styles.textLabel}>Multi-Cloud</span>
              </div>
              <div className={styles.overviewText} style={{ position: 'absolute', right: '5%', top: '35%' }}>
                <span className={styles.textLabel}>Auto-Scale</span>
              </div>
              
              {/* Center Image */}
              <img 
                src="/src/assets/overview/Gemini_Generated_Image_npdszunpdszunpds.png"
                alt="Cloud infrastructure overview"
                className={styles.overviewImage}
              />
              
              {/* Side texts */}
              <div className={styles.overviewText} style={{ position: 'absolute', left: '5%', bottom: '35%' }}>
                <span className={styles.textLabel}>Cost Optimization</span>
              </div>
              <div className={styles.overviewText} style={{ position: 'absolute', right: '5%', bottom: '35%' }}>
                <span className={styles.textLabel}>Security First</span>
              </div>
              
              {/* Bottom texts */}
              <div className={styles.overviewText} style={{ position: 'absolute', bottom: '10%', left: '10%' }}>
                <span className={styles.textLabel}>AI-Powered</span>
              </div>
              <div className={styles.overviewText} style={{ position: 'absolute', bottom: '10%', right: '10%' }}>
                <span className={styles.textLabel}>24/7 Support</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.benefitItem}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className={styles.benefitTitle}>60% Cost Reduction</h3>
              <p className={styles.benefitDescription}>
                Automated optimization and right-sizing reduces cloud costs significantly
              </p>
            </motion.div>
          </div>

          <div className={styles.additionalBenefits}>
            {[
              { title: "Multi-Cloud Support", description: "AWS, Azure, GCP in one platform" },
              { title: "Real-Time Monitoring", description: "24/7 automated infrastructure tracking" },
              { title: "Predictive Analytics", description: "Forecast issues before they occur" },
              { title: "Enterprise Security", description: "SOC2 compliant with advanced encryption" }
            ].map((benefit, index) => (
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