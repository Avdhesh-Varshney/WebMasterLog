// Function to clear error messages
function clearErrorMessages() {
    const errorElements = document.getElementsByClassName("error-message");
    for (const errorElement of errorElements) {
        errorElement.textContent = "";
    }
}

// Function to display error messages
function displayErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = "red";
}

// Function to validate input fields
function validateInputs(birthYear, birthMonth, birthDay, birthHours, birthMinutes, birthSeconds, birthMilliSeconds) {
    let isValid = true;
    if (birthYear < 1900 || birthYear > new Date().getFullYear()) {
        displayErrorMessage("errorBirthYear", "Please enter a valid year between 1900 and " + new Date().getFullYear() + ".");
        isValid = false;
    } else if (birthMonth < 1 || birthMonth > 12) {
        displayErrorMessage("errorBirthMonth", "Please enter a valid month between 1 and 12.");
        isValid = false;
    } else if (birthDay < 1 || birthDay > 31) {
        displayErrorMessage("errorBirthDay", "Please enter a valid day between 1 and 31.");
        isValid = false;
    } else if (birthHours < 0 || birthHours > 23) {
        displayErrorMessage("errorBirthHours", "Please enter a valid hour between 0 and 23.");
        isValid = false;
    } else if (birthMinutes < 0 || birthMinutes > 59) {
        displayErrorMessage("errorBirthMinutes", "Please enter a valid minute between 0 and 59.");
        isValid = false;
    } else if (birthSeconds < 0 || birthSeconds > 59) {
        displayErrorMessage("errorBirthSeconds", "Please enter a valid second between 0 and 59.");
        isValid = false;
    } else if (birthMilliSeconds < 0 || birthMilliSeconds > 999) {
        displayErrorMessage("errorBirthMilliSeconds", "Please enter a valid millisecond between 0 and 999.");
        isValid = false;
    }
    return isValid;
}

// Function to update time regularly in every 100ms
function updateTime(birthTime) {
    let currentTime = new Date();
    let timeDifference = currentTime - birthTime;
    setInterval(() => {
        document.getElementById('milliseconds').textContent = parseInt(timeDifference % 1000);
        timeDifference = parseInt(timeDifference / 1000);
    
        document.getElementById('seconds').textContent = parseInt(timeDifference % 60);
        timeDifference = parseInt(timeDifference / 60);
    
        document.getElementById('minutes').textContent = parseInt(timeDifference % 60);
        timeDifference = parseInt(timeDifference / 60);
    
        document.getElementById('hours').textContent = parseInt(timeDifference % 24);
        timeDifference = parseInt(timeDifference / 24);
    
        document.getElementById('days').textContent = parseInt(timeDifference % 30.416);
        timeDifference = parseInt(timeDifference / 30.416);
    
        document.getElementById('months').textContent = parseInt(timeDifference % 12);
        document.getElementById('years').textContent = parseInt(timeDifference / 12);

        currentTime = new Date();
        timeDifference = currentTime - birthTime;
    }, 100);
}

// Function to be called when the submit button is clicked
function submitBirthDetails() {
    clearErrorMessages();

    let birthYear = parseInt(document.getElementById("birthYear").value);
    let birthMonth = parseInt(document.getElementById("birthMonth").value);
    let birthDay = parseInt(document.getElementById("birthDay").value);
    let birthHours = parseInt(document.getElementById("birthHours").value);
    let birthMinutes = parseInt(document.getElementById("birthMinutes").value);
    let birthSeconds = parseInt(document.getElementById("birthSeconds").value);
    let birthMilliSeconds = parseInt(document.getElementById("birthMilliSeconds").value);

    if(birthYear && birthMonth && birthDay && birthHours && birthMinutes && birthSeconds && birthMilliSeconds) {
        if (validateInputs(birthYear, birthMonth, birthDay, birthHours, birthMinutes, birthSeconds, birthMilliSeconds)) {
            let birthTime = new Date(birthYear, birthMonth - 1, birthDay, birthHours, birthMinutes, birthSeconds, birthMilliSeconds);
            updateTime(birthTime);
    
            // Hide box-1 and show box-2
            document.querySelector('.box-1').style.display = 'none';
            document.querySelector('.box-2').style.display = 'flex';
        }
    } else {
        const errorElements = document.getElementsByClassName("error-message");
        for (const errorElement of errorElements) {
            errorElement.style.color = 'salmon';
            errorElement.textContent = "Fill the empty entries!";
        }
    }
}