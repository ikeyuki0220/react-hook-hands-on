import "./styles.css";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const { time, isRunning, handlers } = useTimer();
  const { handleStart, handlePause, handleReset } = handlers;

  return (
    <div className="main-wrapper">
      <div className="timer-label">{time}</div>
      <div className="timer-button-container">
        <TimerButton label="Start" onClick={handleStart} disabled={isRunning} />
        <TimerButton label="Pause" onClick={handlePause} disabled={!isRunning} />
        <TimerButton label="Reset" onClick={handleReset} disabled={isRunning} />
      </div>
    </div>
  );
}

function TimerButton(props) {
  const { label, onClick, disabled } = props;
  return (
    <button className="timer-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

function useTimer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
    setIsRunning(true);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    };
  }, []);

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

  return {
    time: `${hours}:${minutes}:${seconds}:${milliseconds}`,
    isRunning,
    handlers: {
      handleStart,
      handlePause,
      handleReset,
    },
  };
}
