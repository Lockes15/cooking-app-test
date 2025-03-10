import React, { useContext, useRef, useState } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const Settings = () => {
  const { alarmSounds, selectedAlarmSound, setSelectedAlarmSound } = useContext(SettingsContext);
  const audioRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const displayNames = {
    '/sounds/Alarm_1.mp3': 'Wake Up',
  };

  const handleAlarmChange = (event) => {
    setSelectedAlarmSound(event.target.value);
  };

  const handleTogglePlay = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null) {
        const currentAudio = audioRefs.current[playingIndex];
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      setTimeout(() => {
        audio.play().catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Playback was interrupted by a pause request.');
          } else {
            console.error('Playback error:', error);
          }
        });
        setPlayingIndex(index);
      }, 50);
    }
  };

  return (
    <div id="settings-page">
      <h1>Settings</h1>
      <p>Here you can configure your app settings.</p>
      <div>
        <label htmlFor="alarm-sound">Select Alarm Sound:</label>
        <select id="alarm-sound" value={selectedAlarmSound} onChange={handleAlarmChange}>
          {alarmSounds.map((sound, index) => (
            <option key={index} value={sound}>
              {displayNames[sound] || sound.split('/').pop()}
            </option>
          ))}
        </select>
      </div>
      <div className="alarm-sounds-grid">
        {alarmSounds.map((sound, index) => (
          <div key={index} className="alarm-sound-box">
            <span>{displayNames[sound] || sound.split('/').pop()}</span>
            <button onClick={() => handleTogglePlay(index)}>
              {playingIndex === index ? 'Stop' : 'Play'}
            </button>
            <audio ref={(el) => (audioRefs.current[index] = el)}>
              <source src={sound} type="audio/mpeg" />
              <source src={sound.replace('.mp3', '.ogg')} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;