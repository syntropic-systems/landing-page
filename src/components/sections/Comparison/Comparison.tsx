import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Clock,
  TrendingUp,
  FileSearch,
  Target,
  Users,
  ShieldAlert,
  Database,
  GitBranch,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import { useContent } from "../../../hooks/useContent";
import type { ComparisonContent } from "../../../types/content";
import styles from "./Comparison.module.css";

// Icon mapping based on category names
const getCategoryIcon = (category: string): React.ComponentType<any> => {
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes("time") || categoryLower.includes("cycle"))
    return Clock;
  if (categoryLower.includes("win") || categoryLower.includes("rate"))
    return TrendingUp;
  if (categoryLower.includes("document") || categoryLower.includes("review"))
    return FileSearch;
  if (categoryLower.includes("focus") || categoryLower.includes("team"))
    return Target;
  if (categoryLower.includes("capacity") || categoryLower.includes("headcount"))
    return Users;
  if (categoryLower.includes("compliance") || categoryLower.includes("risk"))
    return ShieldAlert;
  if (categoryLower.includes("knowledge") || categoryLower.includes("library"))
    return Database;
  if (categoryLower.includes("workflow") || categoryLower.includes("process"))
    return GitBranch;

  return Target; // default icon
};

export const Comparison: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const content = useContent<ComparisonContent>("comparison.json");

  if (!content) {
    return <section className={styles.comparison}>Loading...</section>;
  }

  const staggerMs: number = (content as any).presentation?.staggerDelay ?? 100;

  const normalizedComparisons = ((content as any).comparisons || []).map(
    (item: any, index: number) => {
      if (
        item &&
        typeof item.without === "string" &&
        typeof item.with === "string"
      ) {
        return {
          id: item.id ?? String(index),
          category: item.category ?? "",
          icon: item.icon ?? "target",
          without: {
            value: item.without,
            description: "",
            pain: true,
          },
          withUs: {
            value: item.with,
            description: "",
            highlight: "",
            improvement: "",
          },
        };
      }
      return item;
    }
  );

  return (
    <section className={styles.comparison} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{content.sectionHeader.title}</h2>
          <p className={styles.subtitle}>{content.sectionHeader.subtitle}</p>
        </motion.div>

        <div className={styles.cardsGrid}>
          {normalizedComparisons.map((item: any, index: number) => {
            const IconComponent = getCategoryIcon(item.category);
            return (
              <motion.div
                key={item.id}
                className={styles.comparisonCard}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + (index * staggerMs) / 1000,
                }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className={styles.cardCategory}>{item.category}</h3>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.comparisonRow}>
                    <div className={styles.withoutSection}>
                      <div className={styles.sectionHeader}>
                        <X size={16} className={styles.xIcon} />
                        <span className={styles.sectionLabel}>Without</span>
                      </div>
                      <p className={styles.sectionText}>{item.without.value}</p>
                    </div>

                    <div className={styles.arrowContainer}>
                      <motion.div
                        className={styles.arrow}
                        initial={{ x: -10, opacity: 0 }}
                        animate={inView ? { x: 0, opacity: 1 } : {}}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + (index * staggerMs) / 1000,
                        }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>

                    <div className={styles.withSection}>
                      <div className={styles.sectionHeader}>
                        <Check size={16} className={styles.checkIcon} />
                        <span className={styles.sectionLabel}>With</span>
                      </div>
                      <p className={styles.sectionText}>{item.withUs.value}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
