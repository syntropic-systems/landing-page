import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Testimonials.module.css';

export const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      quote: "Cloud Glance transformed our infrastructure monitoring. We've reduced downtime by 90% and cut costs by 60%. The predictive analytics are game-changing.",
      author: "Sarah Johnson",
      title: "CTO, TechCorp",
      company: "Fortune 500 Technology Company"
    },
    {
      quote: "The multi-cloud visibility is exactly what we needed. Finally, one platform to monitor AWS, Azure, and GCP. The automation features saved our team hundreds of hours.",
      author: "Michael Chen",
      title: "DevOps Lead, ScaleUp Inc",
      company: "High-Growth Startup"
    },
    {
      quote: "Implementation was seamless and the ROI was immediate. Cloud Glance pays for itself within the first month through cost optimizations alone.",
      author: "Emily Rodriguez",
      title: "VP of Engineering, DataFlow",
      company: "Enterprise Data Platform"
    }
  ];

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>
            Trusted by thousands of companies worldwide
          </h2>
          <p className={styles.sectionSubtitle}>
            See what our customers say about Cloud Glance
          </p>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className={styles.quote}>
                "{testimonial.quote}"
              </div>
              <div className={styles.author}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  <div className={styles.authorTitle}>{testimonial.title}</div>
                  <div className={styles.authorCompany}>{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};