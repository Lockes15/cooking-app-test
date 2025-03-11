import React, { useContext, useState, useEffect, useRef } from "react";
import { SettingsContext } from "../context/SettingsContext";
import "../styles/App.css";

const Timer = ({ initialTime, timerId }) => {
  const { selectedAlarmSound } = useContext(SettingsContext);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(`timer-${timerId}-time`);
    const timerFinished = localStorage.getItem(`timer-${timerId}-isRunning`)
    console.log(localStorage);
    return savedTime && !timerFinished? parseInt(savedTime) : initialTime;
  });
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (time === 0) {
      stopTimer();
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [time]);

  // Function to start the timer
  const startTimer = () => {
    if (!timerRunning && time > 0) {
      setTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(initialTime);
    setTimerRunning(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer-page">
      <p className="timer-display">{formatTime(time)}</p>
      <div className="timer-buttons">
        <button onClick={startTimer} disabled={timerRunning}>
          {timerRunning ? "Running" : "Start"}
        </button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <audio ref={audioRef} src={selectedAlarmSound} />
    </div>
  );
};

export default Timer;
