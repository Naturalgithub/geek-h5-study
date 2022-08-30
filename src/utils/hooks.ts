import { RootState } from '@/types/store';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

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

/**
 * 1. 自动useEffect发送请求
 * 2. 通过useSelector获取到数据并返回
 */
export function useInitialState<K extends keyof RootState>(action: () => void, stateName: K) {
  const dispatch = useDispatch();

  // 进入组件，就需要发送请求
  const state = useSelector(
    (state: RootState) => state[stateName]
  );

  // 进入组件，需要获取redux的数据
  useEffect(() => {
    dispatch(action());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return state
}