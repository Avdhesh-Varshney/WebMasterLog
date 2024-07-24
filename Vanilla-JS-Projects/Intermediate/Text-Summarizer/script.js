document.getElementById('summarizeBtn').addEventListener('click', summarizeText);
document.getElementById('inputText').addEventListener('input', updateWordCount);
document.getElementById('exportBtn').addEventListener('click', exportSummary);
document.getElementById('language').addEventListener('change', updateLanguage);

async function summarizeText() {
    const inputText = document.getElementById('inputText').value;
    const language = document.getElementById('language').value;
    const translatedText = await translateText(inputText, language);
    const summary = getSummary(translatedText);
    displaySummary(summary);
}

function updateWordCount() {
    const inputText = document.getElementById('inputText').value;
    const wordCount = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = `Word Count: ${wordCount}`;
}

async function translateText(text, targetLanguage) {
    if (targetLanguage === 'en') return text;

    const response = await fetch(`https://api.example.com/translate?text=${encodeURIComponent(text)}&target=${targetLanguage}`);
    const data = await response.json();
    return data.translatedText;
}

function getSummary(text) {
    const sentences = text.split('. ');
    const wordFrequencies = {};
    const sentenceScores = {};

    sentences.forEach(sentence => {
        const words = sentence.split(' ');
        words.forEach(word => {
            word = word.toLowerCase().replace(/[^a-z]/g, '');
            if (word) {
                wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
            }
        });
    });

    sentences.forEach(sentence => {
        const words = sentence.split(' ');
        let sentenceScore = 0;
        words.forEach(word => {
            word = word.toLowerCase().replace(/[^a-z]/g, '');
            if (wordFrequencies[word]) {
                sentenceScore += wordFrequencies[word];
            }
        });
        sentenceScores[sentence] = sentenceScore;
    });

    const summarySentences = Object.keys(sentenceScores)
        .sort((a, b) => sentenceScores[b] - sentenceScores[a])
        .slice(0, Math.ceil(sentences.length / 3))
        .join('. ');

    return summarySentences;
}

function displaySummary(summary) {
    const summaryText = document.getElementById('summaryText');
    summaryText.textContent = summary;
    summaryText.style.animation = 'none'; // Reset animation
    summaryText.offsetHeight; // Trigger reflow
    summaryText.style.animation = null; // Reapply animation
    
    const exportBtn = document.getElementById('exportBtn');
    if (summary) {
        exportBtn.style.display = 'block';
    } else {
        exportBtn.style.display = 'none';
    }
}

function exportSummary() {
    const summaryText = document.getElementById('summaryText').textContent;
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'summary.txt';
    link.click();
}
