import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './styles/App.css';

import { TimerProvider } from './context/TimerContext';
import { SettingsProvider } from './context/SettingsContext'; // Import SettingsProvider

const App = () => {
  return (
    <SettingsProvider> {/* Wrap TimerProvider with SettingsProvider */}
      <TimerProvider>
        <div className="container text-center">
          <h1>Chef's Kiss</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <div className="box">Home</div>
            </Link>
            <Link to="/preset-timers" className="nav-link">
              <div className="box">Preset Timers</div>
            </Link>
            <Link to="/custom-timers" className="nav-link">
              <div className="box">Custom Timers</div>
            </Link>
            <Link to="/settings" className="nav-link"> {/* Add link to Settings */}
              <div className="box">Settings</div>
            </Link>
          </div>
          <Outlet />
        </div>
      </TimerProvider>
    </SettingsProvider>
  );
};

export default App;
