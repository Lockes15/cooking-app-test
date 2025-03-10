import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import PresetTimers from '../pages/PresetTimers';
import CustomTimers from '../pages/CustomTimers';
import TimerPage from '../pages/TimerPage';
import Settings from '../pages/Settings'; // Import the new Settings component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="preset-timers" element={<PresetTimers />} />
        <Route path="custom-timers" element={<CustomTimers />} />
        <Route path="timer/:timerId" element={<TimerPage />} />
        <Route path="settings" element={<Settings />} /> {/* Add the new route */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
