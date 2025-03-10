import React, { createContext, useState, useEffect } from 'react';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [customTimers, setCustomTimers] = useState(() => {
    const savedTimers = localStorage.getItem('customTimers');
    return savedTimers ? JSON.parse(savedTimers) : [];
  });

  useEffect(() => {
    localStorage.setItem('customTimers', JSON.stringify(customTimers));
  }, [customTimers]);

  return (
    <TimerContext.Provider value={{ customTimers, setCustomTimers }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };