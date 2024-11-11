function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function checkCoPrime() {
  const num1 = parseInt(document.getElementById("number1").value);
  const num2 = parseInt(document.getElementById("number2").value);

  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById("output-text").textContent = "Please enter valid numbers.";
    return;
  }

  const gcdValue = gcd(num1, num2);

  if (gcdValue === 1) {
    document.getElementById("output-text").textContent = `${num1} and ${num2} are co-prime numbers.`;
    document.getElementById("output-text").style.color = 'darkgreen';
  } else {
    document.getElementById("output-text").textContent = `${num1} and ${num2} are not co-prime numbers.`;
    document.getElementById("output-text").style.color = 'darkred';
  }
}
