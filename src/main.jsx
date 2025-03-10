import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { TimerProvider } from './context/TimerContext';
import { SettingsProvider } from './context/SettingsContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider> 
      <TimerProvider>
        <Router future={{ v7_relativeSplatPath: true }}>
          <AppRoutes />
        </Router>
      </TimerProvider>
    </SettingsProvider>
  </React.StrictMode>
);