import React, { useState } from 'react';
import presetTimersData from '../data/presetTimersData';
import TimerSelect from '../components/TiemrSelect';

const PresetTimers = () => {
  return (
    <div>
      <h1>Preset Timers</h1>
      {presetTimersData.map((timer) => (
        <div key={timer.id}>
          <TimerSelect timer={timer} />
        </div>
      ))}
    </div>
  );
};

export default PresetTimers;
