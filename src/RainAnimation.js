import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaCloudRain } from 'react-icons/fa';

const RainAnimation = () => {
  const styles = useSpring({
    from: { translateY: -100 },
    to: { translateY: 0 },
    loop: { reverse: true },
    config: { duration: 800 },
  });

  return <animated.div style={styles}><FaCloudRain size={48} /></animated.div>;
};

export default RainAnimation;
