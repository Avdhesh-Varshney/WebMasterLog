// main.js
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const form = document.querySelector('form');
const plaintextInput = document.querySelector('textarea[name="plaintext"]');
const shiftInput = document.querySelector('input[name="shift"]');
const outputDiv = document.querySelector('#output');
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
const decryptButton = document.getElementById('decrypt-button');
const ciphertextInput = document.getElementById('ciphertext');
const decryptShiftInput = document.getElementById('shift');
const plaintextOutputDiv = document.getElementById('plaintext');

// Theme changing code
themeToggle.addEventListener('click', function() {
  if (themeStyle.getAttribute('href') === 'style.css') {
    themeStyle.setAttribute('href', 'cipher.css');
  } else {
    themeStyle.setAttribute('href', 'style.css');
  }
});

// Encrypt code
function encrypt(char, shift) {
  if (ALPHABET.includes(char.toLowerCase())) {
    const position = ALPHABET.indexOf(char.toLowerCase());
    const newPosition = (position + shift) % 26;
    return ALPHABET[newPosition];
  } else {
    return char;
  }
}

function encryptText(text, shift) {
  return [...text].map(char => encrypt(char, shift)).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const plaintext = plaintextInput.value;
  const shift = Number(shiftInput.value);
  const ciphertext = encryptText(plaintext, shift);
  outputDiv.innerHTML = ciphertext;
});

// Decrypt code
function decrypt(char, shift) {
  if (ALPHABET.includes(char.toLowerCase())) {
    const position = ALPHABET.indexOf(char.toLowerCase());
    const newPosition = (position - shift + 26) % 26;
    return ALPHABET[newPosition];
  } else {
    return char;
  }
}

function decryptText(text, shift) {
  return [...text].map(char => decrypt(char, shift)).join('');
}

decryptButton.addEventListener('click', () => {
  const ciphertext = ciphertextInput.value;
  const shift = Number(decryptShiftInput.value);
  const plaintext = decryptText(ciphertext, shift);
  plaintextOutputDiv.textContent = plaintext;
});