import { useEffect, useRef, useState } from 'react';

/**
 * @description: 倒计时
 * @return {*}
 */
export function useCountDown() {
  const [timeLeft, settimeLeft] = useState(0)
  const timer = useRef(-1) as any

  const start = () => {
    console.log('开始倒计时')
    // 请粗定时器
    clearInterval(timer.current)
    settimeLeft(60)
    timer.current = setInterval(() => {
      settimeLeft(timeLeft => timeLeft - 1)
    }, 1000)
  }

  // 倒计时为0的时候清除定时器
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timer.current)

    }
  }, [timeLeft])

  // 组件销毁的时候，清理定时器
  useEffect(() => {
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  return {
    timeLeft,
    start
  }
}
