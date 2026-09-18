import React from 'react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  format?: 'number' | 'percent';
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1000, format = 'number' }) => {
  const animatedValue = useAnimatedNumber(value, duration);
  
  if (format === 'percent') {
    return <>{animatedValue}%</>;
  }
  
  return <>{animatedValue.toLocaleString()}</>;
};
