import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [selectedAlarmSound, setSelectedAlarmSound] = useState('');
  const alarmSounds = [
    '/sounds/Alarm_1.mp3',
  ];

  return (
    <SettingsContext.Provider value={{ alarmSounds, selectedAlarmSound, setSelectedAlarmSound }}>
      {children}
    </SettingsContext.Provider>
  );
};