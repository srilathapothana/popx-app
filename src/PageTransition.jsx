import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
