function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

function check() {
  const number = parseInt(document.getElementById('number').value);
  const outputText = document.getElementById('output-text');

  if (isNaN(number)) {
    outputText.textContent = "Please enter a valid number.";
    return;
  }

  if (isPrime(number)) {
    outputText.textContent = `${number} is a prime number.`;
  } else {
    outputText.textContent = `${number} is not a prime number.`;
  }
}
