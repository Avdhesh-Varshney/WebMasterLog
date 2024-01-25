function checkPalindrome() {
    var inputText = document.getElementById('inputText').value.trim().toLowerCase();
    var resultElement = document.getElementById('result');

    // Check if the input is empty
    if (inputText === "") {
        alert("Please enter some text before checking for palindrome.");
        return;
    }

    // Remove non-alphanumeric characters from the input
    var cleanInput = inputText.replace(/[^a-z0-9]/g, '');

    // Check if the clean input is a palindrome
    var isPalindrome = cleanInput === cleanInput.split('').reverse().join('');

    // Display the result with animation
    resultElement.innerHTML = isPalindrome ? 'It\'s a Palindrome!' : 'Not a Palindrome!';
    resultElement.classList.remove('success', 'failure');
    resultElement.classList.add(isPalindrome ? 'success' : 'failure');

    // Apply bounce animation
    resultElement.classList.add('bounce');
    setTimeout(() => {
        resultElement.classList.remove('bounce');
    }, 500);
}

function clearText() {
    var inputText = document.getElementById('inputText');
    var resultElement = document.getElementById('result');

    // Clear input text and result
    inputText.value = "";
    resultElement.innerHTML = "";
    resultElement.classList.remove('success', 'failure');
}
