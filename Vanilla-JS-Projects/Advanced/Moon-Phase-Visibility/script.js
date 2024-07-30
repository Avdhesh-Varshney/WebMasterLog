function calculateMoonPhase(date) {
    // The duration in days of a lunar cycle
    var lunarDays = 29.53058770576;
    // Date time of first new moon in year 2000
    var new2000 = new Date("2000-01-06T18:14:00Z").getTime() / 1000;

    // Convert the input date to Unix timestamp
    var unixDate = date.getTime() / 1000;

    // Calculate seconds between date and new moon 2000
    var totalSecs = unixDate - new2000;

    // The modulus to drop completed cycles
    var lunarSecs = lunarDays * (24 * 60 *60);
    var currentSecs = totalSecs % lunarSecs;

    // If negative number (date before new moon 2000) add lunarSecs
    if ( currentSecs < 0 ) {
        currentSecs += lunarSecs;
    }

    // Calculate the fraction of the moon cycle
    var currentFrac = currentSecs / lunarSecs;

    // Calculate days in current cycle (moon age)
    var currentDays = currentFrac * lunarDays;
    
    // Calculate the percentage of the moon phase
    var phasePercentage = (currentDays / lunarDays) * 100;

    // Array with start and end of each phase
    var phases = [
        ["New Moon", 0, 1],
        ["Waxing Crescent", 1, 6.38264692644],
        ["First Quarter", 6.38264692644, 8.38264692644],
        ["Waxing Gibbous", 8.38264692644, 13.76529385288],
        ["Full Moon", 13.76529385288, 15.76529385288],
        ["Waning Gibbous", 15.76529385288, 21.14794077932],
        ["Last Quarter", 21.14794077932, 23.14794077932],
        ["Waning Crescent", 23.14794077932, 28.53058770576],
        ["New Moon", 28.53058770576, 29.53058770576]
    ];

    // Find current phase in the array
    var thePhase;
    for (var i = 0; i < phases.length; i++) {
        if (currentDays >= phases[i][1] && currentDays <= phases[i][2]) {
            thePhase = phases[i][0];
            break;
        }
    }
    
    // Find the date of the next new moon
    var nextNewMoonDate = new Date(date);
    nextNewMoonDate.setDate(nextNewMoonDate.getDate() + (29.53 - currentDays));

    return {
        phase: thePhase,
        percentage: phasePercentage.toFixed(2),
        nextNewMoon: nextNewMoonDate.toDateString()
    };
}

// Update images as per phase
function icon(phase){
    if (phase === 'New Moon') {
        return 'assets/new-moon.png';
    } else if (phase === 'Waxing Crescent') {
        return 'assets/waxing-cresent.png';
    } else if (phase === 'First Quarter') {
        return 'assets/first-quarter.png';
    } else if (phase === 'Waxing Gibbous') {
        return 'assets/waxing-gibbous.png';
    } else if (phase === 'Full Moon') {
        return 'assets/full-moon.png';
    } else if (phase === 'Waning Gibbous') {
        return 'assets/waning-gibbous.png';
    } else if (phase === 'Last Quarter') {
        return 'assets/last-quarter.png';
    } else if (phase === 'Waning Crescent') {
        return 'assets/waning-crescent.png';
    } 
};

// Update the moon phase display
function updateMoonPhaseDisplay() {
    var currentDate = new Date();
    var moonInfo = calculateMoonPhase(currentDate);
    var phase = moonInfo.phase;
    var displayDate = 'Date: ' + currentDate.toDateString();
    var moonPhaseNameDisplay = 'Moon Phase: ' + phase;
    var moonPhaseImgDisplay = icon(phase);
    var moonPhasePercentageDisplay = 'Percentage of Lunation: ' + moonInfo.percentage + '%';
    var moonPhaseNextDisplay = 'Next New Moon: ' + moonInfo.nextNewMoon;


    document.getElementById('date').innerHTML = displayDate;
    document.getElementById('moon-phase-name').innerHTML = moonPhaseNameDisplay;
    document.getElementById('moon-phase-img').src = moonPhaseImgDisplay;
    document.getElementById('moon-phase-percentage').innerHTML = moonPhasePercentageDisplay;
    document.getElementById('moon-phase-next').innerHTML = moonPhaseNextDisplay;

    updateSevenDayChart();

}

// Function to update the 7-day moon phase chart
function updateSevenDayChart() {
    var dateRow = document.getElementById('date-row');
    var phaseNameRow = document.getElementById('phase-name-row');
    var phasePhotoRow = document.getElementById('phase-photo-row');

    dateRow.innerHTML = '';
    phaseNameRow.innerHTML = '';
    phasePhotoRow.innerHTML = '';

    for (var i = 1; i <= 7; i++) {
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + i);
        var futureMoonInfo = calculateMoonPhase(futureDate);

        var dateCell = document.createElement('td');
        dateCell.innerHTML = futureDate.toDateString();
        dateRow.appendChild(dateCell);

        var phaseNameCell = document.createElement('td'); 
        phaseNameCell.innerHTML = futureMoonInfo.phase;
        phaseNameRow.appendChild(phaseNameCell);

        var phasePhotoCell = document.createElement('td');
        var img = document.createElement('img');
        img.src = icon(futureMoonInfo.phase);
        img.draggable = false;
        phasePhotoCell.appendChild(img);
        phasePhotoRow.appendChild(phasePhotoCell);
    }
}

// Update the moon phase display initially
updateMoonPhaseDisplay();

const targetHour = 0; // 12 AM
const targetMinute = 0;

function checkTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  if (currentHour === targetHour && currentMinute === targetMinute) {
    updateMoonPhaseDisplay();
  }
}

// Update the moon phase display every day
setInterval(checkTime, 6*10000); // check every minute



/* -------------------================= THEME ==================---------------------- */
/* -------------------================= THEME ==================---------------------- */

const themeChangeBtn = document.getElementById('change-theme');     // icon
const theme = document.getElementById('theme');                     // icon btn
const body = document.getElementById("body");                       // body
const heading = document.getElementById("heading");                 // heading
const moonPhase = document.getElementById("moon-phase");            // moon phase div
const moonPhaseTable = document.getElementById("seven-day-chart");
let darkMode = true; 

// Theme change btn click
theme.addEventListener('click',function(){
    //When already dark-mode and switch to light mode
    if(darkMode){
        themeChangeBtn.classList.remove('fa-moon');
        themeChangeBtn.classList.add("fa-sun");
        darkMode = false;
        themeChangeBtn.style.color = "rgb(13, 12, 12)";
        body.style.backgroundColor = "#fff";
        heading.style.color = "rgb(13, 12, 12)";
        moonPhase.style.color = "rgb(13, 12, 12)";
        moonPhase.style.backgroundColor = "#fff";
        moonPhaseTable.style.color = "rgb(13, 12, 12)";
    }
    //When light-mode and switch to dark mode
    else{
        darkMode = true;
        body.style.backgroundColor = "rgb(13, 12, 12)";
        themeChangeBtn.style.color = "#fff";
        themeChangeBtn.classList.remove('fa-sun-bright');
        themeChangeBtn.classList.add('fa-moon');
        heading.style.color = "#fff";
        moonPhase.style.color = "#fff";
        moonPhase.style.backgroundColor = "rgb(13, 12, 12)";
        moonPhaseTable.style.color = "#fff";
    }
});

/* -------------------============================================ END ===========================================---------------------- */
/* -------------------============================================ END ===========================================---------------------- */