import React, { useState, useEffect, useRef, use } from "react";
export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [Ellapsed, setEllapsed] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - Ellapsed;
      intervalIdRef.current = setInterval(() => {
        setEllapsed(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - Ellapsed;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setEllapsed(0);
    setIsRunning(false);
  }
  function formatTime() {
    let hours = Math.floor(Ellapsed / (1000 * 60 * 60));
    let minutes = Math.floor((Ellapsed / (1000 * 60 * 60)) % 60);
    let seconds = Math.floor((Ellapsed / 1000) % 60);
    let milliSeconds = Math.floor((Ellapsed % 1000) / 10);
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");
    return `${minutes}:${seconds}:${milliSeconds}`;
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
