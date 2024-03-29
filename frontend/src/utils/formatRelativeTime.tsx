"use client";
function formatRelativeTime(timestamp: string) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = Date.now() - new Date(timestamp).getTime();
  // console.log(elapsed);

  if (elapsed < msPerMinute) {
    return "Just Now";
  } else if (elapsed < msPerHour) {
    return (
      Math.round(elapsed / msPerMinute) +
      " minute" +
      (Math.round(elapsed / msPerMinute) === 1 ? "" : "s") +
      " ago"
    );
  } else if (elapsed < msPerDay) {
    return (
      Math.round(elapsed / msPerHour) +
      " hour" +
      (Math.round(elapsed / msPerHour) === 1 ? "" : "s") +
      " ago"
    );
  } else if (elapsed < msPerMonth) {
    return (
      "aprox. " +
      Math.round(elapsed / msPerDay) +
      " day" +
      (Math.round(elapsed / msPerDay) === 1 ? "" : "s") +
      " ago"
    );
  } else if (elapsed < msPerYear) {
    return (
      "aprox. " +
      Math.round(elapsed / msPerMonth) +
      " month" +
      (Math.round(elapsed / msPerMonth) === 1 ? "" : "s") +
      " ago"
    );
  } else {
    return (
      "aprox. " +
      Math.round(elapsed / msPerYear) +
      " year" +
      (Math.round(elapsed / msPerYear) === 1 ? "" : "s") +
      " ago"
    );
  }
}

export default formatRelativeTime;
