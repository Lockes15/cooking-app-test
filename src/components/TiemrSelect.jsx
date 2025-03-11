
import { useState } from 'react';

import '../styles/App.css';
import Timer from './Timers';

const TimerSelect = ({ timer }) => {
  const [selectedTimer, setSelectedTimer] = useState();


  return (
    <>
      <div className='timerSelect'>
        <h2 onClick={() => setSelectedTimer(timer)}>{timer.name}</h2>
        {selectedTimer && (
          <div>
            <Timer initialTime={selectedTimer.time} timerId={selectedTimer.id} />
          </div>
        )}
      </div>
      <style jsx>
        {`
          .timerSelect {
            background-color: #fff;
            margin: 10px 0;
            padding: 25px; /* Increased padding */
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: box-shadow 0.3s, transform 0.3s;
          }

          .timerSelect:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            transform: translateY(-5px);
          }
      
        `}
      </style>
    </>
  )
};

export default TimerSelect;