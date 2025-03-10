import React, { useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import useCustomTimer from '../hooks/useCustomTimer';
import usePresetTimer from '../hooks/usePresetTimer';
import presetTimersData from '../data/presetTimersData';
import { TimerContext } from '../context/TimerContext';
import '../styles/App.css';

const Timer = ({ initialTime, timerId, onTimerStop }) => {
  const { selectedAlarmSound } = useContext(SettingsContext);
  const { customTimers } = useContext(TimerContext);
  const presetTimer = presetTimersData.find((t) => t.id === parseInt(timerId));
  const customTimer = customTimers.find((t) => t.id === parseInt(timerId));

  const isPreset = !!presetTimer;
  const { time, isRunning, handleStart, handleStop, handleReset } = isPreset
    ? usePresetTimer(initialTime, timerId, selectedAlarmSound, onTimerStop)
    : useCustomTimer(initialTime, timerId, selectedAlarmSound, onTimerStop);

  const audioRef = useRef(null);

  useEffect(() => {
    if (time === 0 && audioRef.current) {
      audioRef.current.play();
    }
  }, [time]);

  const handlePauseClick = () => handleStop();

  const handleStopClick = () => {
    handleStop();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onTimerStop(timerId);
  };

  const handleResetClick = () => {
    handleReset();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="timer-page">
        <div>
            <p className="timer-display">{formatTime(time)}</p>
            <div className="timer-buttons">
                <button onClick={isRunning ? handlePauseClick : handleStart}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={handleStopClick}>Stop</button>
                <button onClick={handleResetClick}>Reset</button>
            </div>
            <audio ref={audioRef} src={selectedAlarmSound} />
        </div>
    </div>
);
};

export default Timer;