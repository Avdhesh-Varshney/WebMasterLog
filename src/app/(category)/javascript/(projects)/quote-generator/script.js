async function generateQuote() {
    const quoteContainer = document.getElementById('quote');
    const quoteContainerDiv = document.getElementById('quote-container');

    // Hide the container while fetching the new quote
    quoteContainerDiv.classList.remove('show');

    quoteContainer.innerHTML = 'Loading...';

    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();

        quoteContainer.innerHTML = `"${data.content}" - ${data.author}`;

        // Ensure a slight delay to allow CSS changes to apply
        setTimeout(() => {
            quoteContainerDiv.style.display = 'block';
            quoteContainerDiv.classList.add('show');
        }, 100);
    } catch (error) {
        quoteContainer.innerHTML = 'Error fetching quote. Please try again.';

        setTimeout(() => {
            quoteContainerDiv.style.display = 'block';
            quoteContainerDiv.classList.add('show');
        }, 100);
    }
}
