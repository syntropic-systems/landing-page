import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../hooks/useContent";
import type { WorkflowContent } from "../../../types/content";
import styles from "./Workflow.module.css";

export const Workflow: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const content = useContent<WorkflowContent>("workflow.json");

  if (!content) {
    return <section className={styles.workflow}>Loading...</section>;
  }

  return (
    <section id="workflow" className={styles.workflow} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>{content.title}</h2>
          <p className={styles.sectionSubtitle}>{content.visual.description}</p>
        </motion.div>

        <div className={styles.steps}>
          {content.steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={styles.step}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
