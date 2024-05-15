import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [time, setTime] = useState(25 * 60); // Time in seconds (25 minutes)
  const [isBreak, setIsBreak] = useState(false);
  const [timer, setTimer] = useState(null); // Store the timer reference
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (isTimerRunning) {
      const newTimer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(newTimer);
            if (!isBreak) {
              // If it's a work session, start the break
              setIsBreak(true);
              return 5 * 60; // 5 minutes break
            } else {
              // If it's a break session, start the next work session
              setIsBreak(false);
              return 25 * 60; // 25 minutes work session
            }
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      setTimer(newTimer); // Store the new timer reference
    } else {
      clearInterval(timer); // Clear the current timer
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, isBreak]);

  const toggleTimer = () => {
    setIsTimerRunning((prevIsTimerRunning) => !prevIsTimerRunning);
  };

  const skipBreak = () => {
    clearInterval(timer); // Clear the current timer
    setIsBreak(false);
    setTime(25 * 60); // Start the next work session
  };

  const restart = () => {
    clearInterval(timer); // Clear the current timer
    setIsBreak(false);
    setTime(25 * 60); // Start a new 25-minute work session
    setIsTimerRunning(false); // Pause the timer
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      <div className="container">
        <div className="timer-container">
          <h1>{isBreak ? "Break Timer" : "Pomodoro Timer"}</h1>
          <h3>
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </h3>
          {!isBreak && time === 0 && (
            <Button className="skipBtn" onClick={skipBreak}>
              Skip Break
            </Button>
          )}
          <Button className="restartBtn" onClick={restart}>
            Restart
          </Button>
          <Button className="stopBtn" onClick={toggleTimer}>
            {isTimerRunning ? "Stop" : "Start"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
