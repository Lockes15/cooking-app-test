import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Timer from '../components/Timers';
import presetTimersData from '../data/presetTimersData';
import { TimerContext } from '../context/TimerContext';
import '../styles/App.css';
// import { SettingsContext } from '../context/SettingsContext'; // Import SettingsContext


const TimerPage = () => {
  const { timerId } = useParams();
  const { customTimers } = useContext(TimerContext);
  const presetTimer = presetTimersData.find((t) => t.id === parseInt(timerId));
  const customTimer = customTimers.find((t) => t.id === parseInt(timerId));

  const timer = presetTimer || customTimer;

  if (!timer) {
    return <p>Timer not found</p>;
  }

  return (
    <div className="timer-page">
        <h1 className="timer-name">{timer.name}</h1>
        <p className="timer-time">Time: {timer.time / 60} minutes</p>
        <p className="timer-instructions">Instructions: {timer.instructions}</p>
        <p className="timer-tools">Tools: {timer.tools ? timer.tools.join(', ') : 'N/A'}</p>
        <Timer initialTime={timer.time} timerId={timer.id} />
    </div>
);
};

export default TimerPage;