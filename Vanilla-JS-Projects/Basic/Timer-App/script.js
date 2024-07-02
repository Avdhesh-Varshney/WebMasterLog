let timer;
let isRunning = false;
let time;

const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const title = document.getElementById("timer-title");
const titleInput = document.getElementById("title-input");
startPauseBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  if (!isRunning) {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    time = (minutes * 60 + seconds) * 1000;

    if (time > 0) {
      title.innerText = titleInput.value;
      titleInput.style.display = "none";
      title.classList.toggle("show");
      isRunning = true;
      startPauseBtn.textContent = "Pause";
      timer = setInterval(() => {
        time -= 1000; // decrement by 1000 milliseconds (1 second)
        if (time <= 0) {
          minutesInput.value = "";
          secondsInput.value = "";
          titleInput.value = "";
          updatePlaceholders(
            "Minutes",
            "Seconds",
            "Enter a title for your timer"
          );

          alert("Time's up!"); // Show alert when time is up
          clearInterval(timer);
          time = 0;
          isRunning = false;
          startPauseBtn.textContent = "Start";
          titleInput.style.display = "inline";
          title.classList.remove("show");
        }

        updateDisplay();
      }, 1000);
    }
  }
}

function pauseTimer() {
  isRunning = false;
  startPauseBtn.textContent = "Start";
  clearInterval(timer);
}

function resetTimer() {
  isRunning = false;
  startPauseBtn.textContent = "Start";
  clearInterval(timer);
  time = 0;
  minutesInput.value = "";
  secondsInput.value = "";
  titleInput.value = "";
  updatePlaceholders("Minutes", "Seconds", "Enter a title for your timer");
  titleInput.style.display = "inline";
  title.classList.remove("show");

  updateDisplay();
}

function updatePlaceholders(
  minutesPlaceholder,
  secondsPlaceholder,
  titlePlaceholder
) {
  minutesInput.placeholder = minutesPlaceholder;
  secondsInput.placeholder = secondsPlaceholder;
  titleInput.placeholder = titlePlaceholder;
}

function updateDisplay() {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

updatePlaceholders("Minutes", "Seconds", "Enter a title for your timer");
