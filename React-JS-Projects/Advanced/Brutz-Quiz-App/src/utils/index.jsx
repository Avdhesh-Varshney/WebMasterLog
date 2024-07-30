import dayjs from "dayjs";

export function getTimeByMs(time) {
  const currTime = dayjs();
  const futTIme = dayjs(time);

  if (currTime.isAfter(futTIme)) return;

  return {
    minutes: getMinuteByMs(currTime, futTIme),
    seconds: getSecondByMs(currTime, futTIme),
  };
}

function getSecondByMs(currTime, futTime) {
  const timeDif = futTime.diff(currTime, "second") % 60;
  return timeDif;
}

function getMinuteByMs(currTime, futTime) {
  return futTime.diff(currTime, "minute");
}
