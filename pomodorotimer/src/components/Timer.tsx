
import React, { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import useSound from "use-sound";
import notificationSound from "../assets/notification.mp3";

type TimerMode = "work" | "shortBreak" | "longBreak";

const Timer = () => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [play] = useSound(notificationSound, { interrupt: true, volume: 0.5 });

  const modesConfig = {
    work: { duration: 25 * 60, label: "Pomodoro" },
    shortBreak: { duration: 5 * 60, label: "Short Break" },
    longBreak: { duration: 15 * 60, label: "Long Break" },
  };

  useEffect(() => {
    setTime(modesConfig[mode].duration);
  }, [mode]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (time < 0) {
      pauseTimer();
      if (isSoundEnabled) {
        play();
      }
      toast({
        title: `${modesConfig[mode].label} complete!`,
        description: "Time to take a break or start a new session.",
      });
    }
  }, [time, mode, play, isSoundEnabled]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const pauseTimer = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTime(modesConfig[mode].duration);
  };

  const switchMode = (newMode: TimerMode) => {
    pauseTimer();
    setMode(newMode);
    setTime(modesConfig[newMode].duration);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 rounded-lg p-8">
      <div className="space-y-8">
        <div className="flex justify-center gap-4">
          {Object.entries(modesConfig).map(([key, value]) => (
            <button
              key={key}
              onClick={() => switchMode(key as TimerMode)}
              className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
                mode === key
                  ? "bg-white/20"
                  : "bg-transparent hover:bg-white/10"
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className="text-center">
          <div className="text-white text-8xl font-bold tracking-wide my-8">
            {formatTime(time)}
          </div>
          <button
            onClick={toggleTimer}
            className="bg-white text-[#33C3F0] px-12 py-3 rounded-md text-2xl font-bold hover:bg-white/90 transition-colors"
          >
            {isActive ? "PAUSE" : "START"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
