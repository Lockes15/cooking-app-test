import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import presetTimersData from '../data/presetTimersData';
import Timer from '../components/Timers'; // Import the Timer component

const PresetTimers = () => {
  const [timers, setTimers] = useState(presetTimersData);
  const [selectedTimer, setSelectedTimer] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (timer) => {
    setSelectedTimer(timer);
  };

  return (
    <div>
      <h1>Preset Timers</h1>
      <ul>
        {timers.map((timer) => (
          <li key={timer.id}>
            <h2 onClick={() => handleSelect(timer)}>{timer.name}</h2>
          </li>
        ))}
      </ul>
      {selectedTimer && (
        <div>
          <h2>{selectedTimer.name}</h2>
          <Timer initialTime={selectedTimer.time} timerId={selectedTimer.id} onTimerStop={() => console.log('Timer stopped')} />
        </div>
      )}
    </div>
  );
};

export default PresetTimers;
