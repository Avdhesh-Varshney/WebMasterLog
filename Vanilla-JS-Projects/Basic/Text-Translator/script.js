function translateText() {
    const textToTranslate = document.getElementById('txt').value;
    const targetLanguage = document.getElementById('languageSelect').value;

    // Define a fallback source language in case automatic detection fails
    const sourceLanguage = 'en'; // English as default source language

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${encodeURIComponent(sourceLanguage)}|${encodeURIComponent(targetLanguage)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.responseData && data.responseData.translatedText) {
                document.getElementById('translatedText').value = data.responseData.translatedText;
            } else {
                throw new Error('Translation not available');
            }
        })
        .catch(error => {
            console.error('Translation error:', error);
            document.getElementById('translatedText').value = 'Translation failed. Please try again later.';
        });
}
