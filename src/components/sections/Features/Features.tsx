import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../hooks/useContent";
import type { FeaturesContent } from "../../../types/content";
import styles from "./Features.module.css";

export const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const content = useContent<FeaturesContent>("features.json");

  if (!content) {
    return <section className={styles.features}>Loading...</section>;
  }

  // Support both legacy schema (with videoDemo/overviewImage) and new draft schema (with parts[])
  const anyContent = content as unknown as Record<string, any>;
  const hasLegacy = Boolean(anyContent.videoDemo && anyContent.benefits);
  const hasParts = Array.isArray(anyContent.parts);

  return (
    <section className={styles.features} ref={ref}>
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

        {hasLegacy && (
          <>
            {/* YouTube Video Demo */}
            <motion.div
              className={styles.videoContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.videoWrapper}>
                <iframe
                  src={anyContent.videoDemo?.src}
                  title={anyContent.videoDemo?.title}
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
                  <h3 className={styles.benefitTitle}>
                    {anyContent.benefits?.left?.title}
                  </h3>
                  <p className={styles.benefitDescription}>
                    {anyContent.benefits?.left?.description}
                  </p>
                </motion.div>

                <motion.div
                  className={styles.overviewContainer}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {/* Dynamic labels from content */}
                  {anyContent.overviewImage?.labels?.map(
                    (label: any, index: number) => (
                      <div
                        key={index}
                        className={styles.overviewText}
                        style={{
                          position: "absolute",
                          ...(label.position || {}),
                        }}
                      >
                        <span className={styles.textLabel}>{label.text}</span>
                      </div>
                    )
                  )}

                  {/* Center Image */}
                  {anyContent.overviewImage?.src && (
                    <img
                      src={anyContent.overviewImage.src}
                      alt={anyContent.overviewImage.alt || ""}
                      className={styles.overviewImage}
                    />
                  )}
                </motion.div>

                <motion.div
                  className={styles.benefitItem}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className={styles.benefitTitle}>
                    {anyContent.benefits?.right?.title}
                  </h3>
                  <p className={styles.benefitDescription}>
                    {anyContent.benefits?.right?.description}
                  </p>
                </motion.div>
              </div>

              {Array.isArray(anyContent.additionalBenefits) && (
                <div className={styles.additionalBenefits}>
                  {anyContent.additionalBenefits.map(
                    (benefit: any, index: number) => (
                      <motion.div
                        key={benefit.title || index}
                        className={styles.smallBenefit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      >
                        <h4 className={styles.smallBenefitTitle}>
                          {benefit.title}
                        </h4>
                        <p className={styles.smallBenefitDescription}>
                          {benefit.description}
                        </p>
                      </motion.div>
                    )
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {hasParts && (
          <div className={styles.benefitsSection}>
            <div className={styles.benefitsGrid}>
              {anyContent.parts.map((part: any, idx: number) => (
                <motion.div
                  key={part.title || idx}
                  className={styles.benefitItem}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 * idx }}
                >
                  <h3 className={styles.benefitTitle}>{part.title}</h3>
                  <p className={styles.benefitDescription}>
                    {part.description}
                  </p>
                  {Array.isArray(part.features) && (
                    <div className={styles.additionalBenefits}>
                      {part.features.map((f: any, fi: number) => (
                        <div
                          key={(f.title || "") + fi}
                          className={styles.smallBenefit}
                        >
                          <h4 className={styles.smallBenefitTitle}>
                            {f.title}
                          </h4>
                          <p className={styles.smallBenefitDescription}>
                            {f.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
