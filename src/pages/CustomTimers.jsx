import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimerContext } from '../context/TimerContext';
import presetTimersData from '../data/presetTimersData'; // Import presetTimersData
import Timer from '../components/Timers'; // Import the Timer component

const CustomTimers = () => {
  const { customTimers, setCustomTimers } = useContext(TimerContext);
  const [selectedTimer, setSelectedTimer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('customTimers', JSON.stringify(customTimers));
  }, [customTimers]);

  const handleAddTimer = (newTimer) => {
    const newId = customTimers.length + 1 + presetTimersData.length; // Ensure unique ID
    const timerWithId = { ...newTimer, id: newId };
    setCustomTimers((prevTimers) => [...prevTimers, timerWithId]);
  };

  const handleDeleteTimer = (id) => {
    const updatedTimers = customTimers.filter((timer) => timer.id !== id);
    setCustomTimers(updatedTimers);
    if (selectedTimer && selectedTimer.id === id) {
      setSelectedTimer(null);
    }
  };

  const handleSelect = (timer) => {
    console.log('Selected Timer:', timer);
    setSelectedTimer(timer);
  };

  return (
    <div>
      <h1>Custom Timers</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const newTimer = {
          name: e.target.name.value,
          time: parseInt(e.target.time.value) * 60, // Convert minutes to seconds
          instructions: e.target.instructions.value
        };
        
        handleAddTimer(newTimer);
        e.target.reset();
      }}>
        <input type="text" name="name" placeholder="Enter timer name" required />
        <input type="number" name="time" placeholder="Enter time in minutes" required />
        <input type="text" name="instructions" placeholder="Enter instructions" required />
        <button type="submit">Add Timer</button>
      </form>
      <ul>
        {customTimers && customTimers.map((timer) => (
          <li key={timer.id}>
            <h2 onClick={() => handleSelect(timer)}>{timer.name}</h2>
            <button onClick={() => handleDeleteTimer(timer.id)}>Delete</button>
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

export default CustomTimers;