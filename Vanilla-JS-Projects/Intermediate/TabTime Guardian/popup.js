let totalMinutes = 0;
let countdownInterval;

function updateTimeDisplay(minutes, seconds) {
  const hours = Math.floor(minutes / 60);
  const displayMinutes = minutes % 60;
  const timeDisplay = document.getElementById("time-display");
  timeDisplay.textContent = `${hours}:${displayMinutes < 10 ? "0" : ""}${displayMinutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  console.log(`Time Display Updated: ${hours}h ${displayMinutes}m ${seconds}s`);
}

function startCountdown(totalSeconds) {
  clearInterval(countdownInterval); // Clear any existing interval
  countdownInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval); // Stop countdown when time reaches 0
      enableButtons(); // Re-enable buttons when the timer ends
      return;
    }
    totalSeconds--;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    updateTimeDisplay(minutes, seconds);
  }, 1000);
}

function disableButtons() {
  document.getElementById("increase").disabled = true;
  document.getElementById("decrease").disabled = true;
  document.getElementById("reset").disabled = false; // Enable reset when the timer starts
}

function enableButtons() {
  document.getElementById("increase").disabled = false;
  document.getElementById("decrease").disabled = false;
  document.getElementById("reset").disabled = true; // Disable reset when there's no timer running
}

document.getElementById("increase").addEventListener("click", () => {
  totalMinutes++;
  updateTimeDisplay(totalMinutes, 0);
});

document.getElementById("decrease").addEventListener("click", () => {
  if (totalMinutes > 0) {
    totalMinutes--;
    updateTimeDisplay(totalMinutes, 0);
  }
});

document.getElementById("start").addEventListener("click", () => {
  console.log("Start button clicked");
  if (totalMinutes <= 0) {
    alert("Please set a valid timer.");
    return;
  }

  // Save the timer minutes in storage and start the countdown
  chrome.storage.local.set({ timerMinutes: totalMinutes }, () => {
    const totalSeconds = totalMinutes * 60;
    startCountdown(totalSeconds);
    chrome.runtime.sendMessage({ action: "startTimer" });
    disableButtons(); // Disable + and - buttons when the timer starts
  });
});

// Reset button functionality
document.getElementById("reset").addEventListener("click", () => {
  console.log("Reset button clicked");

  // Clear the countdown
  clearInterval(countdownInterval);

  // Reset the timer to 0
  totalMinutes = 0;
  updateTimeDisplay(totalMinutes, 0);

  // Notify the background script to reset the timer
  chrome.runtime.sendMessage({ action: "resetTimer" });

  // Re-enable + and - buttons
  enableButtons();
});

// Initialize display with time from storage if available
chrome.runtime.sendMessage({ action: "getRemainingTime" }, (response) => {
  if (response && response.remainingTime) {
    const totalSeconds = Math.floor(response.remainingTime / 1000);
    startCountdown(totalSeconds);
    disableButtons(); // Keep buttons disabled if there's already an active timer
  } else {
    updateTimeDisplay(totalMinutes, 0);
    enableButtons(); // Enable buttons if there's no active timer
  }
});