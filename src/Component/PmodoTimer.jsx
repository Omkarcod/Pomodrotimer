import React, { useState, useEffect } from 'react';

function PmodoTimer() {
  const [time, setTime] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="text-6xl font-bold mb-4">{formatTime(time)}</div>
      <div className="space-x-4">
        {isRunning ? (
          <>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={pauseTimer}
            >
              Pause
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-500 hover.bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={startTimer}
            >
              Start
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={resetTimer}
            >
              Reset
            </button>
          </>
        )}
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
          onClick={stopTimer}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default PmodoTimer;
