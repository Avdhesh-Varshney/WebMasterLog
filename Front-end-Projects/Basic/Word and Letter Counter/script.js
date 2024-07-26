let textArea = document.getElementById('text');
let wordCount = document.getElementById('word-count');
let letterCount = document.getElementById('letter-count');

textArea.addEventListener('input', () => {
    let words = textArea.value.trim().split(/\s+/);
    wordCount.innerText = words.length;
    letterCount.innerText = textArea.value.length;
});