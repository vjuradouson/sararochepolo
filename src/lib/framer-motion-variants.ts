import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0.01, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0.01 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};
