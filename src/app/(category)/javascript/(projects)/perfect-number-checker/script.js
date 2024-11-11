function checkPerfectNumber() {
  const numberInput = document.getElementById('numberInput').value;
  const number = parseInt(numberInput);
  const outputText = document.getElementById('output-text');
  
  if (isNaN(number) || number <= 0) {
    outputText.textContent = "Please enter a positive integer.";
    return;
  }
  
  let sum = 0;
  for (let i = 1; i <= number / 2; i++) {
    if (number % i === 0) {
      sum += i;
    }
  }

  if (sum === number) {
    outputText.textContent = `${number} is a perfect number.`;
    outputText.style.color = 'darkgreen';
  } else {
    outputText.textContent = `${number} is not a perfect number.`;
    outputText.style.color = 'darkred';
  }
}
