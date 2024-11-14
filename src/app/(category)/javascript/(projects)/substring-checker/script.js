
function check() {
  const string = document.getElementById('string').value;
  const substring = document.getElementById('substring').value;
  const outputText = document.getElementById('output-text');

  if (string.includes(substring)) {
    outputText.textContent = 'Yes, it is a substring!';
    outputText.style.color = 'green';
  } else {
    outputText.textContent = 'No, it is not a substring.';
    outputText.style.color = 'red';
  }
}
