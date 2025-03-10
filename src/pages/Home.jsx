import React, { useContext, useState, useEffect } from 'react';
import { TimerContext } from '../context/TimerContext';
import Timer from '../components/Timers';
import presetTimersData from '../data/presetTimersData';

const Home = () => {
  const { customTimers } = useContext(TimerContext);
  const [runningTimers, setRunningTimers] = useState([]);

  useEffect(() => {
    const checkRunningTimers = (timers) => {
      return timers.filter(timer => {
        const isRunning = localStorage.getItem(`timer-${timer.id}-isRunning`);
        return isRunning ? JSON.parse(isRunning) : false;
      });
    };

    const runningCustomTimers = checkRunningTimers(customTimers);
    const runningPresetTimers = checkRunningTimers(presetTimersData);

    setRunningTimers([...runningCustomTimers, ...runningPresetTimers]);
  }, [customTimers]);

  const handleTimerStop = (timerId) => {
    setRunningTimers(prevTimers => prevTimers.filter(timer => timer.id !== timerId));
  };

  return (
    <div id="home-page">
      <h1>Welcome to the Cooking Timer App</h1>
      <h2>Running Timers</h2>
      {runningTimers.length > 0 ? (
        runningTimers.map(timer => (
          <div key={timer.id}>
            <h3>{timer.name}</h3>
            <Timer initialTime={timer.time} timerId={timer.id} onTimerStop={handleTimerStop} />
          </div>
        ))
      ) : (
        <p>No timers are currently running.</p>
      )}
    </div>
  );
};

export default Home;
