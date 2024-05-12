import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [timer, setTimer] = useState(null); // Store the timer reference

  useEffect(() => {
    const newTimer = setInterval(() => {
      if (seconds === 0 && minutes === 0) {
        clearInterval(newTimer);
        return;
      }

      if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    setTimer(newTimer); // Store the new timer reference

    return () => clearInterval(newTimer);
  }, [seconds, minutes]);

  const restart = () => {
    clearInterval(timer); // Clear the current timer
    setMinutes(25);
    setSeconds(0);
  };

  const stop = () => {
    clearInterval(timer); // Clear the current timer
  };

  return (
    <div>
      <div className="container">
        <div className="timer-container">
          <h1>Pomodoro Timer</h1>
          <h3>
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </h3>
          <Button className="restartBtn" onClick={restart}>
            Restart
          </Button>
          <Button className="stopBtn" onClick={stop}>
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
