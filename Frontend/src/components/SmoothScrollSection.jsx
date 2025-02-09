/* eslint-disable react/prop-types */
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SmoothScrollSection = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const y = useTransform(smoothScroll, [0, 1], ['0%', '-50%']);

  return <motion.div style={{ y }}>{children}</motion.div>;
};

export default SmoothScrollSection;
