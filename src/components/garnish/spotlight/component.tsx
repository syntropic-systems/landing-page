import { motion } from "framer-motion";
import styles from "./component.module.css";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(129, 100.00%, 85.10%, 0.08) 0, hsla(129, 100.00%, 55.10%, 0.02) 50%, hsla(132, 100.00%, 45.10%, 0.00) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(129, 100.00%, 85.10%, 0.06) 0, hsla(129, 100.00%, 55.10%, 0.02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(129, 100.00%, 85.10%, 0.04) 0, hsla(129, 100.00%, 45.10%, 0.02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className={styles.spotlight}
    >
      <motion.div
        animate={{
          x: [0, xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={`${styles.motionContainer} ${styles.motionContainerLeft}`}
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={`${styles.gradientElement} ${styles.gradientElementLeft}`}
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`${styles.gradientElement} ${styles.gradientElementLeft} ${styles.originTopLeft}`}
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`${styles.gradientElement} ${styles.gradientElementLeft} ${styles.originTopLeft}`}
        />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={`${styles.motionContainer} ${styles.motionContainerRight}`}
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={`${styles.gradientElement} ${styles.gradientElementRight}`}
        />

        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`${styles.gradientElement} ${styles.gradientElementRight} ${styles.originTopRight}`}
        />

        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`${styles.gradientElement} ${styles.gradientElementRight} ${styles.originTopRight}`}
        />
      </motion.div>
    </motion.div>
  );
};
