import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaSun } from 'react-icons/fa';

const ClearAnimation = () => {
  const styles = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    loop: true,
    config: { duration: 4000 },
  });

  return <animated.div style={styles}><FaSun size={48} style={{ color: '#FFD700' }} /></animated.div>;
};

export default ClearAnimation;
