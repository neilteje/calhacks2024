import React, { useState, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

interface SoundPulseVisualizerProps {
  decibelLevel: number;
}

const SoundPulseVisualizer: React.FC<SoundPulseVisualizerProps> = ({ decibelLevel }) => {
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const pulse = () => {
      pulseAnim.setValue(1);
      Animated.timing(pulseAnim, {
        toValue: 1 + decibelLevel / 50,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => pulse());
    };
    pulse();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, [decibelLevel, pulseAnim]);

  return (
    <View style={styles.pulseContainer}>
      <Svg height="100" width="100" viewBox="0 0 100 100">
        <AnimatedCircle
          cx="50"
          cy="50"
          r={pulseAnim.interpolate({
            inputRange: [1, 2],
            outputRange: [30, 60],
          })}
          fill="none"
          stroke="#f76565"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  pulseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SoundPulseVisualizer;
