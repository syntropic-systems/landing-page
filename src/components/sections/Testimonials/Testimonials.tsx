import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../hooks/useContent";
import type { TestimonialsContent } from "../../../types/content";
import styles from "./Testimonials.module.css";

export const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const content = useContent<TestimonialsContent>("testimonials.json");

  if (!content) {
    return <section className={styles.testimonials}>Loading...</section>;
  }

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>{content.sectionHeader.title}</h2>
          <p className={styles.sectionSubtitle}>
            {content.sectionHeader.subtitle}
          </p>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {(
            content.testimonials ??
            (content.testimonial ? [content.testimonial] : [])
          ).map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className={styles.quote}>"{testimonial.quote}"</div>
              <div className={styles.author}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  {testimonial.title && (
                    <div className={styles.authorTitle}>
                      {testimonial.title}
                    </div>
                  )}
                  {testimonial.company && (
                    <div className={styles.authorCompany}>
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
