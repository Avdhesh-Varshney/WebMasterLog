document.getElementById('count-button').addEventListener('click', () => {
  const text = document.getElementById('text-input').value;

  if (text.trim() === '') {
      alert('Please enter some text.');
      return;
  }

  const wordCount = countWords(text);
  const letterCount = countLetters(text);
  const read = getTime(wordCount);
  const readTime = read*60;
  document.getElementById('word-count').textContent = `Words: ${wordCount}`;
  document.getElementById('letter-count').textContent = `Character: ${letterCount}`;
  if((readTime)<60){
    document.getElementById('read-time').textContent = `Reading time: ${readTime} secs`;
  }else{
    document.getElementById('read-time').textContent = `Reading time: ${Math.floor(readTime/60)}:${Math.floor(readTime%60)} mins`;
  }
  document.getElementById('results').classList.remove('hidden');
});

function countWords(text) {
  return text.trim().split(/\s+/).length;
}

function countLetters(text) {
  return text.replace(/\s+/g, '').length;
}
function getTime(count){
  return (count/250);
}
