function check() {
  const year = document.getElementById('year').value;
  const outputText = document.getElementById('output-text');

  if (year === '') {
    outputText.textContent = 'Please enter a year.';
    return;
  }

  const yearInt = parseInt(year);

  if (isNaN(yearInt)) {
    outputText.textContent = 'Invalid input. Please enter a valid year.';
    return;
  }

  if ((yearInt % 4 === 0 && yearInt % 100 !== 0) || (yearInt % 400 === 0)) {
    outputText.textContent = `${yearInt} is a leap year.`;
  } else {
    outputText.textContent = `${yearInt} is not a leap year.`;
  }
}
