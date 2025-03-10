import { useState, useEffect, useRef, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const usePresetTimer = (initialTime, timerId, onTimerStop) => {
  const { selectedAlarmSound } = useContext(SettingsContext);
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(`timer-${timerId}-time`);
    return savedTime ? parseInt(savedTime) : initialTime;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem(`timer-${timerId}-isRunning`);
    return savedIsRunning ? JSON.parse(savedIsRunning) : false;
  });
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem(`timer-${timerId}-startTime`);
    return savedStartTime ? parseInt(savedStartTime) : null;
  });

  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(selectedAlarmSound));

  useEffect(() => {
    localStorage.setItem(`timer-${timerId}-time`, time);
    localStorage.setItem(`timer-${timerId}-isRunning`, isRunning);
    localStorage.setItem(`timer-${timerId}-startTime`, startTime);
  }, [time, isRunning, startTime, timerId]);

  useEffect(() => {
    if (isRunning) {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const updatedTime = Math.max(initialTime - elapsed, 0);
      setTime(updatedTime);

      if (updatedTime > 0) {
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);
      } else {
        setIsRunning(false);
        if (onTimerStop) onTimerStop(timerId);
        audioRef.current.play();
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime, initialTime, onTimerStop, timerId]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now() - (initialTime - time) * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
    setStartTime(null);
    clearInterval(intervalRef.current);
  };

  return { time, isRunning, handleStart, handleStop, handleReset };
};

export default usePresetTimer;