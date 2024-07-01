function check() {
  const inputString = document.getElementById('string1').value.toLowerCase();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let isPangram = true;

  for (let char of alphabet) {
    if (!inputString.includes(char)) {
      isPangram = false;
      break;
    }
  }

  const outputText = isPangram
    ? 'The sentence is a pangram.'
    : 'The sentence is not a pangram.';

  document.getElementById('output-text').innerText = outputText;
}
