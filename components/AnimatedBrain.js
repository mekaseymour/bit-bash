import React, { useEffect, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

const AnimatedBrain = () => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, { toValue: 1, duration: 2000, easing: Easing.linear }).start(() => animate());
  };

  const movingMargin = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 10, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/icons/brain-2x.png')}
        style={{ height: 70, width: 81, top: movingMargin }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 200,
  },
});

export default AnimatedBrain;
