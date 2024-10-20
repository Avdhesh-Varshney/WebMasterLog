const hourDisplay = document.querySelector('.hour');
const minuteDisplay = document.querySelector('.minute');
const secondDisplay = document.querySelector('.second');
const amPmDisplay = document.querySelector('.am-pm');
const timeZoneSelect = document.getElementById('time-zone-select');
const formatSelect = document.getElementById('format-select');

let currentTimeZone = 'America/New_York';
let currentFormat = '12';

function updateClock() {
    // Get the current time in the selected time zone
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: currentTimeZone }));
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const amPm = hours < 12 ? 'AM' : 'PM';

    // Adjust hours for 12-hour format
    if (currentFormat === '12') {
        hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        amPmDisplay.textContent = amPm; // Show AM/PM
    } else {
        amPmDisplay.textContent = ''; // Hide AM/PM for 24-hour format
    }

    // Update the display
    hourDisplay.textContent = hours.toString().padStart(2, '0');
    minuteDisplay.textContent = minutes.toString().padStart(2, '0');
    secondDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Event listeners to update the time zone and format
timeZoneSelect.addEventListener('change', (e) => {
    currentTimeZone = e.target.value; // Update the current time zone
    updateClock(); // Update the clock immediately after changing the time zone
});

formatSelect.addEventListener('change', (e) => {
    currentFormat = e.target.value; // Update the current format
    updateClock(); // Update the clock immediately after changing the format
});

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call to display the time immediately