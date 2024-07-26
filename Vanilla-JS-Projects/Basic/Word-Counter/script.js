document.getElementById('count-button').addEventListener('click', () => {
  const text = document.getElementById('text-input').value;

  if (text.trim() === '') {
      alert('Please enter some text.');
      return;
  }

  const wordCount = countWords(text);
  const letterCount = countLetters(text);

  document.getElementById('word-count').textContent = `Words: ${wordCount}`;
  document.getElementById('letter-count').textContent = `Character: ${letterCount}`;

  document.getElementById('results').classList.remove('hidden');
});

function countWords(text) {
  return text.trim().split(/\s+/).length;
}

function countLetters(text) {
  return text.replace(/\s+/g, '').length;
}

