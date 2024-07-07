function isIsogram(str) {
  let lowerStr = str.toLowerCase();
  let charCount = {};

  for (let char of lowerStr) {
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }

  let counts = Object.values(charCount);
  return counts.every(count => count === counts[0]);
}

function checkIsogram() {
  let string = document.getElementById("string").value;
  let outputText = document.getElementById("output-text");

  if (isIsogram(string)) {
    outputText.textContent = `"${string}" is an isogram.`;
    outputText.style.color = 'green';
  } else {
    outputText.textContent = `"${string}" is not an isogram.`;
    outputText.style.color = 'darkred';
  }
}
