import { useEffect, useState } from "react";
import useQuestionStore from "../../store/zustand";
import { getTimeByMs } from "../../utils";
import { useNavigate } from "react-router-dom";

const defaultCountdown = {
  minutes: "00",
  seconds: "00",
};

function TimeStamp() {
  const [countDown, setCountDown] = useState(defaultCountdown);
  const [startTime, setStartTime] = useState(true);
  const { totalTime, setTimeStamp } = useQuestionStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!totalTime) {
      setTimeStamp(new Date(new Date().getTime() + 3 * 60000).getTime());
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (startTime && totalTime) {
      intervalId = setInterval(() => {
        const timeNext = getTimeByMs(totalTime);

        if (timeNext) {
          setCountDown(timeNext);
        } else {
          clearInterval(intervalId);
          setStartTime(false);
          navigate("/finish");
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, totalTime]);

  return (
    <>
      <div className="mx-auto flex max-w-fit items-center space-x-3 text-neutral-700 ring-[1px] ring-neutral-400 rounded-lg p-3 text-xs font-semibold">
        <span>{countDown.minutes}</span>
        <span>Minutes</span>
        <span>{countDown.seconds}</span>
        <span>Seconds</span>
      </div>
    </>
  );
}

export default TimeStamp;
