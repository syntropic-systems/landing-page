import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../hooks/useContent";
import type { FAQContent } from "../../../types/content";
import styles from "./FAQ.module.css";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const content = useContent<FAQContent>("faq.json");

  if (!content) {
    return <section className={styles.faq}>Loading...</section>;
  }

  return (
    <section id="faq" className={styles.faq} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>{content.sectionHeader.title}</h2>
          {content.sectionHeader.subtitle && (
            <p className={styles.sectionSubtitle}>
              {content.sectionHeader.subtitle}
            </p>
          )}
        </motion.div>

        <div className={styles.items}>
          {content.faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className={styles.item}>
                <button
                  className={styles.itemHeader}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.chevron} aria-hidden>
                    ▾
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-header-${index}`}
                      className={styles.panel}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className={styles.answer}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={styles.divider} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
