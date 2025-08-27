import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../hooks/useContent";
import type { TechnologyContent } from "../../../types/content";
import styles from "./Technology.module.css";

export const Technology: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const content = useContent<TechnologyContent>("technology.json");

  if (!content) {
    return <section className={styles.technology}>Loading...</section>;
  }

  return (
    <section id="technology" className={styles.technology} ref={ref}>
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
          <p className={styles.introduction}>{content.introduction}</p>
        </motion.div>

        <div className={styles.pointsGrid}>
          {content.points.map((point, index) => (
            <motion.div
              key={point.title}
              className={styles.pointCard}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
            >
              <h3 className={styles.pointTitle}>{point.title}</h3>
              <div className={styles.pointBody}>
                <div className={styles.pointCol}>
                  <div className={styles.pointLabel}>Problem</div>
                  <p className={styles.pointText}>{point.problem}</p>
                </div>
                <div className={styles.pointCol}>
                  <div className={styles.pointLabelSuccess}>Solution</div>
                  <p className={styles.pointText}>{point.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
