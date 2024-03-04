import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaCloud } from 'react-icons/fa';

const CloudAnimation = () => {
  const styles = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(100%)' },
    config: { duration: 2000 },
    reset: true,
    reverse: true,
    loop: true,
  });

  return <animated.div style={styles}><FaCloud size={48} /></animated.div>;
};

export default CloudAnimation;
