import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaSnowflake } from 'react-icons/fa';

const SnowAnimation = () => {
  const styles = useSpring({
    from: { translateY: -100 },
    to: { translateY: 0 },
    loop: { reverse: true },
    config: { duration: 1000 },
  });

  return <animated.div style={styles}><FaSnowflake size={48} style={{ color: '#FFFFFF' }} /></animated.div>;
};

export default SnowAnimation;
