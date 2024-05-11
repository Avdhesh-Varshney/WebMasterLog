// main.js
const form = document.querySelector('form');
const plaintextInput = document.querySelector('textarea[name="plaintext"]');
const shiftInput = document.querySelector('input[name="shift"]');
const outputDiv = document.querySelector('#output');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';



function encrypt(char) {
  const shift = Number(shiftInput.value);
  if (alphabet.includes(char.toLowerCase())) {
    const position = alphabet.indexOf(char.toLowerCase());
    const newPosition = (position + shift) % 26;
    return alphabet[newPosition];
  } else {
    return char;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const plaintext = plaintextInput.value;
  const ciphertext = [...plaintext].map((char) => encrypt(char)).join('');
  outputDiv.innerHTML = ciphertext;
});



document.getElementById('theme-toggle').addEventListener('click', function() {
    const themeStyle = document.getElementById('theme-style');
    if (themeStyle.getAttribute('href') === 'style.css') {
      themeStyle.setAttribute('href', 'cipher.css');
    } else {
      themeStyle.setAttribute('href', 'style.css');
    }
  });
  

  
  function decrypt(char, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (alphabet.includes(char.toLowerCase())) {
      const position = alphabet.indexOf(char.toLowerCase());
      const newPosition = (position - shift + 26) % 26;
      return alphabet[newPosition];
    } else {
      return char;
    }
  }
  
  function decryptCiphertext(ciphertext, shift) {
    const plaintext = ciphertext.split('').map(char => decrypt(char, shift)).join('');
    return plaintext;
  }
  
  const decryptButton = document.getElementById('decrypt-button');
  decryptButton.addEventListener('click', () => {
    const ciphertext = document.getElementById('ciphertext').value;
    const shift = document.getElementById('shift').value;
    const plaintext = decryptCiphertext(ciphertext, shift);
    document.getElementById('plaintext').textContent = plaintext;
  });