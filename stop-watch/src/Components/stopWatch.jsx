import React, { useState, useEffect, useRef } from "react";
export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [isEllapsed, setIsEllapsed] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - isEllapsed;
      intervalIdRef.current = setInterval(() => {
        setIsEllapsed(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  function start() {
    setIsRunning(true);

    startTimeRef.current = new Date() - isEllapsed;
  }

  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setIsRunning(false);
    setIsEllapsed(0);
  }
  function formatTime() {
    let hours = Math.floor(isEllapsed / (1000 * 60 * 60));
    let minutes = Math.floor((isEllapsed / (1000 * 60 * 60)) % 60);
    let seconds = Math.floor((isEllapsed / 1000) % 60);
    let milliSeconds = Math.floor((isEllapsed % 1000) / 10);
    return `${hours}:${minutes}:${seconds}:${milliSeconds}`;
  }
  return (
    <>
      <div className="mainContainer">
        <div className="timerContainer">
          <span>{formatTime()}</span>
        </div>
        <div className="buttonContainer">
          <button onClick={start} className="startButton">
            Start
          </button>
          <button onClick={stop} className="stopButton">
            Stop
          </button>
          <button onClick={reset} className="resetButton">
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
