/* eslint-disable react/prop-types */
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SmoothScrollProvider = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        transform: useTransform(smoothScroll, [0, 1], ['0%', '-100%']),
      }}
    >
      {children}
    </motion.div>
  );
};

export default SmoothScrollProvider;
