import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../hooks/useContent";
import type { SolutionsContent } from "../../../types/content";
import styles from "./Solutions.module.css";

export const Solutions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const content = useContent<SolutionsContent>("solutions.json");

  if (!content) {
    return <section className={styles.solutions}>Loading...</section>;
  }

  return (
    <section id="solutions" className={styles.solutions} ref={ref}>
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

        <div className={styles.tabs}>
          <div className={styles.tabList} role="tablist" aria-label="Roles">
            {content.roles.map((role, index) => (
              <button
                key={role.role}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`panel-${index}`}
                id={`tab-${index}`}
                className={`${styles.tab} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {role.role}
              </button>
            ))}
          </div>
          <div className={styles.tabPanels}>
            {content.roles.map((role, index) => (
              <motion.div
                key={role.role}
                role="tabpanel"
                id={`panel-${index}`}
                aria-labelledby={`tab-${index}`}
                hidden={activeIndex !== index}
                className={styles.tabPanel}
                initial={{ opacity: 0, y: 16 }}
                animate={activeIndex === index ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3 }}
              >
                <p className={styles.benefit}>{role.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
