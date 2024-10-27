export const transitionSettings = {
    // Transiciones suaves generales
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1, ease: 'easeOut' }
    },
    fadeInDown: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1, ease: 'easeOut' }
    },
    scaleUp: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration: 0.7, ease: 'easeOut' }
    },
    // Hover y tap
    hoverScale: { scale: 1.03, transition: { type: 'spring', stiffness: 200, damping: 10 } },
    tapScale: { scale: 0.97, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  };
  