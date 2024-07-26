let text = document.getElementById('text').innerText;
let input = document.getElementById('input');
let speedValue = document.getElementById('speed-value');
let reset = document.getElementById('reset');
let started = false;
let finished = false;
let seconds = 60;
let speed = 0;

input.addEventListener('input', () => {
    if (!started) {
        started = true;
    }
    if (input.value === text) {
        finished = true;
        calculateSpeed();
    }
});

function calculateSpeed() {
    let elapsedSeconds = 60 - seconds;
    if (elapsedSeconds > 0) {
        speed = (input.value.length / elapsedSeconds) * 60;
        speedValue.innerText = speed.toFixed(2);
    } else {
        speedValue.innerText = '0';
    }

}
let intervalId = setInterval(() => {
    if (started && !finished) {
        seconds--;
        if (seconds <= 0) {
            finished = true;
            calculateSpeed();
            clearInterval(intervalId);
        }
    }
}, 1000);

reset.addEventListener('click', () => {
    input.value = '';
    started = false;
    finished = false;
    seconds = 60;
    speed = 0;
    speedValue.innerText = '0';
});