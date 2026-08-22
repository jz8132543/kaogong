import { View, Text } from '@tarojs/components';
import { useEffect, useRef } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import './Timer.scss';

interface TimerProps {
  timeSpent: number;
  onTick: () => void;
  isPaused: boolean;
}

export default function Timer({ timeSpent, onTick, isPaused }: TimerProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPageHidden = useRef(false);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      // 只有在未提交且页面未退到后台时才计时
      if (!isPaused && !isPageHidden.current) {
        onTick();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Taro 专有生命周期，处理小程序切后台防作弊/防中断
  useDidShow(() => {
    isPageHidden.current = false;
  });

  useDidHide(() => {
    isPageHidden.current = true;
  });

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [isPaused]); // isPaused 变化（如交卷）会重新跑 effect 并停掉 timer

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View className='timer-box'>
      <Text className='timer-icon'>⏱️</Text>
      <Text className={`timer-text ${isPaused ? 'paused' : ''}`}>
        {formatTime(timeSpent)}
      </Text>
    </View>
  );
}
